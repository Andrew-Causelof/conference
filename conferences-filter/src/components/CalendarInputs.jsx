import { useEffect, useState } from "react";
import { useFiltersStore } from "../store/filtersStore";

function isValidDateStr(str) {
  // DD.MM.YYYY
  const re = /^\d{2}\.\d{2}\.\d{4}$/;
  if (!re.test(str)) return false;
  const [d, m, y] = str.split(".").map(Number);
  const dt = new Date(y, m - 1, d);
  return (
    dt.getFullYear() === y && dt.getMonth() === m - 1 && dt.getDate() === d
  );
}
function parse(str) {
  const [d, m, y] = str.split(".");
  return new Date(`${y}-${m}-${d}T00:00:00`);
}

export default function CalendarInputs({ dpRef, fromRef, toRef }) {
  const { selected, setFilter } = useFiltersStore();
  const [from, setFrom] = useState(selected.dateStart || "");
  const [to, setTo] = useState(selected.dateEnd || "");

  // если даты в сторе поменялись извне → подсинхронить локальные инпуты
  useEffect(() => setFrom(selected.dateStart || ""), [selected.dateStart]);
  useEffect(() => setTo(selected.dateEnd || ""), [selected.dateEnd]);

  const applyIfValid = () => {
    const okFrom = from && isValidDateStr(from);
    const okTo = to && isValidDateStr(to);

    setFilter("dateStart", okFrom ? from : null);
    setFilter("dateEnd", okTo ? to : null);

    // подсветка диапазона в календаре
    if (dpRef?.current) {
      if (okFrom && okTo) {
        dpRef.current.selectDate([parse(from), parse(to)]);
      } else if (okFrom && !okTo) {
        dpRef.current.selectDate([parse(from)]);
      } else if (!okFrom && okTo) {
        dpRef.current.selectDate([parse(to)]);
      } else {
        dpRef.current.clear();
      }
    }
  };

  return (
    <div className="calendar_inputs">
      <input
        ref={fromRef}
        type="text"
        placeholder="01.01.2025"
        value={from}
        onChange={(e) => setFrom(e.target.value)}
        onBlur={applyIfValid}
      />
      <input
        ref={toRef}
        type="text"
        placeholder="01.01.2025"
        value={to}
        onChange={(e) => setTo(e.target.value)}
        onBlur={applyIfValid}
      />
    </div>
  );
}
