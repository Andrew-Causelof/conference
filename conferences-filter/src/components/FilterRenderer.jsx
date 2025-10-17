import { useEffect } from "react";
import { useFiltersStore } from "../store/filtersStore";

export default function FilterRenderer() {
  const { selected, filteredEvents } = useFiltersStore();

  async function loadFiltered(page = 1) {
    if (!filteredEvents || filteredEvents.length === 0) return;

    const response = await fetch("/api/events/filter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ids: filteredEvents.map((e) => e.id),
        page,
      }),
    });

    const html = await response.text();
    const container = document.querySelector(".filter-conference-list");
    if (!container) return;

    if (page === 1) {
      container.innerHTML = html;
    } else {
      const temp = document.createElement("div");
      temp.innerHTML = html;
      const newItems = temp.querySelectorAll(".conference-item");
      newItems.forEach((el) => container.appendChild(el));
    }
  }

  useEffect(() => {
    const listEl = document.querySelector(".conferences-list");
    const container = document.querySelector(".filter-conference-list");
    if (!listEl || !container) return;

    // Проверяем, есть ли активные фильтры
    const hasFilters =
      selected.dateStart ||
      selected.dateEnd ||
      (selected.countries && selected.countries.length > 0) ||
      (selected.cities && selected.cities.length > 0) ||
      (selected.topics && selected.topics.length > 0);

    // Если фильтры активны — скрываем оригинальный блок и загружаем результат
    if (hasFilters) {
      listEl.style.display = "none";
      container.style.display = "flex";
      loadFiltered(1);
    } else {
      // Если фильтры сброшены — показываем оригинальный серверный список
      container.innerHTML = "";
      container.style.display = "none";
      document.querySelector(".conferences-list").style.display = "flex";
    }
  }, [selected]); // следим за изменением фильтров

  return null;
}
