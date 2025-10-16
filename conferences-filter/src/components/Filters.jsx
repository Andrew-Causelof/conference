import React from "react";
import { useState } from "react";
import FilterTabs from "./FilterTabs";
import FilterContent from "./FilterContent";

function Filters() {
  const [activeFilter, setActiveFilter] = useState(null);
  return (
    <>
      <FilterTabs active={activeFilter} onChange={setActiveFilter} />
      <div className="filters_body">
        <FilterContent id="calendar" active={activeFilter} />
        <FilterContent id="topics" active={activeFilter} />
        <FilterContent id="country" active={activeFilter} />
        <FilterContent id="city" active={activeFilter} />
        <FilterContent id="type" active={activeFilter} />
      </div>
    </>
  );
}

export default Filters;
