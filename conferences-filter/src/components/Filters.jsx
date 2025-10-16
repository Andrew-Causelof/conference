import { useState, useEffect } from "react";
import FilterTabs from "./FilterTabs";
import FilterContent from "./FilterContent";
import { useEventsStore } from "../store/eventsStore";

function Filters() {
  const [activeFilter, setActiveFilter] = useState(null);
  const { loadEvents } = useEventsStore();

  useEffect(() => {
    (async () => {
      try {
        await loadEvents("upcoming");
      } catch (e) {
        console.error("Ошибка загрузки событий:", e);
      }
    })();
  }, [loadEvents]);
  return (
    <>
      <FilterTabs active={activeFilter} onChange={setActiveFilter} />

      <div className="filters_body">
        <FilterContent id="calendar" active={activeFilter} />
        <FilterContent id="topics" active={activeFilter} />
        <FilterContent id="country" active={activeFilter} />
        <FilterContent id="city" active={activeFilter} />
      </div>
    </>
  );
}

export default Filters;
