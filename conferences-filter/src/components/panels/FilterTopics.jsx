import React, { useMemo } from "react";
import { useFiltersStore } from "../../store/filtersStore";
import { useEventsStore } from "../../store/eventsStore";

export default function FilterTopics() {
  const { events } = useEventsStore();
  const { selected, setTopics } = useFiltersStore();
  const { topics: selectedTopics } = selected;

  const topics = useMemo(() => {
    const map = new Map();
    events.forEach((e) => e.topics?.forEach((t) => map.set(t.code, t)));
    return Array.from(map.values());
  }, [events]);

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
        Все <span>{events.length}</span>
      </label>

      {topics.map((topic) => {
        const checked = selectedTopics.includes(topic.code);
        const count = events.filter((c) =>
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
