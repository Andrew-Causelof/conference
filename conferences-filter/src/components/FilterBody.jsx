import React from "react";

function FilterBody() {
  return (
    <div className="filters_body">
      <div className="filters_content" data-filters-id="calendar-id">
        <div className="filters_content_wrapper filters_content_wrapper-calendar">
          <div className="filters_content_calendar">
            <div className="filters_content_title filters_content_title-alt">
              <span className="title title-h3">Тематика</span>
              <div className="calendar_nav">
                <button className="calendar_nav_item calendar_nav-prev"></button>
                <button className="calendar_nav_item calendar_nav-next"></button>
              </div>
            </div>
            <div className="calendar_inputs">
              <input
                id="calendar-input-from"
                type="text"
                placeholder="01.01.2025"
              />
              <input
                id="calendar-input-to"
                type="text"
                placeholder="01.01.2025"
              />
            </div>
          </div>
          <div className="filters_content_event">
            <article className="conference conference-commercial conference-main conference-mini">
              <h3 className="title title-h3 conference-main_title">
                Главное событие
              </h3>
              <div className="conference_dates">
                <span className="conference_dates_big">11-12</span>
                <span className="conference_dates_small">сентября</span>
              </div>
              <div className="conference_preview">
                <img
                  src="http://affcult.seo-gravity.ru/assets/images/public/conf/1.jpg"
                  alt="Affiliate Moscow 2025"
                />
              </div>
              <div className="conference_content">
                <a className="conference_title" href="conference-full.html">
                  Affiliate Moscow 2025
                </a>
                <div className="conference_location">
                  <b>Москва</b>
                  <span>/</span>
                  <p>Россия</p>
                </div>
                <div className="conference_tags">
                  <span className="conference_tag">Affiliate</span>
                  <span className="conference_tag">Marketing</span>
                </div>
                <div className="conference_actions">
                  <button
                    className="btn btn--default-alt btn--sm btn--f14"
                    type="button"
                    data-fn-trigger="log"
                    data-modal="log"
                    data-modal-action="toggle"
                  >
                    <span>Подробнее</span>
                  </button>
                  <button
                    className="btn btn--default-alt btn--sm btn--f14"
                    type="button"
                    data-fn-trigger="log"
                    data-modal="log"
                    data-modal-action="toggle"
                  >
                    <span>Промокод</span>
                  </button>
                </div>
              </div>
              <div className="conference_actions mini">
                <button
                  className="btn btn--commercial btn--mini btn--f14"
                  type="button"
                  data-fn-trigger="log"
                  data-modal="log"
                  data-modal-action="toggle"
                >
                  <span>Подробнее</span>
                </button>
                <button
                  className="btn btn--commercial btn--mini btn--f14"
                  type="button"
                  data-fn-trigger="log"
                  data-modal="log"
                  data-modal-action="toggle"
                >
                  <span>Промокод</span>
                </button>
              </div>
            </article>
          </div>
        </div>
      </div>
      <div className="filters_content" data-filters-id="topics-id">
        <div className="filters_content_wrapper">
          <div className="filters_content_title">
            <span className="title title-h3">Тематика</span>
          </div>
          <div className="filters_content_checkboxes">
            <input
              className="filters_content_checkbox"
              id="topic-all"
              type="checkbox"
              name="topic"
              checked="checked"
            />
            <label className="filters_content_label" for="topic-all">
              Все
              <span>51</span>
            </label>
            <input
              className="filters_content_checkbox"
              id="topic-seo"
              type="checkbox"
              name="topic"
            />
            <label className="filters_content_label" for="topic-seo">
              SEO
              <span>12</span>
            </label>
            <input
              className="filters_content_checkbox"
              id="topic-mobile"
              type="checkbox"
              name="topic"
            />
            <label className="filters_content_label" for="topic-mobile">
              Mobile
              <span>33</span>
            </label>
          </div>
          <div className="filters_content_actions">
            <button
              className="btn btn--primary btn--md btn--f16"
              type="button"
              data-fn-trigger="log"
              data-modal="log"
              data-modal-action="toggle"
            >
              <span>Применить</span>
            </button>
          </div>
        </div>
      </div>
      <div className="filters_content" data-filters-id="country-id">
        <div className="filters_content_wrapper">
          <div className="filters_content_title">
            <span className="title title-h3">Страна</span>
          </div>
          <div className="filters_content_checkboxes">
            <input
              className="filters_content_checkbox"
              id="country-all"
              type="checkbox"
              name="country"
              checked="checked"
            />
            <label className="filters_content_label" for="country-all">
              Все
              <span>51</span>
            </label>
            <input
              className="filters_content_checkbox"
              id="country-russia"
              type="checkbox"
              name="country"
            />
            <label className="filters_content_label" for="country-russia">
              Россия
              <span>12</span>
            </label>
            <input
              className="filters_content_checkbox"
              id="country-belarus"
              type="checkbox"
              name="country"
            />
            <label className="filters_content_label" for="country-belarus">
              Беларусь
              <span>2</span>
            </label>
            <input
              className="filters_content_checkbox"
              id="country-germany"
              type="checkbox"
              name="country"
            />
            <label className="filters_content_label" for="country-germany">
              Германия
              <span>4</span>
            </label>
            <input
              className="filters_content_checkbox"
              id="country-france"
              type="checkbox"
              name="country"
            />
            <label className="filters_content_label" for="country-france">
              Франция
              <span>1</span>
            </label>
            <input
              className="filters_content_checkbox"
              id="country-kazakh"
              type="checkbox"
              name="country"
            />
            <label className="filters_content_label" for="country-kazakh">
              Казахстан
              <span>6</span>
            </label>
            <input
              className="filters_content_checkbox"
              id="country-usa"
              type="checkbox"
              name="country"
            />
            <label className="filters_content_label" for="country-usa">
              США
              <span>32</span>
            </label>
          </div>
          <div className="filters_content_actions">
            <button
              className="btn btn--primary btn--md btn--f16"
              type="button"
              data-fn-trigger="log"
              data-modal="log"
              data-modal-action="toggle"
            >
              <span>Применить</span>
            </button>
          </div>
        </div>
      </div>
      <div className="filters_content" data-filters-id="city-id">
        <div className="filters_content_wrapper">
          <div className="filters_content_title">
            <span className="title title-h3">Город</span>
          </div>
          <div className="filters_content_checkboxes">
            <input
              className="filters_content_checkbox"
              id="city-all"
              type="checkbox"
              name="city"
              checked="checked"
            />
            <label className="filters_content_label" for="city-all">
              Все
              <span>12</span>
            </label>
            <input
              className="filters_content_checkbox"
              id="city-russia"
              type="checkbox"
              name="city"
            />
            <label className="filters_content_label" for="city-russia">
              Россия
              <span>3</span>
            </label>
            <input
              className="filters_content_checkbox"
              id="city-belarus"
              type="checkbox"
              name="city"
            />
            <label className="filters_content_label" for="city-belarus">
              Беларусь
              <span>4</span>
            </label>
            <input
              className="filters_content_checkbox"
              id="city-germany"
              type="checkbox"
              name="city"
            />
            <label className="filters_content_label" for="city-germany">
              Германия
              <span>5</span>
            </label>
          </div>
          <div className="filters_content_actions">
            <button
              className="btn btn--primary btn--md btn--f16"
              type="button"
              data-fn-trigger="log"
              data-modal="log"
              data-modal-action="toggle"
            >
              <span>Применить</span>
            </button>
          </div>
        </div>
      </div>
      <div className="filters_content" data-filters-id="type-id">
        <div className="filters_content_wrapper">
          <div className="filters_content_title">
            <span className="title title-h3">Тип</span>
          </div>
          <div className="filters_content_checkboxes">
            <input
              className="filters_content_checkbox"
              id="type-all"
              type="checkbox"
              name="type"
              checked="checked"
            />
            <label className="filters_content_label" for="type-all">
              Все
              <span>12</span>
            </label>
            <input
              className="filters_content_checkbox"
              id="type-russia"
              type="checkbox"
              name="type"
            />
            <label className="filters_content_label" for="type-russia">
              Россия
              <span>3</span>
            </label>
            <input
              className="filters_content_checkbox"
              id="type-belarus"
              type="checkbox"
              name="type"
            />
            <label className="filters_content_label" for="type-belarus">
              Беларусь
              <span>4</span>
            </label>
            <input
              className="filters_content_checkbox"
              id="type-germany"
              type="checkbox"
              name="type"
            />
            <label className="filters_content_label" for="type-germany">
              Германия
              <span>5</span>
            </label>
          </div>
          <div className="filters_content_actions">
            <button
              className="btn btn--primary btn--md btn--f16"
              type="button"
              data-fn-trigger="log"
              data-modal="log"
              data-modal-action="toggle"
            >
              <span>Применить</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterBody;
