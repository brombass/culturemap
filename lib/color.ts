import { palette } from "./data/palette";

const SWATCHES = palette.profiles;

/** Deterministic color for the nth selected country (cycles if > swatch count). */
export function colorForIndex(index: number): string {
  return SWATCHES[index % SWATCHES.length];
}

export const MAX_SELECTABLE = SWATCHES.length;
