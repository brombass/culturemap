export type { Country, Dimension, DimensionCode, Scores } from "./types";
export { countries } from "./countries";
export { dimensions } from "./dimensions";
export { palette } from "./palette";

import { countries } from "./countries";
import { dimensions } from "./dimensions";
import type { Country, DimensionCode } from "./types";

/** Dimensions in their canonical book order, keyed for quick lookup. */
export const dimensionsByCode = Object.fromEntries(
  dimensions.map((d) => [d.code, d]),
) as Record<DimensionCode, (typeof dimensions)[number]>;

export const countriesById = new Map<number, Country>(
  countries.map((c) => [c.id, c]),
);

export const DEFAULT_COUNTRY_NAMES = [
  "United States",
  "Japan",
  "France",
] as const;

export const defaultCountries: Country[] = DEFAULT_COUNTRY_NAMES.map(
  (name) => countries.find((c) => c.name === name)!,
).filter(Boolean);
