const ARABIC_DIGITS = "٠١٢٣٤٥٦٧٨٩";
const PERSIAN_DIGITS = "۰۱۲۳۴۵۶۷۸۹";

export function normalizeSaudiPhone(input: string): string | null {
  let value = input.trim();
  value = value.replace(/[٠-٩]/g, (digit) => String(ARABIC_DIGITS.indexOf(digit)));
  value = value.replace(/[۰-۹]/g, (digit) => String(PERSIAN_DIGITS.indexOf(digit)));
  value = value.replace(/[\s\-()]/g, "");

  if (value.startsWith("+966")) value = `0${value.slice(4)}`;
  else if (value.startsWith("00966")) value = `0${value.slice(5)}`;
  else if (value.startsWith("966")) value = `0${value.slice(3)}`;

  if (/^05\d{8}$/.test(value)) return value;
  return null;
}
