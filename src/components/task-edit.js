import { checkRepeat, checkDeadline } from '../utils/task-utils';
import { COLORS } from '../mock';
import { createElement } from '../utils/utils';

export class TaskEdit {
  constructor({ description, dueDate, repeatingDays, tags, color, isFavorite, isArchive }) {
    this._description = description;
    this._dueDate = dueDate;
    this._repeatingDays = repeatingDays;
    this._tags = tags;
    this._color = color;
    this._isFavorite = isFavorite;
    this._isArchive = isArchive;
    this._element = null;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }

  getTemplate() {
    return (`
    <article class="card card--edit card--${this._color} ${checkRepeat(this._repeatingDays)} ${checkDeadline(this._dueDate)}">
      <form class="card__form" method="get">
        <div class="card__inner">
          <div class="card__control">
            <button type="button" class="card__btn card__btn--archive ${this._isArchive ? `card__btn--disabled` : ``}">
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

          <div class="card__textarea-wrap">
            <label>
              <textarea
                class="card__text"
                placeholder="Start typing your text here..."
                name="text"
              >${this._description}</textarea>
            </label>
          </div>

          <div class="card__settings">
            <div class="card__details">
              <div class="card__dates">
                <button class="card__date-deadline-toggle" type="button">
                  date: <span class="card__date-status">${this._dueDate ? `yes` : `no`}</span>
                </button>

                <fieldset class="card__date-deadline">
                  <label class="card__input-deadline-wrap">
                    <input
                      class="card__date"
                      type="text"
                      placeholder=""
                      name="date"
                      value="${new Date(this._dueDate)}"
                    />
                  </label>
                </fieldset>

                <button class="card__repeat-toggle" type="button">
                  repeat:<span class="card__repeat-status">${checkRepeat(this._repeatingDays) ? `yes` : `no`}</span>
                </button>

                ${getRepetingDaysMarkup(this._repeatingDays)}

              </div>

              ${getHashTagsMarkup(this._tags, getTag)}

            </div>

            ${getColorChooserMarkup(COLORS, this._color)}

          </div>

          <div class="card__status-btns">
            <button class="card__save" type="submit">save</button>
            <button class="card__delete" type="button">delete</button>
          </div>
        </div>
      </form>
    </article>
  `.trim());
  }
}

const getTag = (tag) => {
  return `
  <span class="card__hashtag-inner">
    <input
      type="hidden"
      name="hashtag"
      value="${tag}"
      class="card__hashtag-hidden-input"
    />
    <p class="card__hashtag-name">
      #${tag}
    </p>
    <button type="button" class="card__hashtag-delete">
      delete
    </button>
  </span>
  `;
};

const getHashTagsMarkup = (tags, render) => {
  return `
  <div class="card__hashtag">
    <div class="card__hashtag-list">
      ${tags.map((tag) => render(tag)).join(`\n`)}
    </div>

    <label>
      <input
        type="text"
        class="card__hashtag-input"
        name="hashtag-input"
        placeholder="Type new hashtag here"
      />
    </label>
  </div>
  `;
};

const getColorChooser = (clr, curClr) => {
  return `
  <input
    type="radio"
    id="color-${clr}-4"
    class="card__color-input card__color-input--${clr} visually-hidden"
    name="color"
    value="${clr}"
    ${clr === curClr ? `checked` : ``}
  />
  <label
    for="color-${clr}-4"
    class="card__color card__color--${clr}"
    >${clr}</label
  >
  `;
};

const getColorChooserMarkup = (colors, curColor) => {
  return `
  <div class="card__colors-inner">
    <h3 class="card__colors-title">Color</h3>
    <div class="card__colors-wrap">
      ${colors.map((color) => getColorChooser(color, curColor)).join(`\n`)}
    </div>
  </div>`;
};

const getDay = (day, days) => {
  return `
  <input
    class="visually-hidden card__repeat-day-input"
    type="checkbox"
    id="repeat-${day}-4"
    name="repeat"
    value="${day}"
    ${days[day] ? `checked` : ``}
  />
  <label class="card__repeat-day" for="repeat-${day}-4"
    >${day}</label
  >
  `;
};

const getRepetingDaysMarkup = (days) => {
  return `
  <fieldset class="card__repeat-days">
    <div class="card__repeat-days-inner">
      ${Object.keys(days).map((day) => getDay(day, days)).join(`\n`)}
    </div>
  </fieldset>`;
};
