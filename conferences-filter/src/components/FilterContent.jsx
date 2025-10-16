// FilterContent.jsx
import FilterPanel from "./FilterPanel";
import CalendarFilter from "./CalendarFilter";

export default function FilterContent({ id, active }) {
  const isVisible = active === id;
  return (
    <div
      className={`filters_content ${isVisible ? "show" : ""}`}
      data-filters-id={`${id}-id`}
    >
      {id === "calendar" ? (
        <div className="filters_content_wrapper filters_content_wrapper-calendar">
          <CalendarFilter />
        </div>
      ) : (
        <div className="filters_content">
          <FilterPanel title={id} />
        </div>
      )}
      <div className="filters_content_wrapper">
        {id === "calendar" ? <CalendarFilter /> : <FilterPanel title={id} />}
      </div>
    </div>
  );
}
