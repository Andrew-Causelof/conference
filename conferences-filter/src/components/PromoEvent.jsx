import React from "react";
import { useEventsStore } from "../store/eventsStore";

function PromoEvent() {
  const { mainEvent } = useEventsStore();

  console.log(mainEvent);

  if (!mainEvent) {
    return null;
  }

  return (
    <div className="filters_content_event">
      <article className="conference conference-commercial conference-main conference-mini">
        <h3 className="title title-h3 conference-main_title">
          Главное событие
        </h3>
        <div className="conference_dates">
          <span className="conference_dates_big"> {mainEvent.DATE_RANGE}</span>
          <span className="conference_dates_small">
            {mainEvent.MONTH_RANGE}
          </span>
        </div>
        <div className="conference_preview">
          <img src={mainEvent.PREVIEW} alt={mainEvent.NAME} />
        </div>
        <div className="conference_content">
          <a className="conference_title" href="conference-full.html">
            {mainEvent.NAME}
          </a>
          <div className="conference_location">
            <b>{mainEvent.CITY}</b>
            <span>/</span>
            <p>{mainEvent.COUNTRY}</p>
          </div>
          <div className="conference_tags">
            {mainEvent.SECTIONS?.map((section) => (
              <span className="conference_tag">{section.NAME}</span>
            ))}
          </div>
        </div>
        <div className="conference_actions mini">
          <a
            href={mainEvent.URL}
            className="btn btn--commercial btn--mini btn--f14"
            type="button"
            data-fn-trigger="log"
            data-modal="log"
            data-modal-action="toggle"
          >
            <span>Подробнее</span>
          </a>

          {mainEvent.PROMOCODE && (
            <button
              src={mainEvent.PROMOCODE}
              className="btn btn--default-alt btn--sm btn--f14"
              type="button"
              data-fn-trigger="log"
              data-modal="log"
              data-modal-action="toggle"
            >
              <span>Промокод</span>
            </button>
          )}
        </div>
      </article>
    </div>
  );
}

export default PromoEvent;
