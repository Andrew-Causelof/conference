import React from "react";

function PromoEvent() {
  return (
    <div class="filters_content_event">
      <article class="conference conference-commercial conference-main conference-mini">
        <h3 class="title title-h3 conference-main_title">Главное событие</h3>
        <div class="conference_dates">
          <span class="conference_dates_big">11-12</span>
          <span class="conference_dates_small">сентября</span>
        </div>
        <div class="conference_preview">
          <img
            src="http://affcult.seo-gravity.ru/assets/images/public/conf/1.jpg"
            alt="Affiliate Moscow 2025"
          />
        </div>
        <div class="conference_content">
          <a class="conference_title" href="conference-full.html">
            Affiliate Moscow 2025
          </a>
          <div class="conference_location">
            <b>Москва</b>
            <span>/</span>
            <p>Россия</p>
          </div>
          <div class="conference_tags">
            <span class="conference_tag">Affiliate</span>
            <span class="conference_tag">Marketing</span>
          </div>
          <div class="conference_actions">
            <button
              class="btn btn--default-alt btn--sm btn--f14"
              type="button"
              data-fn-trigger="log"
              data-modal="log"
              data-modal-action="toggle"
            >
              <span>Подробнее</span>
            </button>
            <button
              class="btn btn--default-alt btn--sm btn--f14"
              type="button"
              data-fn-trigger="log"
              data-modal="log"
              data-modal-action="toggle"
            >
              <span>Промокод</span>
            </button>
          </div>
        </div>
        <div class="conference_actions mini">
          <button
            class="btn btn--commercial btn--mini btn--f14"
            type="button"
            data-fn-trigger="log"
            data-modal="log"
            data-modal-action="toggle"
          >
            <span>Подробнее</span>
          </button>
          <button
            class="btn btn--commercial btn--mini btn--f14"
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
  );
}

export default PromoEvent;
