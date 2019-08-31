import {
  Task,
  TaskEdit,
} from '../components';

import {isEscapeKey} from '../util/predicates';
import {render, Position} from '../util/dom';

export default class TaskController {
  constructor(container, data, onDataChange, onChangeView) {
    this._container = container;
    this._data = data;
    this._onDataChange = onDataChange;
    this._onChangeView = onChangeView;
    this._taskView = new Task(data);
    this._taskEdit = new TaskEdit(data);
    this.init();
  }

  init() {
    const onEscKeyDown = (evt) => {
      if (isEscapeKey(evt)) {
        this._container.getElement().replaceChild(this._taskView.getElement(), this._taskEdit.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    this._taskView.getElement()
      .querySelector(`.card__btn--edit`)
      .addEventListener(`click`, (evt) => {
        evt.preventDefault();
        this._onChangeView();
        this._container.getElement().replaceChild(this._taskEdit.getElement(), this._taskView.getElement());
        document.addEventListener(`keydown`, onEscKeyDown);
        this._taskEdit.getElement().querySelector(`.card__btn--archive`).addEventListener(`click`, this.onArchiveBtnClick.bind(this));
        this._taskEdit.getElement().querySelector(`.card__btn--favorites`).addEventListener(`click`, this.onFavoritesBtnClick.bind(this));
      });

    this._taskEdit.getElement().querySelector(`textarea`)
      .addEventListener(`focus`, () => {
        document.removeEventListener(`keydown`, onEscKeyDown);
      });

    this._taskEdit.getElement().querySelector(`textarea`)
      .addEventListener(`blur`, () => {
        document.addEventListener(`keydown`, onEscKeyDown);
      });

    this._taskEdit.getElement()
      .querySelector(`.card__save`)
      .addEventListener(`click`, (evt) => {
        evt.preventDefault();
        const formData = new FormData(this._taskEdit.getElement().querySelector(`.card__form`));
        const entry = {
          description: formData.get(`text`),
          color: formData.get(`color`),
          tags: new Set(formData.getAll(`hashtag`)),
          dueDate: formData.get(`date`) ? new Date(formData.get(`date`)) : null, // как сделать чтоб тут дата тоже в миллисекундах записывалась, а не строкой
          repeatingDays: formData.getAll(`repeat`).reduce((acc, it) => {
            acc[it] = true;
            return acc;
          }, {
            'mo': false,
            'tu': false,
            'we': false,
            'th': false,
            'fr': false,
            'sa': false,
            'su': false,
          }),
          isArchive: this._taskEdit.getElement().querySelector(`.card__btn--archive`).classList.contains(`card__btn--disabled`) ? true : false,
          isFavorite: this._taskEdit.getElement().querySelector(`.card__btn--favorites`).classList.contains(`card__btn--disabled`) ? true : false,
        };
        this._onDataChange(entry, this._data);
        document.removeEventListener(`keydown`, onEscKeyDown);
        this._taskEdit.getElement().querySelector(`.card__btn--archive`).removeEventListener(`click`, this.onArchiveBtnClick);
        this._taskEdit.getElement().querySelector(`.card__btn--favorites`).removeEventListener(`click`, this.onFavoritesBtnClick);
      });

    render(this._container.getElement(), this._taskView.getElement(), Position.BEFOREEND);
  }

  makeOnCardBtnClickCB(button) {
    const btn = this._taskEdit.getElement().querySelector(button);
    if (btn.classList.contains(`card__btn--disabled`)) {
      btn.classList.remove(`card__btn--disabled`);
    } else {
      btn.classList.add(`card__btn--disabled`);
    }
  }

  makeOnCardBtnClickCB(button) {
    const btn = this._taskEdit.getElement().querySelector(button);
    if (btn.classList.contains(`card__btn--disabled`)) {
      btn.classList.remove(`card__btn--disabled`);
    } else {
      btn.classList.add(`card__btn--disabled`);
    }
  }

  onArchiveBtnClick() {
    this.makeOnCardBtnClickCB(`.card__btn--archive`);
  }

  onFavoritesBtnClick() {
    this.makeOnCardBtnClickCB(`.card__btn--favorites`);
  }

  setDefaultView() {
    if (this._container.getElement().contains(this._taskEdit.getElement())) {
      this._container.getElement().replaceChild(this._taskView.getElement(), this._taskEdit.getElement());
    }
  }
}

