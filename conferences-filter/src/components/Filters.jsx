import React from "react";

function Filters() {
  return (
    <div className="filters_items">
      <input
        className="filters_checkbox"
        id="calendar-id"
        type="checkbox"
        name="filters"
      />
      <label className="filters_item filters_item-calendar" for="calendar-id">
        <svg
          className="filters_item-calendar_icon"
          viewBox="0 0 20 20"
          width="20"
          height="20"
        >
          <use href="/assets/images/svg/menu-sprite.svg#calendar-icon"></use>
        </svg>
      </label>
      <input
        className="filters_checkbox"
        id="topics-id"
        type="checkbox"
        name="filters"
      />
      <label className="filters_item filters_item-arrow" for="topics-id">
        <span>Тематика</span>
      </label>
      <input
        className="filters_checkbox"
        id="country-id"
        type="checkbox"
        name="filters"
      />
      <label className="filters_item filters_item-arrow" for="country-id">
        <span>Страна</span>
      </label>
      <input
        className="filters_checkbox"
        id="city-id"
        type="checkbox"
        name="filters"
      />
      <label className="filters_item filters_item-arrow" for="city-id">
        <span>Город</span>
      </label>
      <input
        className="filters_checkbox"
        id="type-id"
        type="checkbox"
        name="filters"
      />
      <label className="filters_item filters_item-arrow" for="type-id">
        <span>Тип</span>
      </label>
      <a className="filters_item filters_item-past" href="#">
        Прошедшие
      </a>
    </div>
  );
}

export default Filters;
