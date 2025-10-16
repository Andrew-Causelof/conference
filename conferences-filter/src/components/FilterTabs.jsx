import { useState } from "react";
import { filterTabs } from "../constants/filterTabs";
import { useEventsStore } from "../store/eventsStore";
import { useFiltersStore } from "../store/filtersStore";
export default function FilterTabs({ active, onChange }) {
  const [activeType, setActiveType] = useState("upcoming");
  const { loadEvents } = useEventsStore();
  const { resetFilters } = useFiltersStore();

  const handleClick = async (type) => {
    setActiveType(type);
    await loadEvents(type); // загружаем новые события
    resetFilters(); // сбрасываем фильтры
  };

  return (
    <div className="filters_items">
      {filterTabs.map((t) => (
        <label
          key={t.id}
          className={`filters_item ${
            t.id !== "calendar" ? "filters_item-arrow" : ""
          }  ${active === t.id ? "active" : ""} ${t.className || ""}`}
          onClick={() => onChange(active === t.id ? null : t.id)}
        >
          {t.id === "calendar" ? (
            <svg
              className="filters_item-calendar_icon"
              viewBox="0 0 20 20"
              width="20"
              height="20"
            >
              <use href="/assets/images/svg/menu-sprite.svg#calendar-icon"></use>
            </svg>
          ) : (
            <span>{t.label}</span>
          )}
        </label>
      ))}

      {activeType === "upcoming" ? (
        <button
          className="filters_item filters_item-past"
          onClick={() => handleClick("past")}
        >
          Прошедшие
        </button>
      ) : (
        <button
          className="filters_item filters_item-past active"
          onClick={() => handleClick("upcoming")}
        >
          Будущие
        </button>
      )}
    </div>
  );
}
