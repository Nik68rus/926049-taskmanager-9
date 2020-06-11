import {checkRepeat, checkDeadline} from '../utils/task-utils';
import {COLORS} from '../mock';
import AbstractComponent from './abstract-component';
import {render} from '../utils/utils';
import Hashtag from './hashtag';
import {Position} from '../constants';
export default class TaskEdit extends AbstractComponent {
  constructor({description, dueDate, repeatingDays, tags, color, isFavorite, isArchive}) {
    super();
    this._description = description;
    this._dueDate = dueDate;
    this._repeatingDays = repeatingDays;
    this._tags = tags;
    this._color = color;
    this._isFavorite = isFavorite;
    this._isArchive = isArchive;
    this.init();
  }

  init() {
    this._getTags(this._tags);
    this._hashtagInit();
    this._colorInit();
    this._dateInit();
    this._repeatInit();
  }

  _hashtagInit() {
    const hashtagInput = this.getElement().querySelector(`.card__hashtag-input`);
    hashtagInput.addEventListener(`keydown`, (evt) => {
      if ((evt.key === `Enter`) && (evt.target.value !== ``)) {
        evt.preventDefault();
        const tag = new Hashtag(evt.target.value);
        render(this.getElement().querySelector(`.card__hashtag-list`), tag.getElement(), Position.BEFOREEND);
        hashtagInput.value = ``;
      }
    });
  }

  _colorInit() {
    const colorInputs = this.getElement().querySelectorAll(`.card__color-input`);

    const onColorChange = (evt) => {
      COLORS.forEach((it) => {
        this.getElement().classList.remove(`card--${it}`);
      });
      this.getElement().classList.add(`card--${evt.target.value}`);
    };

    colorInputs.forEach((color) => {
      color.addEventListener(`change`, onColorChange);
    });
  }

  _dateInit() {
    const dateToggler = this.getElement().querySelector(`.card__date-deadline-toggle`);
    const cardDate = this.getElement().querySelector(`.card__input-deadline-wrap`);
    if (dateToggler) {
      dateToggler.addEventListener(`click`, (evt) => {
        evt.preventDefault();
        const statusElement = dateToggler.querySelector(`.card__date-status`);
        const status = statusElement.textContent.toLowerCase();
        statusElement.textContent = (status === `yes`) ? `no` : `yes`;
        cardDate.style.display = (status === `yes`) ? `none` : `flex`;
      });
    }
  }

  _repeatInit() {
    const repeatToggler = this.getElement().querySelector(`.card__repeat-toggle`);
    const repeatBlock = this.getElement().querySelector(`.card__repeat-days`);
    const dayInputs = repeatBlock.querySelectorAll(`.card__repeat-day-input`);
    if (repeatToggler && repeatBlock) {
      const statusElement = repeatToggler.querySelector(`.card__repeat-status`);
      let status = statusElement.textContent.toLowerCase();
      repeatBlock.style.display = (status === `yes`) ? `block` : `none`;
      repeatToggler.addEventListener(`click`, (evt) => {
        evt.preventDefault();
        status = statusElement.textContent.toLowerCase();
        if (status === `yes`) {
          this.getElement().classList.remove(`card--repeat`);
          dayInputs.forEach((input) => {
            input.checked = false;
          }
          );
        } else {
          this.getElement().classList.add(`card--repeat`);
        }
        statusElement.textContent = (status === `yes`) ? `no` : `yes`;
        repeatBlock.style.display = (status === `yes`) ? `none` : `block`;
        status = ``;
      });
    }
  }

  _getTags(tags) {
    const hastagsList = this.getElement().querySelector(`.card__hashtag-list`);
    tags.forEach((tag) => {
      const tagElement = new Hashtag(tag);
      render(hastagsList, tagElement.getElement(), Position.BEFOREEND);
    });
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

              ${getHashTagsMarkup()}

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

const getHashTagsMarkup = () => {
  return `
  <div class="card__hashtag">
    <div class="card__hashtag-list">
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
