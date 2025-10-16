import FilterTopics from "./panels/FilterTopics";
import FilterCountries from "./panels/FilterCountries";
import FilterCities from "./panels/FilterCities";
import { useFiltersStore } from "../store/filtersStore";

const panelsMap = {
  topics: { title: "Тематика", component: FilterTopics },
  country: { title: "Страна", component: FilterCountries },
  city: { title: "Город", component: FilterCities },
  // type: { title: "Тип", component: FilterType },
};

export default function FilterPanel({ id }) {
  const panel = panelsMap[id];
  if (!panel) return null;

  const { selected, filteredEvents } = useFiltersStore();

  console.log("selected", selected);
  console.log("filteredEvents", filteredEvents);

  const PanelComponent = panel.component;

  return (
    <>
      <div className="filters_content_title">
        <span className="title title-h3">{panel.title}</span>
      </div>

      <PanelComponent />

      <div className="filters_content_actions">
        <button className="btn btn--primary btn--md btn--f16" type="button">
          <span>Применить</span>
        </button>
      </div>
    </>
  );
}
