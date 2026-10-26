import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

import { SITE } from "@/content/site";

export const alt = SITE.ogImageAlt;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Satori resolves no CSS variables and no Tailwind classes, so the palette is
// restated literally. rgb() rather than hex because scripts/check-tokens.mjs
// fails the build on any hex literal under src/. Values are the sRGB renderings
// of the Tailwind v4 palette recorded in DESIGN.md's colour map.
const CANVAS = "white";
const INK = "rgb(23, 23, 23)"; // neutral-900
const BODY = "rgb(54, 65, 83)"; // gray-700
const HAIRLINE = "rgb(229, 231, 235)"; // gray-200
const DOT = "rgb(0, 188, 125)"; // emerald-500

export default async function OpengraphImage() {
  const bricolageBold = await readFile(
    join(process.cwd(), "src/assets/fonts/BricolageGrotesque-Bold.ttf"),
  );

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
        padding: 80,
        backgroundColor: CANVAS,
        color: INK,
        fontFamily: "Bricolage Grotesque",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: 28,
          color: BODY,
        }}
      >
        <div style={{ display: "flex" }}>{SITE.wordmark}</div>
        <div style={{ display: "flex", alignItems: "center" }}>
          {SITE.availability.available ? (
            <div
              style={{
                display: "flex",
                width: 16,
                height: 16,
                marginRight: 12,
                borderRadius: 9999,
                backgroundColor: DOT,
              }}
            />
          ) : null}
          <div style={{ display: "flex" }}>{SITE.availability.label}</div>
        </div>
      </div>

      <div style={{ display: "flex", maxWidth: 940 }}>
        <div
          style={{
            display: "flex",
            fontSize: 72,
            lineHeight: 1.1,
            letterSpacing: -2,
          }}
        >
          {SITE.ogTitle}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          paddingTop: 32,
          borderTop: `2px solid ${HAIRLINE}`,
        }}
      >
        <div style={{ display: "flex", fontSize: 32 }}>{SITE.name}</div>
        <div
          style={{ display: "flex", marginTop: 8, fontSize: 26, color: BODY }}
        >
          {`${SITE.jobTitle} · ${SITE.locationLabel}`}
        </div>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        {
          name: "Bricolage Grotesque",
          data: bricolageBold,
          style: "normal",
          weight: 700,
        },
      ],
    },
  );
}
