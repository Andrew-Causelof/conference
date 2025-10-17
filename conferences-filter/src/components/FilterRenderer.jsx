import { useEffect } from "react";
import { useFiltersStore } from "../store/filtersStore";

export default function FilterRenderer() {
  const { selected, filteredEvents } = useFiltersStore();

  async function loadFiltered(page = 1, append = false) {
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

    if (!append) {
      // перезаписываем весь контент при первой загрузке
      container.innerHTML = html;
    } else {
      // создаём временный контейнер для вставки новых карточек
      const temp = document.createElement("div");
      temp.innerHTML = html;

      // вставляем новые элементы
      const newItems = temp.querySelectorAll(".box.box-default");
      newItems.forEach((el) => container.appendChild(el));

      // удаляем старую кнопку
      const oldBtn = container.querySelector(".js-more-items");
      if (oldBtn) oldBtn.parentElement.remove();

      // добавляем новую кнопку, если есть
      const newBtn = temp.querySelector(".js-more-items");
      if (newBtn) container.appendChild(newBtn);
    }

    // навешиваем обработчик на кнопку "Загрузить ещё"
    attachLoadMoreHandler();
  }

  function attachLoadMoreHandler() {
    const btn = document.querySelector(
      ".filter-conference-list .js-more-items"
    );
    if (!btn) return;

    // удаляем возможные старые слушатели (через замену узла)
    const newBtn = btn.cloneNode(true);
    btn.replaceWith(newBtn);

    newBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const url = newBtn.dataset.url;
      const page = parseInt(url.match(/PAGEN_1=(\d+)/)?.[1] || "2", 10);
      loadFiltered(page, true);
    });
  }

  useEffect(() => {
    const listEl = document.querySelector(".conferences-list");
    const container = document.querySelector(".filter-conference-list");
    if (!listEl || !container) return;

    // Проверяем активные фильтры
    const hasFilters =
      selected.dateStart ||
      selected.dateEnd ||
      (selected.countries && selected.countries.length > 0) ||
      (selected.cities && selected.cities.length > 0) ||
      (selected.topics && selected.topics.length > 0);

    if (hasFilters) {
      listEl.style.display = "none";
      container.style.display = "flex";
      loadFiltered(1);
    } else {
      // Возврат к серверному списку
      container.innerHTML = "";
      container.style.display = "none";
      listEl.style.display = "flex";
    }

    return () => {
      // Чистим обработчики при размонтировании
      const btn = document.querySelector(
        ".filter-conference-list .js-more-items"
      );
      if (btn) btn.replaceWith(btn.cloneNode(true));
    };
  }, [selected]);

  return null;
}
