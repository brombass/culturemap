import { dimensions, type Country } from "@/lib/data";
import { colorForIndex } from "@/lib/color";
import { DimensionRow } from "./dimension-row";

interface ScaleBoardProps {
  countries: Country[];
}

export function ScaleBoard({ countries }: ScaleBoardProps) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-2">
        <h2 className="font-serif text-xl font-semibold">
          The eight scales
        </h2>
        {countries.length > 0 && (
          <ul className="flex flex-wrap gap-x-4 gap-y-1.5">
            {countries.map((c, i) => (
              <li
                key={c.id}
                className="flex items-center gap-1.5 text-xs text-muted"
              >
                <span
                  aria-hidden
                  className="h-2 w-2 rounded-full"
                  style={{ background: colorForIndex(i) }}
                />
                {c.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        {dimensions.map((dimension) => (
          <DimensionRow
            key={dimension.id}
            dimension={dimension}
            countries={countries}
          />
        ))}
      </div>
    </div>
  );
}
