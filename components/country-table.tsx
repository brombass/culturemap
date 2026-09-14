import { useMemo, useState } from "react";
import { ArrowDown, ArrowUp, ArrowUpDown, Plus, Search, X } from "lucide-react";
import { countries, dimensions, type DimensionCode } from "@/lib/data";
import { colorForIndex, MAX_SELECTABLE } from "@/lib/color";
import { hasScore } from "@/lib/scores";
import { cn } from "@/lib/cn";

type SortKey = "name" | DimensionCode;

interface CountryTableProps {
  selected: number[];
  toggle: (id: number) => void;
}

const SHORT_LABEL: Record<DimensionCode, string> = {
  communicating: "Comm.",
  evaluating: "Eval.",
  leading: "Lead.",
  deciding: "Decide",
  trusting: "Trust",
  disagreeing: "Disagree",
  scheduling: "Schedule",
  persuading: "Persuade",
};

function SortIcon({
  active,
  dir,
}: {
  active: boolean;
  dir: "asc" | "desc";
}) {
  if (!active) return <ArrowUpDown className="h-3 w-3 text-muted/60" aria-hidden />;
  return dir === "asc" ? (
    <ArrowUp className="h-3 w-3 text-accent-strong" aria-hidden />
  ) : (
    <ArrowDown className="h-3 w-3 text-accent-strong" aria-hidden />
  );
}

export function CountryTable({ selected, toggle }: CountryTableProps) {
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = q
      ? countries.filter(
          (c) =>
            c.name.toLowerCase().includes(q) ||
            c.iso2.toLowerCase().includes(q) ||
            c.iso3.toLowerCase().includes(q),
        )
      : countries;

    const sorted = [...filtered].sort((a, b) => {
      if (sortKey === "name") {
        const cmp = a.name.localeCompare(b.name);
        return sortDir === "asc" ? cmp : -cmp;
      }
      const av = a.scores[sortKey];
      const bv = b.scores[sortKey];
      // Always push "not scored" (-1) rows to the bottom, in either sort
      // direction, instead of letting them masquerade as the lowest score.
      if (!hasScore(av) && !hasScore(bv)) return 0;
      if (!hasScore(av)) return 1;
      if (!hasScore(bv)) return -1;
      const cmp = av - bv;
      return sortDir === "asc" ? cmp : -cmp;
    });
    return sorted;
  }, [query, sortKey, sortDir]);

  function onSort(key: SortKey) {
    if (key === sortKey) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir(key === "name" ? "asc" : "desc");
    }
  }

  return (
    <div className="rounded-2xl border border-border bg-card shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 sm:p-5">
        <div>
          <h2 className="font-serif text-xl font-semibold">
            All {countries.length} countries
          </h2>
          <p className="text-sm text-muted">
            Sort by any scale, or search and click a row to add it to your
            comparison.
          </p>
        </div>
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
            aria-hidden
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter countries…"
            className="w-56 rounded-full border border-border bg-background py-2 pl-9 pr-8 text-sm outline-none placeholder:text-muted focus:ring-2 focus:ring-ring"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear filter"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted hover:text-foreground"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      <div className="overflow-x-auto border-t border-border">
        <table className="w-full min-w-[880px] border-collapse text-sm">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wide text-muted">
              <th className="sticky left-0 z-10 bg-card px-4 py-2.5">
                <button
                  type="button"
                  onClick={() => onSort("name")}
                  className="inline-flex items-center gap-1 hover:text-foreground"
                >
                  Country{" "}
                  <SortIcon active={sortKey === "name"} dir={sortDir} />
                </button>
              </th>
              {dimensions.map((d) => (
                <th key={d.id} className="px-3 py-2.5" title={d.name}>
                  <button
                    type="button"
                    onClick={() => onSort(d.code)}
                    className="inline-flex items-center gap-1 hover:text-foreground"
                  >
                    {SHORT_LABEL[d.code]}{" "}
                    <SortIcon active={sortKey === d.code} dir={sortDir} />
                  </button>
                </th>
              ))}
              <th className="px-3 py-2.5 text-right">
                <span className="sr-only">Add to comparison</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((c) => {
              const selIndex = selected.indexOf(c.id);
              const isSelected = selIndex !== -1;
              const dotColor = isSelected ? colorForIndex(selIndex) : undefined;
              const atLimit = !isSelected && selected.length >= MAX_SELECTABLE;
              return (
                <tr
                  key={c.id}
                  onClick={() => !atLimit && toggle(c.id)}
                  className={cn(
                    "cursor-pointer border-t border-border/70 transition-colors hover:bg-background-alt",
                    isSelected && "bg-background-alt",
                    atLimit && "cursor-not-allowed opacity-50",
                  )}
                >
                  <td className="sticky left-0 z-10 bg-inherit px-4 py-2 font-medium">
                    <span className="inline-flex items-center gap-2">
                      <span
                        aria-hidden
                        className="h-2 w-2 shrink-0 rounded-full"
                        style={{
                          background: dotColor ?? "var(--border)",
                        }}
                      />
                      {c.name}
                      <span className="font-mono text-xs text-muted">
                        {c.iso2}
                      </span>
                    </span>
                  </td>
                  {dimensions.map((d) => {
                    const score = c.scores[d.code];
                    const rated = hasScore(score);
                    return (
                      <td key={d.id} className="px-3 py-2">
                        <div className="relative h-1.5 w-16 rounded-full bg-border">
                          {rated && (
                            <span
                              className="absolute top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-card"
                              style={{
                                left: `${score}%`,
                                background: dotColor ?? "var(--accent)",
                              }}
                            />
                          )}
                        </div>
                        <span className="mt-0.5 block font-mono text-[11px] text-muted">
                          {rated ? score : "N/A"}
                        </span>
                      </td>
                    );
                  })}
                  <td className="px-3 py-2 text-right">
                    <span
                      className={cn(
                        "inline-flex h-6 w-6 items-center justify-center rounded-full border border-border text-muted",
                        isSelected && "border-accent text-accent-strong",
                      )}
                      aria-hidden
                    >
                      {isSelected ? (
                        <X className="h-3.5 w-3.5" />
                      ) : (
                        <Plus className="h-3.5 w-3.5" />
                      )}
                    </span>
                  </td>
                </tr>
              );
            })}
            {rows.length === 0 && (
              <tr>
                <td
                  colSpan={dimensions.length + 2}
                  className="px-4 py-8 text-center text-sm text-muted"
                >
                  No country matches &ldquo;{query}&rdquo;.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
