import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const failures = [];
const fail = (msg) => failures.push(msg);

function walk(dir, out = []) {
  let entries;
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const entry of entries) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

function exists(p) {
  try {
    statSync(p);
    return true;
  } catch {
    return false;
  }
}

const rel = (p) => relative(ROOT, p).split("\\").join("/");

// check 1: DESIGN.md front matter is mirrored key-for-key

function frontMatterBlock(source, blockName) {
  const fm = source.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!fm) throw new Error("DESIGN.md has no YAML front matter.");
  const lines = fm[1].split(/\r?\n/);
  const start = lines.findIndex((l) => l.trimEnd() === `${blockName}:`);
  if (start === -1) {
    throw new Error(`DESIGN.md front matter has no \`${blockName}:\` block.`);
  }
  const out = new Map();
  for (let i = start + 1; i < lines.length; i++) {
    const line = lines[i];
    if (line.trim() === "") continue;
    if (!/^\s/.test(line)) break;
    const m = line.match(/^\s{2}([A-Za-z0-9-]+)\s*:\s*"?(.*?)"?\s*$/);
    if (m) out.set(m[1], m[2]);
  }
  return out;
}

function diffKeySets(label, spec, code) {
  const missing = [...spec.keys()].filter((k) => !code.has(k));
  const added = [...code.keys()].filter((k) => !spec.has(k));
  const renamed = [];
  for (const m of [...missing]) {
    const hit = added.find((a) => code.get(a) === spec.get(m));
    if (hit) renamed.push(`${m} -> ${hit}`);
  }
  if (!missing.length && !added.length) {
    console.log(
      `  ${label}: ${spec.size} keys — 0 added, 0 missing, 0 renamed.`,
    );
    return;
  }
  if (renamed.length) fail(`${label}: renamed key(s): ${renamed.join(", ")}`);
  if (missing.length) {
    fail(
      `${label}: ${missing.length} key(s) in DESIGN.md but MISSING from tokens.ts: ${missing.join(", ")}`,
    );
  }
  if (added.length) {
    fail(
      `${label}: ${added.length} key(s) in tokens.ts but ADDED beyond DESIGN.md: ${added.join(", ")}`,
    );
  }
}

const design = readFileSync(join(ROOT, "DESIGN.md"), "utf8");
const tokens = await import(
  new URL("../src/design/tokens.ts", import.meta.url)
);

console.log("check-tokens: DESIGN.md front-matter mirror");
diffKeySets(
  "typography",
  frontMatterBlock(design, "typography"),
  new Map(Object.entries(tokens.typography)),
);
diffKeySets(
  "components",
  frontMatterBlock(design, "components"),
  new Map(Object.entries(tokens.components)),
);

const typoKeys = Object.keys(tokens.typography).sort().join(",");
const respKeys = Object.keys(tokens.typographyResponsive).sort().join(",");
if (typoKeys !== respKeys) {
  fail(
    "typographyResponsive must expose the same key set as typography (a component asking for a key that exists in one and not the other is a runtime undefined).",
  );
} else {
  console.log(
    `  typographyResponsive: matches typography (${Object.keys(tokens.typography).length} keys).`,
  );
}

// check 2: composed files may not hand-write design utilities.
// Scope: src/components/sections/**, src/components/data-display/** and
// src/app/page.tsx. src/components/primitives/** is exempt BY DESIGN — a
// primitive is the one place a token string is turned into a className.

const BANNED_PREFIXES = [
  "bg",
  "text",
  "border",
  "ring",
  "rounded",
  "shadow",
  "font",
  "tracking",
  "leading",
  "divide",
  "outline",
  "from",
  "via",
  "to",
  "decoration",
  "placeholder",
  "caret",
  "accent",
  "fill",
  "stroke",
];

// These share the `text-` prefix but control text FLOW, not appearance.
const ALLOWED_TEXT_UTILITIES = new Set([
  "text-balance",
  "text-pretty",
  "text-center",
  "text-left",
  "text-right",
  "text-start",
  "text-end",
  "text-wrap",
  "text-nowrap",
]);

const UTILITY_RE = new RegExp(
  `(?:^|[\\s"'\`])((?:[a-z0-9-]+:)*(?:${BANNED_PREFIXES.join("|")})-[a-z0-9][a-zA-Z0-9./%-]*)`,
  "gm",
);

// A token KEY read out of tokens.ts is not a hand-written utility. Subscripts
// like overrides["text-link"], tokens.components['top-nav'] and
// layout[`feature-grid-3`] are blanked before the line is scanned, so the guard
// can never fail on a line that contains no Tailwind class at all. Without this,
// reading a legitimately-named key is a build error and the only escape is to
// invent a duplicate key under a name the guard does not misread.
const stripKeySubscripts = (line) =>
  line.replace(/\[\s*(["'`])[^"'`]*\1\s*\]/g, "[]");

// Same reasoning for the primitives' discriminated-union props. `variant="text-link"`
// on <Button> is an API name, not a class, but it shares the banned `text-` prefix.
// className is deliberately NOT in this list — that one must stay scanned.
const stripUnionPropValues = (line) =>
  line.replace(/\b(variant|surface|tone|size)=(["'])[^"']*\2/g, "$1=$2$2");

const sectionFiles = [
  ...walk(join(ROOT, "src/components/sections")).filter((p) =>
    p.endsWith(".tsx"),
  ),
  ...walk(join(ROOT, "src/components/data-display")).filter((p) =>
    p.endsWith(".tsx"),
  ),
  ...(exists(join(ROOT, "src/app/page.tsx"))
    ? [join(ROOT, "src/app/page.tsx")]
    : []),
];

console.log(`check-tokens: composed scan (${sectionFiles.length} file(s))`);
for (const file of sectionFiles) {
  const source = readFileSync(file, "utf8");
  const lines = source.split(/\r?\n/);
  lines.forEach((rawLine, i) => {
    const line = stripUnionPropValues(stripKeySubscripts(rawLine));
    for (const match of line.matchAll(UTILITY_RE)) {
      const utility = match[1];
      const bare = utility.slice(utility.lastIndexOf(":") + 1);
      if (ALLOWED_TEXT_UTILITIES.has(bare)) continue;
      fail(
        `${rel(file)}:${i + 1} hand-written design utility \`${utility}\` — sections and data-display components must read class strings from src/design/tokens.ts.`,
      );
    }
  });
}

// check 3: no raw colours, no arbitrary values, anywhere in src

const HEX_RE =
  /#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{4}|[0-9a-fA-F]{3})(?![0-9a-zA-Z_-])/;
const OKLCH_RE = /oklch\(/i;
// A Tailwind arbitrary value, and ONLY inside a class-string context. The match
// must start at a class-list boundary (start of line, whitespace, or the opening
// quote of a string literal), be a lowercase utility prefix made of dash-joined
// alphanumeric segments, end with a dash IMMEDIATELY before the `[`, and contain
// no quote, bracket or whitespace inside the brackets. Matches bg-[#fff],
// p-[13px], md:text-[13px]. Does NOT match ordinary TypeScript indexed access —
// items[0], ClassValue[], a[b], obj["key"], overrides["band-dark"],
// typographyResponsive["display-xl"] — because none of those is a utility prefix
// with a trailing dash immediately before the bracket.
const ARBITRARY_RE =
  /(?:^|[\s"'`])(?:[a-z][a-z0-9]*(?:-[a-z0-9]+)*:)*[a-z][a-z0-9]*(?:-[a-z0-9]+)*-\[[^\]"'`\s]+\]/;

const srcFiles = walk(join(ROOT, "src")).filter(
  (p) => p.endsWith(".ts") || p.endsWith(".tsx"),
);

console.log(`check-tokens: src scan (${srcFiles.length} file(s))`);
for (const file of srcFiles) {
  const lines = readFileSync(file, "utf8").split(/\r?\n/);
  lines.forEach((line, i) => {
    const hex = line.match(HEX_RE);
    if (hex) fail(`${rel(file)}:${i + 1} literal hex colour \`${hex[0]}\`.`);
    if (OKLCH_RE.test(line))
      fail(`${rel(file)}:${i + 1} literal oklch() colour.`);
    const arb = line.match(ARBITRARY_RE);
    if (arb) {
      fail(
        `${rel(file)}:${i + 1} Tailwind arbitrary value \`${arb[0].trim()}\` — snap to the nearest scale step.`,
      );
    }
  });
}

if (failures.length) {
  console.error(`\ncheck-tokens FAILED — ${failures.length} problem(s):\n`);
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}
console.log("\ncheck-tokens OK");
