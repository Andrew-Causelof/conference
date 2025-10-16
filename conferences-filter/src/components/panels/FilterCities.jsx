import React, { useMemo } from "react";
import { useFiltersStore } from "../../store/filtersStore";
import { useEventsStore } from "../../store/eventsStore";

export default function FilterCities() {
  const { events } = useEventsStore();
  const { selected, setCity } = useFiltersStore();
  const { cities: selectedCities } = selected;

  // Получаем уникальные города
  const cities = useMemo(() => {
    const set = new Set();
    events.forEach((e) => e.city && set.add(e.city));
    return Array.from(set);
  }, [events]);

  const toggleCity = (city) => {
    if (selectedCities.includes(city)) {
      setCity(selectedCities.filter((c) => c !== city));
    } else {
      setCity([...selectedCities, city]);
    }
  };

  return (
    <div className="filters_content_checkboxes">
      <input
        className="filters_content_checkbox"
        id="city-all"
        type="checkbox"
        checked={selectedCities.length === 0}
        onChange={() => setCity([])}
      />
      <label className="filters_content_label" htmlFor="city-all">
        Все <span>{events.length}</span>
      </label>

      {cities.map((city) => {
        const checked = selectedCities.includes(city);
        const count = events.filter((e) => e.city === city).length;

        return (
          <React.Fragment key={city}>
            <input
              className="filters_content_checkbox"
              id={`city-${city}`}
              type="checkbox"
              checked={checked}
              onChange={() => toggleCity(city)}
            />
            <label className="filters_content_label" htmlFor={`city-${city}`}>
              {city} <span>{count}</span>
            </label>
          </React.Fragment>
        );
      })}
    </div>
  );
}
