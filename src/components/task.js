import {getMarkup} from './util';

const getTextArea = (text) => `
  <div class="card__textarea-wrap">
    <p class="card__text">${text}</p>
  </div>`.trim();

const dateFormat = new Intl.DateTimeFormat(`en-GB`, {
  month: `long`,
  day: `numeric`,
});

const timeFormat = new Intl.DateTimeFormat(`en-GB`, {
  hour12: true,
  hour: `numeric`,
  minute: `numeric`,
});

const formatDate = (date) => dateFormat.format(date).toUpperCase();
const formatTime = (date) => timeFormat.format(date);

const getDateMarkup = (date) => `
  <div class="card__dates">
    <div class="card__date-deadline">
      <p class="card__input-deadline-wrap">
        <span class="card__date">${formatDate(date)}</span>
        <span class="card__time">${formatTime(date)}</span>
      </p>
    </div>
  </div>`;

const getHashTagList = (tags) => getMarkup(tags, getHashTagMarkup);

const getHashTagMarkup = (tag) => `
  <span class="card__hashtag-inner">
    <span class="card__hashtag-name">#${tag}</span>
  </span>
`.trim();

const wrapHashTagMarkup = (card) => {
  return `
  <div class="card__hashtag">
    <div class="card__hashtag-list">
      ${getHashTagList(card.tags)}
    </div>
  </div>`;
};

export const getTaskCard = (card) => {
  return `
    <article class="card card--black">
      <div class="card__form">
        <div class="card__inner">
          <div class="card__control">
            <button type="button" class="card__btn card__btn--edit">
              edit
            </button>
            <button type="button" class="card__btn card__btn--archive">
              archive
            </button>
            <button
              type="button"
              class="card__btn card__btn--favorites card__btn--disabled"
            >
              favorites
            </button>
          </div>

          <div class="card__color-bar">
            <svg class="card__color-bar-wave" width="100%" height="10">
              <use xlink:href="#wave"></use>
            </svg>
          </div>
          ${getTextArea(card.text)}
          <div class="card__settings">
            <div class="card__details">
              ${getDateMarkup(card.date)}
              ${card.tags.length > 0 ? wrapHashTagMarkup(card) : ``}
            </div>
          </div>
        </div>
      </div>
    </article>
  `.trim();
};
