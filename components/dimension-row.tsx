import { useMemo, useState } from "react";
import { Info } from "lucide-react";
import type { Country, Dimension } from "@/lib/data";
import { colorForIndex } from "@/lib/color";
import { computeLanes } from "@/lib/layout-markers";
import { hasScore } from "@/lib/scores";
import { ScaleMarker } from "./scale-marker";
import { cn } from "@/lib/cn";

interface DimensionRowProps {
  dimension: Dimension;
  countries: Country[];
}

export function DimensionRow({ dimension, countries }: DimensionRowProps) {
  const [infoOpen, setInfoOpen] = useState(false);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const plottable = useMemo(
    () => countries.filter((c) => hasScore(c.scores[dimension.code])),
    [countries, dimension.code],
  );
  const unrated = useMemo(
    () => countries.filter((c) => !hasScore(c.scores[dimension.code])),
    [countries, dimension.code],
  );
  const items = useMemo(
    () =>
      plottable.map((c) => ({
        id: c.id,
        score: c.scores[dimension.code],
      })),
    [plottable, dimension.code],
  );
  const lanes = useMemo(() => computeLanes(items), [items]);
  const colorIndexById = useMemo(() => {
    const map = new Map<number, number>();
    countries.forEach((c, i) => map.set(c.id, i));
    return map;
  }, [countries]);

  return (
    <div className="border-b border-border py-5 last:border-b-0 sm:py-6">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-serif text-base font-semibold sm:text-lg">
          {dimension.name}
        </h3>
        <button
          type="button"
          onClick={() => setInfoOpen((v) => !v)}
          aria-expanded={infoOpen}
          className={cn(
            "flex shrink-0 items-center gap-1 rounded-full border border-border px-2.5 py-1 text-xs text-muted transition-colors hover:border-accent hover:text-accent-strong",
            infoOpen && "border-accent text-accent-strong",
          )}
        >
          <Info className="h-3.5 w-3.5" aria-hidden />
          <span className="hidden sm:inline">What&rsquo;s this?</span>
        </button>
      </div>

      <div className="mt-4 flex justify-between text-xs font-medium uppercase tracking-wide text-muted">
        <span>{dimension.lowerBound}</span>
        <span>{dimension.upperBound}</span>
      </div>

      <div className="relative mt-2 h-10">
        {/* base track */}
        <div className="absolute left-0 right-0 top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-border" />
        {/* quartile ticks */}
        {[0, 25, 50, 75, 100].map((tick) => (
          <div
            key={tick}
            aria-hidden
            className="absolute top-1/2 h-2 w-px -translate-x-1/2 -translate-y-1/2 bg-border"
            style={{ left: `${tick}%` }}
          />
        ))}

        {countries.length === 0 && (
          <p className="absolute inset-0 flex items-center justify-center text-xs text-muted">
            Add countries above to see them plotted here.
          </p>
        )}

        {plottable.map((c) => (
          <ScaleMarker
            key={c.id}
            score={c.scores[dimension.code]}
            lane={lanes.get(c.id) ?? 0}
            color={colorForIndex(colorIndexById.get(c.id) ?? 0)}
            countryName={c.name}
            hovered={hoveredId === c.id}
            onHover={(h) => setHoveredId(h ? c.id : null)}
          />
        ))}
      </div>

      {unrated.length > 0 && (
        <p className="mt-2 text-xs text-muted">
          Not scored on this scale for {unrated.map((c) => c.name).join(", ")}
          {unrated.length === 1 ? " — it doesn't" : " — they don't"} fit the
          principles-first / applications-first split.
        </p>
      )}

      {infoOpen && (
        <div className="animate-fade-in-up mt-4 grid gap-4 rounded-xl bg-background-alt p-4 text-sm leading-relaxed text-muted sm:grid-cols-2">
          <p
            className="richtext sm:col-span-2"
            dangerouslySetInnerHTML={{ __html: dimension.description }}
          />
          {dimension.technicalNote && (
            <p className="rounded-lg border border-border bg-card p-3 text-xs sm:col-span-2">
              <span className="font-medium text-foreground">Note: </span>
              {dimension.technicalNote}
            </p>
          )}
          <div className="rounded-lg border border-border bg-card p-3">
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-foreground">
              {dimension.lowerBound}
            </p>
            <p>{dimension.lowerBoundDescription}</p>
          </div>
          <div className="rounded-lg border border-border bg-card p-3">
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-foreground">
              {dimension.upperBound}
            </p>
            <p>{dimension.upperBoundDescription}</p>
          </div>
        </div>
      )}
    </div>
  );
}
