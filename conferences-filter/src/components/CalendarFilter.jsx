import { useEffect, useRef, useState } from "react";
import AirDatepicker from "air-datepicker";
import "air-datepicker/air-datepicker.css";
import PromoEvent from "./PromoEvent.jsx";
// если у тебя свой компонент инпутов – оставь, я опускаю его здесь ради краткости
import { useEventsStore } from "../store/eventsStore";
import { useFiltersStore } from "../store/filtersStore";
import DateInput from "./DateInput";

export default function CalendarFilter() {
  const { events, getEventDates, currentType } = useEventsStore(); // ⬅️ читаем events
  const { setFilter, selected } = useFiltersStore();

  const calendarRef = useRef(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const dpRef = useRef(null);

  const [range, setRange] = useState({
    start: selected.dateStart,
    end: selected.dateEnd,
  });

  // фабрика рендера с точками (чтобы переиспользовать)
  const buildRenderCell =
    (eventDates) =>
    ({ date, cellType }) => {
      if (cellType !== "day") return;
      // лучше без UTC-сдвига: соберём локальную YYYY-MM-DD
      const y = date.getFullYear();
      const m = String(date.getMonth() + 1).padStart(2, "0");
      const d = String(date.getDate()).padStart(2, "0");
      const isoLocal = `${y}-${m}-${d}`;

      const hasEvent = eventDates.includes(isoLocal);
      return {
        html: `${date.getDate()}${
          hasEvent ? "<span class='calendar_event_indicator'></span>" : ""
        }`,
        classes: hasEvent ? "calendar_cell has-event" : "calendar_cell",
      };
    };

  // Инициализация/переинициализация при смене типа И/ИЛИ когда events обновились
  useEffect(() => {
    if (!calendarRef.current) return;

    const eventDates = getEventDates(); // теперь точно на актуальных events

    // уничтожаем прошлый экземпляр
    dpRef.current?.destroy();

    dpRef.current = new AirDatepicker(calendarRef.current, {
      range: true,
      fixedHeight: true,
      classes: "calendar",
      dateFormat: "dd.MM.yyyy",
      ...(currentType === "upcoming"
        ? { minDate: new Date() }
        : { maxDate: new Date() }),
      onSelect: ({ formattedDate }) => {
        const [start, end] = formattedDate;
        setRange({ start, end });
        setFilter("dateStart", start || null);
        setFilter("dateEnd", end || null);
      },
      onRenderCell: buildRenderCell(eventDates), // ⬅️ точки
    });

    if (prevRef.current) prevRef.current.onclick = () => dpRef.current.prev();
    if (nextRef.current) nextRef.current.onclick = () => dpRef.current.next();

    // если в сторе уже лежит диапазон — отобразим его
    if (range.start && range.end) {
      dpRef.current.selectDate([parseDMY(range.start), parseDMY(range.end)]);
    }

    return () => dpRef.current?.destroy();
    // важное: зависим и от типа, и от данных
  }, [currentType, events]); // ← ключ: обновляемся, когда приехали события
  // Обновление календаря при ручном вводе
  const handleDateChange = (key, value) => {
    const updated = { ...range, [key]: value };
    setRange(updated);
    setFilter(key === "start" ? "dateStart" : "dateEnd", value);

    if (updated.start && updated.end) {
      dpRef.current.selectDate([
        parseDate(updated.start),
        parseDate(updated.end),
      ]);
    }
  };

  const today = new Date();

  return (
    <>
      <div className="filters_content_calendar">
        <div className="filters_content_title filters_content_title-alt">
          <span className="title title-h3">Календарь</span>
          <div className="calendar_nav">
            <button
              ref={prevRef}
              className="calendar_nav_item calendar_nav-prev"
              type="button"
            />
            <button
              ref={nextRef}
              className="calendar_nav_item calendar_nav-next"
              type="button"
            />
          </div>
        </div>

        <div className="calendar_inputs">
          <DateInput
            label="Дата начала"
            value={range.start}
            onChange={(v) => handleDateChange("start", v)}
            minDate={currentType === "upcoming" ? today : null}
            maxDate={currentType === "past" ? today : null}
            disabledPast={currentType === "upcoming"}
            disabledFuture={currentType === "past"}
          />
          <DateInput
            label="Дата окончания"
            value={range.end}
            onChange={(v) => handleDateChange("end", v)}
            minDate={currentType === "upcoming" ? today : null}
            maxDate={currentType === "past" ? today : null}
            disabledPast={currentType === "upcoming"}
            disabledFuture={currentType === "past"}
          />
        </div>

        <div ref={calendarRef} className="calendar"></div>
      </div>

      <PromoEvent />
    </>
  );
}

// утилита
function parseDMY(str) {
  if (!str) return null;
  const [dd, mm, yyyy] = str.split(".");
  return new Date(`${yyyy}-${mm}-${dd}`);
}
function parseDate(str) {
  if (!str) return null;
  const [day, month, year] = str.split(".");
  return new Date(`${year}-${month}-${day}`);
}
