export type BagCount = 1 | 2 | 3;

/** Confirmed bundle prices in SAR. Same size only. */
export const BUNDLE_PRICES: Record<string, Record<BagCount, number>> = {
  "white-rabbit-180": { 1: 169, 2: 297, 3: 401 },
  "white-rabbit-240": { 1: 179, 2: 315, 3: 424 },
  "white-rabbit-300": { 1: 189, 2: 333, 3: 448 },
  "white-rabbit-360": { 1: 199, 2: 350, 3: 472 },
};

export function parseBagsParam(value: string | null | undefined): BagCount {
  if (value === "2") return 2;
  if (value === "3") return 3;
  return 1;
}

export function priceForBags(slug: string, basePrice: number, bags: BagCount): number {
  const table = BUNDLE_PRICES[slug];
  if (table) return table[bags];
  if (bags === 1) return basePrice;
  if (bags === 2) return Math.round(basePrice * 2 * 0.88);
  return Math.round(basePrice * 3 * 0.79);
}

export function bagLabel(count: number): string {
  if (count === 1) return "حقيبة واحدة";
  if (count === 2) return "حقيبتان";
  return `${count} حقائب`;
}

export function packLabel(count: number): string {
  if (count === 1) return "باقة واحدة";
  if (count === 2) return "باقتان";
  return `${count} باقات`;
}
