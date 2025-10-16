import { useEffect, useRef } from "react";
import AirDatepicker from "air-datepicker";
import "air-datepicker/air-datepicker.css";
import PromoEvent from "./PromoEvent.jsx";
import { useEventsStore } from "../store/eventsStore";
import { useFiltersStore } from "../store/filtersStore";

export default function CalendarFilter() {
  const { loadEvents, getEventDates } = useEventsStore();
  const { setFilter } = useFiltersStore();

  const calendarRef = useRef(null);
  const fromInputRef = useRef(null);
  const toInputRef = useRef(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    if (!calendarRef.current) return;

    let dp;
    let destroyed = false;

    async function initCalendar() {
      await loadEvents("upcoming");
      const eventDates = getEventDates();

      if (destroyed) return; // защита от race condition

      // Уничтожаем возможный предыдущий экземпляр (если вдруг остался)
      if (dp) dp.destroy();

      dp = new AirDatepicker(calendarRef.current, {
        minDate: new Date(),
        range: true,
        fixedHeight: true,
        classes: "calendar",
        onSelect: ({ formattedDate }) => {
          if (fromInputRef.current)
            fromInputRef.current.value = formattedDate[0] || "";
          if (toInputRef.current)
            toInputRef.current.value = formattedDate[1] || "";

          setFilter("dateStart", formattedDate[0] || null);
          setFilter("dateEnd", formattedDate[1] || null);
        },
        onRenderCell: ({ date, cellType }) => {
          if (cellType === "day") {
            const isoDate = date.toISOString().split("T")[0];
            const hasEvent = eventDates.includes(isoDate);

            return {
              html: `${date.getDate()}${
                hasEvent ? "<span class='calendar_event_indicator'></span>" : ""
              }`,
              classes: hasEvent ? "calendar_cell has-event" : "calendar_cell",
            };
          }
        },
      });

      if (prevRef.current) prevRef.current.onclick = () => dp.prev();
      if (nextRef.current) nextRef.current.onclick = () => dp.next();
    }

    initCalendar();

    return () => {
      destroyed = true;
      if (dp) dp.destroy();
    };
  }, []); // без зависимостей, чтобы не вызывался заново

  return (
    <>
      <div className="filters_content_calendar">
        <div className="filters_content_title filters_content_title-alt">
          <span className="title title-h3">Тематика</span>
          <div className="calendar_nav">
            <button
              ref={prevRef}
              className="calendar_nav_item calendar_nav-prev"
              type="button"
            ></button>
            <button
              ref={nextRef}
              className="calendar_nav_item calendar_nav-next"
              type="button"
            ></button>
          </div>
        </div>

        <div className="calendar_inputs">
          <input
            ref={fromInputRef}
            id="calendar-input-from"
            type="da"
            placeholder="01.01.2025"
          />
          <input
            ref={toInputRef}
            id="calendar-input-to"
            type="text"
            placeholder="01.01.2025"
          />
        </div>

        {/* сам календарь */}
        <div ref={calendarRef} className="calendar"></div>
      </div>

      <PromoEvent />
    </>
  );
}
