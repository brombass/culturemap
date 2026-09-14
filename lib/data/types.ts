export type DimensionCode =
  | "communicating"
  | "evaluating"
  | "leading"
  | "deciding"
  | "trusting"
  | "disagreeing"
  | "scheduling"
  | "persuading";

export type Scores = Record<DimensionCode, number>;

export interface Dimension {
  id: number;
  index: number;
  code: DimensionCode;
  name: string;
  /** Label for the 0 end of the 0-100 scale. */
  lowerBound: string;
  /** Label for the 100 end of the 0-100 scale. */
  upperBound: string;
  /** Short teaser paragraph (HTML), safe to render inline. */
  summary: string;
  /** Full explanatory paragraph (HTML), safe to render inline. */
  description: string;
  /** Extra caveats, e.g. Persuading not applying to every culture. */
  technicalNote: string | null;
  /** What it means to sit at the lower end of the scale. */
  lowerBoundDescription: string;
  /** What it means to sit at the upper end of the scale. */
  upperBoundDescription: string;
}

export interface Country {
  id: number;
  name: string;
  /** ISO 3166-1 alpha-3 code. */
  iso3: string;
  /** ISO 3166-1 alpha-2 code. */
  iso2: string;
  numericCode: number;
  scores: Scores;
}
