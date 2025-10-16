import React, { useMemo } from "react";
import { useFiltersStore } from "../../store/filtersStore";
import { useEventsStore } from "../../store/eventsStore";

export default function FilterCountries() {
  const { events } = useEventsStore();
  const { selected, filteredEvents, setCountry } = useFiltersStore();
  const { countries: selectedCountries, dateStart, dateEnd } = selected;

  const sourceEvents = dateStart && dateEnd ? filteredEvents : events;

  // Получаем уникальные страны
  const countries = useMemo(() => {
    const set = new Set();
    sourceEvents.forEach((e) => e.country && set.add(e.country));
    return Array.from(set);
  }, [sourceEvents]);

  // Обработчик выбора/снятия галочки
  const toggleCountry = (country) => {
    if (selectedCountries.includes(country)) {
      setCountry(selectedCountries.filter((c) => c !== country));
    } else {
      setCountry([...selectedCountries, country]);
    }
  };

  return (
    <div className="filters_content_checkboxes">
      <input
        className="filters_content_checkbox"
        id="country-all"
        type="checkbox"
        checked={selectedCountries.length === 0}
        onChange={() => setCountry([])}
      />
      <label className="filters_content_label" htmlFor="country-all">
        Все <span>{sourceEvents.length}</span>
      </label>

      {countries.map((country) => {
        const checked = selectedCountries.includes(country);
        const count = sourceEvents.filter((e) => e.country === country).length;

        return (
          <React.Fragment key={country}>
            <input
              className="filters_content_checkbox"
              id={`country-${country}`}
              type="checkbox"
              checked={checked}
              onChange={() => toggleCountry(country)}
            />
            <label
              className="filters_content_label"
              htmlFor={`country-${country}`}
            >
              {country} <span>{count}</span>
            </label>
          </React.Fragment>
        );
      })}
    </div>
  );
}
