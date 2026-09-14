"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { countries, defaultCountries } from "./data";
import { MAX_SELECTABLE } from "./color";

const PARAM = "c";

function readFromLocation(): number[] | null {
  if (typeof window === "undefined") return null;
  const params = new URLSearchParams(window.location.search);
  const raw = params.get(PARAM);
  if (!raw) return null;
  const codes = raw.split(",").filter(Boolean);
  const ids = codes
    .map((code) => countries.find((c) => c.iso2 === code.toUpperCase())?.id)
    .filter((id): id is number => typeof id === "number");
  return ids.length ? ids : null;
}

function writeToLocation(ids: number[]) {
  if (typeof window === "undefined") return;
  const url = new URL(window.location.href);
  if (ids.length) {
    const codes = ids
      .map((id) => countries.find((c) => c.id === id)?.iso2)
      .filter(Boolean)
      .join(",");
    url.searchParams.set(PARAM, codes);
  } else {
    url.searchParams.delete(PARAM);
  }
  window.history.replaceState({}, "", url);
}

/**
 * Holds the ordered list of selected country ids (order = legend / color
 * order) and keeps it mirrored in the URL query string so a comparison can
 * be bookmarked or shared without any backend.
 */
export function useCountrySelection() {
  const [selected, setSelected] = useState<number[]>(
    () => defaultCountries.map((c) => c.id),
  );
  const hydrated = useRef(false);

  useEffect(() => {
    // Read the shareable URL only once, after mount, so the very first
    // client render matches the statically prerendered HTML exactly and
    // then "upgrades" to whatever the link encoded.
    const fromUrl = readFromLocation();
    if (fromUrl) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time hydration from the URL, not a render loop
      setSelected(fromUrl);
    }
    hydrated.current = true;
  }, []);

  useEffect(() => {
    if (!hydrated.current) return;
    writeToLocation(selected);
  }, [selected]);

  const toggle = useCallback((id: number) => {
    setSelected((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= MAX_SELECTABLE) return prev;
      return [...prev, id];
    });
  }, []);

  const remove = useCallback((id: number) => {
    setSelected((prev) => prev.filter((x) => x !== id));
  }, []);

  const clear = useCallback(() => setSelected([]), []);

  const shuffle = useCallback((count = 4) => {
    const pool = [...countries];
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    setSelected(pool.slice(0, count).map((c) => c.id));
  }, []);

  return { selected, toggle, remove, clear, shuffle };
}
