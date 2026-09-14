# The Culture Map

A modern, single-page rebuild of the classic *Culture Map* tool (based on
Erin Meyer's research for her book of the same name), which lets you compare
countries across eight cross-cultural scales: **Communicating, Evaluating,
Leading, Deciding, Trusting, Disagreeing, Scheduling** and **Persuading**.

Everything the app renders — the 71 countries, their scores, the eight
dimensions and their descriptions, and even the comparison color palette —
was extracted straight out of the original site's `assets/javascripts/bundle.min.js`
(a minified Backbone.js app). See [`lib/data`](./lib/data) for the cleaned-up,
typed dataset and [`legacy/`](./legacy) for the original static site it came
from.

The rebuild is a fully client-side single-page app (no backend, no
accounts): built with **Next.js (App Router)**, **TypeScript** and
**Tailwind CSS**, exported as static files so it can be hosted anywhere.

## Features

- Search and add up to 10 countries to compare, colored using the original
  tool's own palette.
- All eight scales rendered as horizontal tracks with markers, tooltips,
  and an expandable explanation for each scale (including the lower/upper
  bound meanings).
- Countries that the book doesn't rate on the Persuading scale (holistic
  reasoning cultures such as Japan, China, Korea, India, etc.) are called
  out explicitly instead of being silently misplotted.
- A sortable, searchable table of all 71 countries — click a row to add or
  remove it from the comparison.
- Selection state is mirrored in the URL (`?c=US,JP,FR`) so a comparison can
  be bookmarked or shared without a server.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

## Production build

```bash
npm run build    # outputs a static site to ./out
npx serve out    # or any static file host
```

## Project layout

```
app/                 Next.js App Router entry (layout, page, global CSS)
components/          UI components (client-side)
lib/data/             Extracted & typed dataset (countries, dimensions, palette)
lib/                 Selection state, color, layout and scoring helpers
legacy/              The original static site + bundle.min.js it was derived from
```
