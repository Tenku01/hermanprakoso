export type IsoMonth = `${number}-${number}`;
export type IsoMonthOrPresent = IsoMonth | "present";

const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

function parse(iso: IsoMonth): readonly [number, number] {
  const dash = iso.indexOf("-");
  return [Number(iso.slice(0, dash)), Number(iso.slice(dash + 1))] as const;
}

// `now` is a parameter rather than an import from @/lib/now so this module stays
// import-free: scripts/check-duration.mjs loads it through Node's type stripping,
// and Node's ESM resolver cannot resolve extensionless relative imports.
// UTC accessors, never the local-time ones, so two build machines in different
// timezones never disagree about which month it is.
// Inclusive of both endpoint months, which is the resume convention every reader
// already has in their head: Dec 2015 - May 2017 reads as 18 months, not 17.
export function monthsBetween(
  startISO: IsoMonth,
  endISO: IsoMonthOrPresent,
  now: Date,
): number {
  const [startYear, startMonth] = parse(startISO);
  const [endYear, endMonth] =
    endISO === "present"
      ? ([now.getUTCFullYear(), now.getUTCMonth() + 1] as const)
      : parse(endISO);
  return (endYear - startYear) * 12 + (endMonth - startMonth) + 1;
}

export function formatDuration(months: number): string {
  const years = Math.floor(months / 12);
  const rest = months % 12;
  const yearPart = years > 0 ? `${years} ${years === 1 ? "yr" : "yrs"}` : "";
  const monthPart = rest > 0 ? `${rest} ${rest === 1 ? "mo" : "mos"}` : "";
  return [yearPart, monthPart].filter(Boolean).join(" ") || "0 mos";
}

export function formatMonth(iso: IsoMonth): string {
  const [year, month] = parse(iso);
  return `${MONTH_NAMES[month - 1]} ${year}`;
}

export function formatRange(
  startISO: IsoMonth,
  endISO: IsoMonthOrPresent,
  now: Date,
): string {
  const end = endISO === "present" ? "Present" : formatMonth(endISO);
  const duration = formatDuration(monthsBetween(startISO, endISO, now));
  return `${formatMonth(startISO)} – ${end} · ${duration}`;
}
