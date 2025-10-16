import { useEffect, useRef } from "react";
import AirDatepicker from "air-datepicker";
import "air-datepicker/air-datepicker.css";
import PromoEvent from "./PromoEvent.jsx";

export default function CalendarFilter() {
  const calendarRef = useRef(null);
  const fromInputRef = useRef(null);
  const toInputRef = useRef(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    if (!calendarRef.current) return;

    const dp = new AirDatepicker(calendarRef.current, {
      minDate: new Date(),
      range: true,
      fixedHeight: true,
      classes: "calendar",
      onSelect: ({ formattedDate }) => {
        if (fromInputRef.current)
          fromInputRef.current.value = formattedDate[0] || "";
        if (toInputRef.current)
          toInputRef.current.value = formattedDate[1] || "";
      },
      onRenderCell: ({ date, cellType }) => {
        if (cellType === "day") {
          return {
            html: `${date.getDate()}<span class='calendar_event_indicator'></span>`,
            classes: "calendar_cell",
            attrs: { title: "Has Event" },
          };
        }
        if (cellType === "month" || cellType === "year") {
          return {
            classes: "calendar_cell",
            attrs: { title: "Has Event" },
          };
        }
      },
    });

    if (prevRef.current)
      prevRef.current.addEventListener("click", () => dp.prev());
    if (nextRef.current)
      nextRef.current.addEventListener("click", () => dp.next());

    return () => {
      dp.destroy();
    };
  }, []);

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
            type="text"
            placeholder="01.01.2025"
          />
          <input
            ref={toInputRef}
            id="calendar-input-to"
            type="text"
            placeholder="01.01.2025"
          />
        </div>
        <div ref={calendarRef} className="calendar"></div>
      </div>

      <PromoEvent />
    </>
  );
}
