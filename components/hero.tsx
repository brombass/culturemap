import { dimensions } from "@/lib/data";
import { colorForIndex } from "@/lib/color";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_20%,color-mix(in_oklab,var(--accent)_18%,transparent),transparent_55%),radial-gradient(circle_at_85%_0%,color-mix(in_oklab,var(--accent-strong)_14%,transparent),transparent_45%)]"
      />
      <div className="mx-auto max-w-6xl px-4 pb-14 pt-14 sm:px-6 sm:pt-20">
        <div className="flex flex-wrap items-center gap-1.5">
          {dimensions.map((d, i) => (
            <span
              key={d.id}
              className="h-1.5 w-6 rounded-full opacity-80"
              style={{ background: colorForIndex(i) }}
              aria-hidden
            />
          ))}
          <span className="ml-2 text-xs font-medium uppercase tracking-[0.18em] text-muted">
            8 scales · 71 countries
          </span>
        </div>

        <h1 className="mt-6 max-w-3xl font-serif text-4xl font-semibold leading-[1.1] tracking-tight sm:text-6xl">
          Every culture negotiates, decides and disagrees differently.
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
          Based on Erin Meyer&rsquo;s research for{" "}
          <em className="font-serif not-italic text-foreground">
            The Culture Map
          </em>
          , this tool plots how business cultures around the world compare on
          eight scales &mdash; from low-context to high-context
          communication, egalitarian to hierarchical leadership, and beyond.
          Pick a few countries and see where the friction usually comes from.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href="#compare"
            className="rounded-full bg-accent-strong px-5 py-2.5 text-sm font-medium text-background shadow-sm transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Start comparing countries
          </a>
          <a
            href="#countries"
            className="rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent-strong"
          >
            Browse all 71 countries
          </a>
        </div>
      </div>
    </section>
  );
}
