import { create } from "zustand";
import { fetchEvents } from "../api/eventsApi";

function parseDate(dateString) {
  // API возвращает дату в формате "дд.мм.гггг"
  if (!dateString) return null;
  const [day, month, year] = dateString.split(".");
  return new Date(`${year}-${month}-${day}`);
}

export const useEventsStore = create((set, get) => ({
  events: [],
  loading: false,
  error: null,

  async loadEvents(type = "upcoming") {
    set({ loading: true, error: null });
    try {
      const data = await fetchEvents(type);
      const events = Array.isArray(data.events) ? data.events : [];
      set({ events, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  getEventDates() {
    const { events } = get();
    const dates = new Set();

    events.forEach((event) => {
      const start = parseDate(event.dateStart);
      const end = parseDate(event.dateEnd) || start;

      if (start) {
        for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
          dates.add(d.toISOString().split("T")[0]);
        }
      }
    });

    return Array.from(dates);
  },
}));
