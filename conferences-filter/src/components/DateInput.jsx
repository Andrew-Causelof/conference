import { useEffect, useState } from "react";

export default function DateInput({
  label,
  value,
  onChange,
  minDate,
  maxDate,
  disabledFuture = false,
  disabledPast = false,
}) {
  const [inputValue, setInputValue] = useState(value || "");

  useEffect(() => {
    setInputValue(value || "");
  }, [value]);

  // Автоматическое форматирование — 10252025 → 10.25.2025
  const handleInput = (e) => {
    let val = e.target.value.replace(/[^\d]/g, ""); // только цифры
    if (val.length > 8) val = val.slice(0, 8);

    // Автоформат 10.25.2025
    if (val.length >= 5)
      val = val.replace(/^(\d{2})(\d{2})(\d{0,4})$/, "$1.$2.$3");
    else if (val.length >= 3) val = val.replace(/^(\d{2})(\d{0,2})$/, "$1.$2");

    setInputValue(val);
  };

  // Проверка валидности даты
  const handleBlur = () => {
    const parsed = parseDate(inputValue);
    if (!parsed) return setInputValue(value || "");

    const today = new Date();

    if (disabledFuture && parsed > today) return setInputValue(value || "");
    if (disabledPast && parsed < today) return setInputValue(value || "");

    // Учитываем min/max
    if (minDate && parsed < minDate) return setInputValue(formatDate(minDate));
    if (maxDate && parsed > maxDate) return setInputValue(formatDate(maxDate));

    onChange(formatDate(parsed));
  };

  return (
    <input
      type="text"
      placeholder="01.01.2025"
      value={inputValue}
      onInput={handleInput}
      onBlur={handleBlur}
      className="calendar_input"
      aria-label={label}
    />
  );
}

// --- utils ---
function parseDate(str) {
  if (!str) return null;
  const parts = str.split(".");
  if (parts.length !== 3) return null;
  const [day, month, year] = parts.map(Number);
  if (isNaN(day) || isNaN(month) || isNaN(year)) return null;
  const d = new Date(year, month - 1, day);
  return isNaN(d.getTime()) ? null : d;
}

function formatDate(d) {
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${day}.${month}.${year}`;
}
