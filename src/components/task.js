import {formatDate, formatTime} from './util';

const getTextArea = (text) => `
  <div class="card__textarea-wrap">
    <p class="card__text">${text}</p>
  </div>`.trim();

const getDateMarkup = (date) => `
  <div class="card__dates">
    <div class="card__date-deadline">
      <p class="card__input-deadline-wrap">
        <span class="card__date">${formatDate(date)}</span>
        <span class="card__time">${formatTime(date)}</span>
      </p>
    </div>
  </div>`;

const getHashTagList = (tags) => `
  ${Array.from(tags).map((tag) => `
    <span class="card__hashtag-inner">
      <span class="card__hashtag-name">
        #${tag}
      </span>
    </span>
  `).join(``)}
`;

const wrapHashTagMarkup = (tags) => {
  return `
  <div class="card__hashtag">
    <div class="card__hashtag-list">
      ${getHashTagList(tags)}
    </div>
  </div>`;
};

export const checkDeadline = (date) => Date.now() < date ? `` : `card--deadline`;

export const checkRepeat = (days) => Object.keys(days).some((day) => days[day]) ? `card--repeat` : ``;

export const getTaskCardMarkup = ({description, dueDate, repeatingDays, tags, color, isFavorite, isArchive}) => {
  return `
    <article class="card card--${color} ${checkRepeat(repeatingDays)} ${checkDeadline(dueDate)}">
      <div class="card__form">
        <div class="card__inner">
          <div class="card__control">
            <button type="button" class="card__btn card__btn--edit">
              edit
            </button>
            <button type="button"
            class="card__btn card__btn--archive ${isArchive ? `card__btn--disabled` : ``}">
              archive
            </button>
            <button
              type="button"
              class="card__btn card__btn--favorites ${isFavorite ? `card__btn--disabled` : ``}"
            >
              favorites
            </button>
          </div>

          <div class="card__color-bar">
            <svg class="card__color-bar-wave" width="100%" height="10">
              <use xlink:href="#wave"></use>
            </svg>
          </div>
          ${getTextArea(description)}
          <div class="card__settings">
            <div class="card__details">
              ${getDateMarkup(dueDate)}
              ${wrapHashTagMarkup(tags)}
            </div>
          </div>
        </div>
      </div>
    </article>
  `.trim();
};
