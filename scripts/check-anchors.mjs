import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const rel = (p) => relative(ROOT, p).split("\\").join("/");

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

const CONTENT_DIR = join(ROOT, "src/content");
if (!exists(CONTENT_DIR)) {
  console.log(
    "check-anchors: src/content does not exist yet — nothing to check.",
  );
  process.exit(0);
}

// Declared ids: the SECTION_IDS union plus every id actually rendered in JSX.
const declared = new Set();

const typesFile = join(CONTENT_DIR, "types.ts");
if (exists(typesFile)) {
  const block = readFileSync(typesFile, "utf8").match(
    /SECTION_IDS\s*=\s*\[([\s\S]*?)\]/,
  );
  if (block) {
    for (const m of block[1].matchAll(/["'`]([a-z0-9-]+)["'`]/g)) {
      declared.add(m[1]);
    }
  }
}

// Pass B is gated on this directory rather than on `rendered.size`, because
// page.tsx is still Phase 01's token-proof strip and its demo `id="typography"`
// would otherwise read as "section rendering has begun" and fail every SECTION_ID.
const SECTIONS_DIR = join(ROOT, "src/components/sections");
const sectionsExist = exists(SECTIONS_DIR);

const renderedFiles = [
  ...walk(SECTIONS_DIR).filter((p) => p.endsWith(".tsx")),
  ...(exists(join(ROOT, "src/app/page.tsx"))
    ? [join(ROOT, "src/app/page.tsx")]
    : []),
];

const rendered = new Set();
for (const file of renderedFiles) {
  const source = readFileSync(file, "utf8");
  for (const m of source.matchAll(/\bid=["']([^"']+)["']/g)) rendered.add(m[1]);
  for (const m of source.matchAll(/\bid=\{\s*["']([^"']+)["']\s*\}/g)) {
    rendered.add(m[1]);
  }
  for (const m of source.matchAll(/\bid:\s*["']([^"']+)["']/g))
    rendered.add(m[1]);
}

const known = new Set([...declared, ...rendered]);
const failures = [];

console.log(
  `check-anchors: ${declared.size} ids from SECTION_IDS, ${rendered.size} from rendered files` +
    (sectionsExist ? "" : " (expected until Phase 05)"),
);

// Every "#…" literal written anywhere under src/content/. Pass C reads this.
const linked = new Set();

// `#hero` is the top of the document. It is reached by scrolling up and by the
// wordmark's `/#hero` link, which the regex below does not see because it only
// matches a `#` directly after a quote. It is the ONLY allowlisted id — adding a
// second one needs a written reason.
const UNLINKED_BY_DESIGN = new Set(["hero"]);

// A. every #hash written in content must resolve to a known id
for (const file of walk(CONTENT_DIR).filter(
  (p) => p.endsWith(".ts") || p.endsWith(".tsx"),
)) {
  const lines = readFileSync(file, "utf8").split(/\r?\n/);
  lines.forEach((line, i) => {
    for (const m of line.matchAll(/["'`]#([A-Za-z0-9_-]+)["'`]/g)) {
      linked.add(m[1]);
      if (!known.has(m[1])) {
        failures.push(
          `${rel(file)}:${i + 1} dead in-page anchor \`#${m[1]}\` — no section renders that id.`,
        );
      }
    }
  });
}

// B. once sections actually render ids, every declared SECTION_ID must be one
if (sectionsExist) {
  for (const id of declared) {
    if (!rendered.has(id)) {
      failures.push(
        `SECTION_IDS declares \`${id}\` but no section renders id="${id}".`,
      );
    }
  }
}

// C. the orphan direction: every declared SECTION_ID must be LINKED from
//    somewhere under src/content/. An id nothing links to is a dead end for
//    anyone navigating by keyboard or screen reader. `hero` is allowlisted.
for (const id of declared) {
  if (UNLINKED_BY_DESIGN.has(id)) continue;
  if (!linked.has(id)) {
    failures.push(
      `SECTION_IDS declares \`${id}\` but nothing under src/content/ links to \`#${id}\` — orphan section id. Add the link (the footer "Sections" column is where the others live) or allowlist it deliberately in UNLINKED_BY_DESIGN.`,
    );
  }
}

if (failures.length) {
  console.error(`\ncheck-anchors FAILED — ${failures.length} problem(s):\n`);
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}
console.log(
  `check-anchors OK — ${known.size} known id(s), ${linked.size} linked hash(es); every content hash resolves and every section id is linked (allowlisted: ${[...UNLINKED_BY_DESIGN].join(", ")}).`,
);
