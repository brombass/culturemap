export function SiteFooter() {
  return (
    <footer id="about" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-muted sm:px-6">
        <p className="max-w-2xl leading-relaxed">
          The eight-scale framework, country dataset and color palette on this
          page come from{" "}
          <strong className="font-medium text-foreground">
            The Culture Map
          </strong>{" "}
          by Erin Meyer. This page is an independent, unofficial rebuild of
          the original static tool with a modern interface; it isn&rsquo;t
          affiliated with or endorsed by the author or INSEAD. The original
          static assets this rebuild was derived from are kept in{" "}
          <code className="rounded bg-background-alt px-1.5 py-0.5 font-mono text-xs">
            /legacy
          </code>{" "}
          for reference.
        </p>
        <p className="mt-4">
          Built with React, Vite &amp; Tailwind CSS. No accounts, tracking or
          server required &mdash; everything runs in your browser.
        </p>
      </div>
    </footer>
  );
}
