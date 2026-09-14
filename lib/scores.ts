/**
 * The original dataset encodes "not applicable" as a score of -1 — used for
 * the Persuading scale on cultures the book classifies as holistic
 * reasoners (neither principles-first nor applications-first), such as
 * Japan, China, Korea and several others. Treat any negative value as
 * "no data" rather than plotting it at the far left of the scale.
 */
export function hasScore(score: number): boolean {
  return score >= 0;
}
