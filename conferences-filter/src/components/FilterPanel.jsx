import React, { useMemo } from "react";
import { useFiltersStore } from "../store/filtersStore";

function FilterPanel({ id, conferenceList = [] }) {
  const {
    topics: selectedTopics,
    country: selectedCountry,
    city: selectedCity,
    setTopics,
    setCountry,
    setCity,
  } = useFiltersStore();

  // --- вычисляем доступные опции ---
  const { topics, countries, cities } = useMemo(() => {
    const topicsMap = new Map();
    const countriesSet = new Set();
    const citiesSet = new Set();

    conferenceList.forEach((conf) => {
      conf.topics?.forEach((topic) => {
        if (!topicsMap.has(topic.code)) topicsMap.set(topic.code, topic);
      });
      if (conf.country) countriesSet.add(conf.country);
      if (conf.city) citiesSet.add(conf.city);
    });

    return {
      topics: Array.from(topicsMap.values()),
      countries: Array.from(countriesSet),
      cities: Array.from(citiesSet),
    };
  }, [conferenceList]);

  // --- универсальная отрисовка чекбоксов ---
  const renderCheckboxes = (items, selected = [], onChange, type) => (
    <div className="filters_content_checkboxes">
      <input
        className="filters_content_checkbox"
        id={`${type}-all`}
        type="checkbox"
        checked={selected.length === 0}
        onChange={() => onChange([])}
      />
      <label className="filters_content_label" htmlFor={`${type}-all`}>
        Все <span>{conferenceList.length}</span>
      </label>

      {items.map((item) => {
        const code = item.code || item;
        const label = item.name || item;
        const checked = selected.includes(code);
        const count = conferenceList.filter((c) => {
          if (type === "topics") {
            return c.topics?.some((t) => t.code === code);
          }
          if (type === "country") {
            return c.country === code;
          }
          if (type === "city") {
            return c.city === code;
          }
          return false;
        }).length;

        return (
          <React.Fragment key={code}>
            <input
              className="filters_content_checkbox"
              id={`${type}-${code}`}
              type="checkbox"
              checked={checked}
              onChange={() =>
                onChange(
                  checked
                    ? selected.filter((v) => v !== code)
                    : [...selected, code]
                )
              }
            />
            <label
              className="filters_content_label"
              htmlFor={`${type}-${code}`}
            >
              {label} <span>{count}</span>
            </label>
          </React.Fragment>
        );
      })}
    </div>
  );

  // --- контент в зависимости от вкладки ---
  let title = "";
  let content = null;

  switch (id) {
    case "topics":
      title = "Тематика";
      content = renderCheckboxes(topics, selectedTopics, setTopics, "topics");
      break;
    case "country":
      title = "Страна";
      content = renderCheckboxes(
        countries.map((c) => ({ code: c, name: c })),
        selectedCountry ? [selectedCountry] : [],
        (arr) => setCountry(arr[0] || ""),
        "country"
      );
      break;
    case "city":
      title = "Город";
      content = renderCheckboxes(
        cities.map((c) => ({ code: c, name: c })),
        selectedCity ? [selectedCity] : [],
        (arr) => setCity(arr[0] || ""),
        "city"
      );
      break;
    case "type":
      title = "Тип";
      content = <p>Фильтр "Тип" пока не реализован</p>;
      break;
    default:
      title = "Фильтр";
  }

  return (
    <>
      <div className="filters_content_title">
        <span className="title title-h3">{title}</span>
      </div>
      {content}
      <div className="filters_content_actions">
        <button className="btn btn--primary btn--md btn--f16" type="button">
          <span>Применить</span>
        </button>
      </div>
    </>
  );
}

export default FilterPanel;
