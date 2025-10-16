import React from "react";

function FilterPanel() {
  return (
    <>
      <div class="filters_content_title">
        <span class="title title-h3">Тематика</span>
      </div>
      <div class="filters_content_checkboxes">
        <input
          class="filters_content_checkbox"
          id="topic-all"
          type="checkbox"
          name="topic"
          checked="checked"
        />
        <label class="filters_content_label" for="topic-all">
          Все
          <span>51</span>
        </label>
        <input
          class="filters_content_checkbox"
          id="topic-seo"
          type="checkbox"
          name="topic"
        />
        <label class="filters_content_label" for="topic-seo">
          SEO
          <span>12</span>
        </label>
        <input
          class="filters_content_checkbox"
          id="topic-mobile"
          type="checkbox"
          name="topic"
        />
        <label class="filters_content_label" for="topic-mobile">
          Mobile
          <span>33</span>
        </label>
      </div>
      <div class="filters_content_actions">
        <button
          class="btn btn--primary btn--md btn--f16"
          type="button"
          data-fn-trigger="log"
          data-modal="log"
          data-modal-action="toggle"
        >
          <span>Применить</span>
        </button>
      </div>
    </>
  );
}

export default FilterPanel;
