import { useMemo } from "react";
import { countriesById } from "@/lib/data";
import { useCountrySelection } from "@/lib/use-selection";
import { SiteHeader } from "./site-header";
import { Hero } from "./hero";
import { CountryPicker } from "./country-picker";
import { ScaleBoard } from "./scale-board";
import { CountryTable } from "./country-table";
import { SiteFooter } from "./site-footer";

export function CultureMapApp() {
  const { selected, toggle, remove, clear, shuffle } = useCountrySelection();

  const selectedCountries = useMemo(
    () =>
      selected
        .map((id) => countriesById.get(id))
        .filter((c): c is NonNullable<typeof c> => Boolean(c)),
    [selected],
  );

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <section
          id="compare"
          className="mx-auto flex max-w-6xl flex-col gap-6 px-4 pb-16 sm:px-6"
        >
          <CountryPicker
            selected={selected}
            toggle={toggle}
            remove={remove}
            clear={clear}
            shuffle={shuffle}
          />
          <ScaleBoard countries={selectedCountries} />
        </section>
        <section
          id="countries"
          className="mx-auto max-w-6xl px-4 pb-20 sm:px-6"
        >
          <CountryTable selected={selected} toggle={toggle} />
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
