import assert from "node:assert/strict";

import {
  formatDuration,
  formatMonth,
  formatRange,
  monthsBetween,
} from "../src/lib/duration.ts";

const now = new Date();

assert.equal(monthsBetween("2015-12", "2017-05", now), 18);
assert.equal(formatDuration(18), "1 yr 6 mos");

assert.equal(monthsBetween("2017-07", "2021-10", now), 52);
assert.equal(formatDuration(52), "4 yrs 4 mos");

// Recomputed from the clock so this keeps asserting something real instead of
// rotting into a frozen literal.
const expectedFreelanceMonths =
  (now.getUTCFullYear() - 2021) * 12 + (now.getUTCMonth() + 1 - 11) + 1;
assert.equal(monthsBetween("2021-11", "present", now), expectedFreelanceMonths);

// Below 120 months the copy may no longer say "over a decade"; at 144 it is
// stale in the other direction and a human must revisit the wording.
const careerMonths = monthsBetween("2015-12", "present", now);
assert.ok(
  careerMonths >= 120,
  `career is ${careerMonths} months, expected >= 120`,
);
assert.ok(
  careerMonths < 144,
  `career is ${careerMonths} months, expected < 144`,
);

assert.equal(formatMonth("2021-11"), "Nov 2021");
assert.equal(formatMonth("2017-07"), "Jul 2017");
assert.equal(formatMonth("2015-12"), "Dec 2015");

assert.equal(formatDuration(0), "0 mos");
assert.equal(formatDuration(1), "1 mo");
assert.equal(formatDuration(12), "1 yr");
assert.equal(formatDuration(13), "1 yr 1 mo");

assert.equal(
  formatRange("2017-07", "2021-10", now),
  "Jul 2017 – Oct 2021 · 4 yrs 4 mos",
);
assert.match(formatRange("2021-11", "present", now), /^Nov 2021 – Present · /);

console.log(`check-duration: OK (career = ${formatDuration(careerMonths)})`);
console.log(`  freelance  ${formatRange("2021-11", "present", now)}`);
console.log(`  greenapex  ${formatRange("2017-07", "2021-10", now)}`);
console.log(`  dotnpixel  ${formatRange("2015-12", "2017-05", now)}`);
