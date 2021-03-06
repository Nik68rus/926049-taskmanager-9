import {makeMarkupGenerator} from '../util/dom';
import {checkDeadline, checkRepeat} from '../util/task-utils';
import AbstractComponent from './abstarct-component';
import moment from 'moment';

export default class Task extends AbstractComponent {
  constructor({description, dueDate, repeatingDays, tags, color, isArchive, isFavorite}) {
    super();
    this._description = description;
    this._dueDate = dueDate === null ? null : new Date(dueDate);
    this._tags = tags;
    this._color = color;
    this._repeatingDays = repeatingDays;
    this._isArchive = isArchive;
    this._isFavorite = isFavorite;
  }

  getTemplate() {
    return `
    <article class="card card--${this._color} ${checkRepeat(this._repeatingDays)} ${checkDeadline(this._dueDate)}">
      <div class="card__form">
        <div class="card__inner">
          <div class="card__control">
            <button type="button" class="card__btn card__btn--edit">
              edit
            </button>
            <button type="button"
            class="card__btn card__btn--archive ${this._isArchive ? `card__btn--disabled` : ``}">
              archive
            </button>
            <button
              type="button"
              class="card__btn card__btn--favorites ${this._isFavorite ? `card__btn--disabled` : ``}"
            >
              favorites
            </button>
          </div>

          <div class="card__color-bar">
            <svg class="card__color-bar-wave" width="100%" height="10">
              <use xlink:href="#wave"></use>
            </svg>
          </div>
          ${getTextArea(this._description)}
          <div class="card__settings">
            <div class="card__details">
              ${getDateMarkup(this._dueDate)}
              ${[...this._tags].length > 0 ? wrapHashTagMarkup([...this._tags]) : ``}
            </div>
          </div>
        </div>
      </div>
    </article>
    `.trim();
  }
}

const getTextArea = (text) => `
  <div class="card__textarea-wrap">
    <p class="card__text">${text}</p>
  </div>`.trim();

const getDateMarkup = (date) => date === null ? `` : `
  <div class="card__dates">
    <div class="card__date-deadline">
      <p class="card__input-deadline-wrap">
        <span class="card__date">${moment(date).format(`D MMMM`).toUpperCase()}</span>
        <span class="card__time">${moment(date).format(`h:mm a`).toUpperCase()}</span>
        <time class ="card__datetime" datetime="${date}">
      </p>
    </div>
  </div>`;

const getHashtagMarkup = (tag) => `
  <span class="card__hashtag-inner">
    <span class="card__hashtag-name">
      #${tag}
    </span>
  </span>
`;

const getTagsMarkup = makeMarkupGenerator(getHashtagMarkup, ``);

const wrapHashTagMarkup = (tags) => `
  <div class="card__hashtag">
    <div class="card__hashtag-list">
      ${getTagsMarkup(tags)}
    </div>
  </div>
`;
