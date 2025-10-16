import React from "react";
import PromoEvent from "./PromoEvent";

function CalendarFilter() {
  return (
    <>
      <div class="filters_content_calendar">
        <div class="filters_content_title filters_content_title-alt">
          <span class="title title-h3">Тематика</span>
          <div class="calendar_nav">
            <button class="calendar_nav_item calendar_nav-prev"></button>
            <button class="calendar_nav_item calendar_nav-next"></button>
          </div>
        </div>
        <div class="calendar_inputs">
          <input
            id="calendar-input-from"
            type="text"
            placeholder="01.01.2025"
          />
          <input id="calendar-input-to" type="text" placeholder="01.01.2025" />
        </div>
      </div>
      <PromoEvent />
    </>
  );
}

export default CalendarFilter;
