import React, { useMemo } from "react";
import { useFiltersStore } from "../../store/filtersStore";
import { useEventsStore } from "../../store/eventsStore";

export default function FilterTopics() {
  const { events } = useEventsStore();
  const { selected, filteredEvents, setTopics } = useFiltersStore();
  const { topics: selectedTopics, dateStart, dateEnd } = selected;

  // выбираем источник
  const sourceEvents = dateStart && dateEnd ? filteredEvents : events;

  const topics = useMemo(() => {
    const map = new Map();
    sourceEvents.forEach((e) => e.topics?.forEach((t) => map.set(t.code, t)));
    return Array.from(map.values());
  }, [sourceEvents]);

  const toggleTopic = (code) => {
    if (selectedTopics.includes(code))
      setTopics(selectedTopics.filter((t) => t !== code));
    else setTopics([...selectedTopics, code]);
  };

  return (
    <div className="filters_content_checkboxes">
      <input
        className="filters_content_checkbox"
        id="topic-all"
        type="checkbox"
        checked={selectedTopics.length === 0}
        onChange={() => setTopics([])}
      />
      <label className="filters_content_label" htmlFor="topic-all">
        Все <span>{sourceEvents.length}</span>
      </label>

      {topics.map((topic) => {
        const checked = selectedTopics.includes(topic.code);
        const count = sourceEvents.filter((c) =>
          c.topics?.some((t) => t.code === topic.code)
        ).length;

        return (
          <React.Fragment key={topic.code}>
            <input
              className="filters_content_checkbox"
              id={`topic-${topic.code}`}
              type="checkbox"
              checked={checked}
              onChange={() => toggleTopic(topic.code)}
            />
            <label
              className="filters_content_label"
              htmlFor={`topic-${topic.code}`}
            >
              {topic.name} <span>{count}</span>
            </label>
          </React.Fragment>
        );
      })}
    </div>
  );
}
