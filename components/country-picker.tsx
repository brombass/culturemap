import { useMemo, useRef, useState } from "react";
import { Shuffle, X, Search, Trash2 } from "lucide-react";
import { countries, type Country } from "@/lib/data";
import { colorForIndex, MAX_SELECTABLE } from "@/lib/color";
import { cn } from "@/lib/cn";

interface CountryPickerProps {
  selected: number[];
  toggle: (id: number) => void;
  remove: (id: number) => void;
  clear: () => void;
  shuffle: (count?: number) => void;
}

export function CountryPicker({
  selected,
  toggle,
  remove,
  clear,
  shuffle,
}: CountryPickerProps) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const selectedCountries = useMemo(
    () =>
      selected
        .map((id) => countries.find((c) => c.id === id))
        .filter((c): c is Country => Boolean(c)),
    [selected],
  );

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = q
      ? countries.filter(
          (c) =>
            c.name.toLowerCase().includes(q) ||
            c.iso2.toLowerCase() === q ||
            c.iso3.toLowerCase() === q,
        )
      : countries;
    return list.slice(0, 8);
  }, [query]);

  const atLimit = selected.length >= MAX_SELECTABLE;

  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-serif text-xl font-semibold">
            Compare countries
          </h2>
          <p className="text-sm text-muted">
            Add up to {MAX_SELECTABLE} countries to plot on the eight scales
            below.
          </p>
        </div>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => shuffle(4)}
            className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium transition-colors hover:border-accent hover:text-accent-strong"
          >
            <Shuffle className="h-3.5 w-3.5" aria-hidden />
            Surprise me
          </button>
          <button
            type="button"
            onClick={clear}
            disabled={selected.length === 0}
            className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium transition-colors hover:border-accent hover:text-accent-strong disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Trash2 className="h-3.5 w-3.5" aria-hidden />
            Clear
          </button>
        </div>
      </div>

      {/* Selected chips */}
      <div className="mt-4 flex min-h-9 flex-wrap gap-2">
        {selectedCountries.length === 0 && (
          <p className="text-sm text-muted">
            No countries selected yet &mdash; search below or hit
            &ldquo;Surprise me&rdquo;.
          </p>
        )}
        {selectedCountries.map((c) => {
          const idx = selected.indexOf(c.id);
          const color = colorForIndex(idx);
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => remove(c.id)}
              aria-label={`Remove ${c.name} from comparison`}
              title={`Remove ${c.name}`}
              className="animate-fade-in-up inline-flex items-center gap-2 rounded-full border border-border bg-background-alt py-1 pl-1.5 pr-2 text-sm transition-colors hover:border-accent hover:bg-card"
            >
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ background: color }}
                aria-hidden
              />
              {c.name}
              <X
                className="h-3.5 w-3.5 text-muted transition-colors hover:text-foreground"
                aria-hidden
              />
            </button>
          );
        })}
      </div>

      {/* Search */}
      <div className="relative mt-4">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
          aria-hidden
        />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 120)}
          placeholder={
            atLimit
              ? `Limit of ${MAX_SELECTABLE} reached — remove one to add another`
              : "Search countries… e.g. Japan, Brazil, Germany"
          }
          disabled={atLimit}
          className="w-full rounded-xl border border-border bg-background py-2.5 pl-9 pr-3 text-sm outline-none ring-offset-2 ring-offset-card transition-shadow placeholder:text-muted focus:ring-2 focus:ring-ring disabled:opacity-60"
        />
        {open && query && (
          <div className="absolute z-20 mt-1.5 w-full overflow-hidden rounded-xl border border-border bg-card shadow-lg">
            {results.length === 0 && (
              <p className="px-3 py-3 text-sm text-muted">
                No country matches &ldquo;{query}&rdquo;.
              </p>
            )}
            <ul role="listbox">
              {results.map((c) => {
                const isSelected = selected.includes(c.id);
                return (
                  <li key={c.id}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      onMouseDown={(e) => {
                        // prevent input blur before click registers
                        e.preventDefault();
                      }}
                      onClick={() => {
                        toggle(c.id);
                        setQuery("");
                        inputRef.current?.focus();
                      }}
                      disabled={!isSelected && atLimit}
                      className={cn(
                        "flex w-full items-center justify-between px-3 py-2 text-left text-sm transition-colors hover:bg-background-alt disabled:cursor-not-allowed disabled:opacity-40",
                        isSelected && "bg-background-alt",
                      )}
                    >
                      <span>
                        {c.name}{" "}
                        <span className="text-muted">({c.iso2})</span>
                      </span>
                      <span className="text-xs text-muted">
                        {isSelected ? "Remove" : "Add"}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
