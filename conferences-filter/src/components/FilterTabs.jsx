import { filterTabs } from "../constants/filterTabs";
export default function FilterTabs({ active, onChange }) {
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
      <a className="filters_item filters_item-past" href="#">
        Прошедшие
      </a>
    </div>
  );
}
