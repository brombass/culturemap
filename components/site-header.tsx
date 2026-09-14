import { CultureMapIcon } from "./culture-map-icon";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <a href="#top" className="flex items-center gap-2">
          <CultureMapIcon className="h-9 w-9 text-accent-strong" />
          <span className="font-serif text-[15px] font-semibold tracking-tight">
            The Culture Map
          </span>
        </a>
        <nav className="flex items-center gap-4 text-sm text-muted">
          <a
            className="hidden transition-colors hover:text-foreground sm:inline"
            href="#compare"
          >
            Compare
          </a>
          <a
            className="hidden transition-colors hover:text-foreground sm:inline"
            href="#countries"
          >
            All countries
          </a>
          <a
            className="hidden transition-colors hover:text-foreground sm:inline"
            href="#about"
          >
            About
          </a>
          <a
            className="rounded-full border border-border px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-accent hover:text-accent-strong"
            href="https://erinmeyer.com/books/the-culture-map/"
            target="_blank"
            rel="noreferrer"
          >
            About the book
          </a>
        </nav>
      </div>
    </header>
  );
}
