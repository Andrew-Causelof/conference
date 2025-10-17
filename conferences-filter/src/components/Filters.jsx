import { useState, useEffect } from "react";
import FilterTabs from "./FilterTabs";
import FilterContent from "./FilterContent";
import { useEventsStore } from "../store/eventsStore";
import FilterRenderer from "./FilterRenderer";

function Filters() {
  const [activeFilter, setActiveFilter] = useState(null);
  const { loadEvents } = useEventsStore();
  // const { selected } = useFiltersStore();

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
      <FilterRenderer />
      <FilterTabs active={activeFilter} onChange={setActiveFilter} />
      <div className="filters_body">
        <FilterContent id="calendar" active={activeFilter} />
        <FilterContent
          id="topics"
          active={activeFilter}
          setActiveFilter={setActiveFilter}
        />
        <FilterContent
          id="country"
          active={activeFilter}
          setActiveFilter={setActiveFilter}
        />
        <FilterContent
          id="city"
          active={activeFilter}
          setActiveFilter={setActiveFilter}
        />
      </div>
    </>
  );
}

export default Filters;
