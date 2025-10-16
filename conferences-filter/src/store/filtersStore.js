import { create } from "zustand";
import { useEventsStore } from "./eventsStore";

function parseDate(dateString) {
  if (!dateString) return null;
  const [day, month, year] = dateString.split(".");
  return new Date(`${year}-${month}-${day}`);
}

export const useFiltersStore = create((set, get) => ({
  selected: {
    dateStart: null,
    dateEnd: null,
    countries: [],
    cities: [],
    topics: [],
  },
  filteredEvents: [],

  // Устанавливаем фильтр
  setFilter(key, value) {
    set((state) => ({
      selected: {
        ...state.selected,
        [key]: value,
      },
    }));
    get().applyFilters();
  },

  // Сброс фильтров
  resetFilters() {
    set({
      selected: {
        dateStart: null,
        dateEnd: null,
        countries: [],
        cities: [],
        topics: [],
      },
    });
    get().applyFilters();
  },

  // Основная логика фильтрации
  applyFilters() {
    const { selected } = get();
    const { events } = useEventsStore.getState();

    const filtered = events.filter((event) => {
      const start = parseDate(event.dateStart);
      const end = parseDate(event.dateEnd) || start;

      // Фильтр по дате
      if (selected.dateStart && selected.dateEnd) {
        const s = parseDate(selected.dateStart);
        const e = parseDate(selected.dateEnd);
        if (end < s || start > e) return false;
      }

      // Фильтр по странам
      if (
        selected.countries.length > 0 &&
        !selected.countries.includes(event.country)
      )
        return false;

      // Фильтр по тематикам
      if (
        selected.topics.length > 0 &&
        !event.topics.some((t) => selected.topics.includes(t.code))
      )
        return false;

      return true;
    });

    set({ filteredEvents: filtered });
  },
}));
