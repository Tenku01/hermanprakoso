import { mkdirSync, writeFileSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const require = createRequire(import.meta.url);
const sharp = require("sharp");

// next/og is not resolvable outside the Next compiler, and @vercel/og is not a
// direct dependency; the copy Next vendors is the only ImageResponse available.
const { ImageResponse } = await import(
  pathToFileURL(
    resolve(ROOT, "node_modules/next/dist/compiled/@vercel/og/index.node.js"),
  ).href
);

// Satori resolves no CSS variables and no Tailwind classes, so the palette is
// restated literally, matching opengraph-image.tsx.
const INK = "rgb(23, 23, 23)"; // neutral-900
const CANVAS = "rgb(255, 255, 255)";
const DOT = "rgb(0, 188, 125)"; // emerald-500

const MASTER = 1024;

const font = await readFile(
  join(ROOT, "src/assets/fonts/BricolageGrotesque-Bold.ttf"),
);

// One high-resolution master, downsampled per target: rendering the glyph
// directly at 16px puts resvg's hinting-free rasteriser on a 10px stem and the
// `s` closes up into a blob.
async function renderMaster({ radius, inset, withDot = true }) {
  const glyph = Math.round(MASTER * (withDot ? 0.72 : 0.86) * (1 - inset));
  const dot = Math.round(MASTER * 0.12 * (1 - inset));

  const response = new ImageResponse(
    {
      type: "div",
      props: {
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          backgroundColor: INK,
          borderRadius: radius,
        },
        children: {
          type: "div",
          props: {
            style: { display: "flex", alignItems: "flex-end" },
            children: [
              {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    fontFamily: "Bricolage Grotesque",
                    fontSize: glyph,
                    lineHeight: 1,
                    color: CANVAS,
                    letterSpacing: -glyph * 0.04,
                  },
                  children: "s",
                },
              },
              withDot === false
                ? null
                : {
                    type: "div",
                    props: {
                      style: {
                        display: "flex",
                        width: dot,
                        height: dot,
                        marginLeft: Math.round(dot * 0.5),
                        // flex-end aligns the dot with the bottom of the text box,
                        // which sits a descender below the baseline the dot has to
                        // land on.
                        marginBottom: Math.round(glyph * 0.2),
                        borderRadius: 9999,
                        backgroundColor: DOT,
                      },
                    },
                  },
            ],
          },
        },
      },
    },
    {
      width: MASTER,
      height: MASTER,
      fonts: [
        {
          name: "Bricolage Grotesque",
          data: font,
          style: "normal",
          weight: 700,
        },
      ],
    },
  );

  return Buffer.from(await response.arrayBuffer());
}

const png = (master, size, opaque = false) => {
  let pipeline = sharp(master).resize(size, size, { kernel: "lanczos3" });
  // Apple and Android composite the icon onto their own surface; an alpha edge
  // left by the rounded master would show through as a light fringe.
  if (opaque) pipeline = pipeline.flatten({ background: INK });
  return pipeline.png({ compressionLevel: 9 }).toBuffer();
};

// ICONDIR + one ICONDIRENTRY per image, each pointing at a whole PNG file.
// PNG-compressed ICO entries are read by every browser from IE11 on.
function ico(images) {
  const HEADER = 6;
  const ENTRY = 16;
  const header = Buffer.alloc(HEADER);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);

  let offset = HEADER + ENTRY * images.length;
  const entries = images.map(({ size, data }) => {
    const entry = Buffer.alloc(ENTRY);
    entry.writeUInt8(size >= 256 ? 0 : size, 0);
    entry.writeUInt8(size >= 256 ? 0 : size, 1);
    entry.writeUInt8(0, 2);
    entry.writeUInt8(0, 3);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(data.length, 8);
    entry.writeUInt32LE(offset, 12);
    offset += data.length;
    return entry;
  });

  return Buffer.concat([header, ...entries, ...images.map(({ data }) => data)]);
}

const write = (relPath, data) => {
  const target = join(ROOT, relPath);
  mkdirSync(join(target, ".."), { recursive: true });
  writeFileSync(target, data);
  console.log(`  ${relPath}  ${(data.length / 1024).toFixed(1)} kB`);
};

console.log("generating icons…");

const rounded = await renderMaster({ radius: MASTER * 0.22, inset: 0 });
// Android maskable icons are cropped to a circle inscribed in the middle 80%,
// so the mark is shrunk to survive the worst-case mask.
const maskable = await renderMaster({ radius: 0, inset: 0.3 });
const square = await renderMaster({ radius: 0, inset: 0 });
// 16px leaves the accent dot two pixels wide and the `s` under nine: at that
// size the dot is noise, so the small entry drops it and spends the pixels on
// the letter instead.
const small = await renderMaster({
  radius: MASTER * 0.18,
  inset: 0,
  withDot: false,
});

write(
  "src/app/herman-headshot.jpeg",
  ico(
    await Promise.all(
      [
        { size: 16, master: small },
        { size: 32, master: rounded },
        { size: 48, master: rounded },
      ].map(async ({ size, master }) => ({
        size,
        data: await png(master, size),
      })),
    ),
  ),
);
write("src/app/herman-headshot.jpeg", await png(rounded, 32));
write("src/app/herman-headshot.jpeg", await png(square, 180, true));
write("public/herman-headshot.jpeg", await png(rounded, 192, true));
write("public/herman-headshot.jpeg", await png(rounded, 512, true));
write("public/herman-headshot.jpeg", await png(maskable, 512, true));

console.log("done.");
