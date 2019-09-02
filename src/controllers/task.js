import {
  Task,
  TaskEdit,
} from '../components';

import {isEscapeKey} from '../util/predicates';
import {render, Position} from '../util/dom';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/light.css';

export default class TaskController {
  constructor(container, task, onDataChange, onChangeView) {
    this._container = container;
    this._task = task;
    this._onDataChange = onDataChange;
    this._onChangeView = onChangeView;
    this._taskView = new Task(task);
    this._taskEdit = new TaskEdit(task);
    this._init();
  }

  setDefaultView() {
    if (this._container.getElement().contains(this._taskEdit.getElement())) {
      this._container.getElement().replaceChild(this._taskView.getElement(), this._taskEdit.getElement());
    }
  }

  _init() {
    const description = this._taskEdit.getElement().querySelector(`textarea`);
    const date = this._taskEdit.getElement().querySelector(`.card__date`);

    const onEscKeyDown = (evt) => {
      if (isEscapeKey(evt)) {
        this._taskEdit.getElement().querySelector(`.card__form`).reset();
        this._container.getElement().replaceChild(this._taskView.getElement(), this._taskEdit.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    flatpickr(date, {
      dateFormat: `j F h:i K`, // вот это не воспринимает почему-то
      altInput: true,
      allowInput: true,
      enableTime: true,
      defaultDate: this._task.dueDate,
    });

    this._taskView.getElement()
      .querySelector(`.card__btn--edit`)
      .addEventListener(`click`, (evt) => {
        evt.preventDefault();
        this._onChangeView();
        this._container.getElement().replaceChild(this._taskEdit.getElement(), this._taskView.getElement());
        document.addEventListener(`keydown`, onEscKeyDown);
        this._taskEdit.getElement().querySelector(`.card__btn--archive`).addEventListener(`click`, this._onArchiveBtnClick.bind(this));
        this._taskEdit.getElement().querySelector(`.card__btn--favorites`).addEventListener(`click`, this._onFavoritesBtnClick.bind(this));
      });

    description.addEventListener(`focus`, () => {
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    description.addEventListener(`blur`, () => {
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
          dueDate: formData.get(`date`) ? new Date(formData.get(`date`)) : null,
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
          isArchive: this._taskEdit.getElement().querySelector(`.card__btn--archive`).classList.contains(`card__btn--disabled`),
          isFavorite: this._taskEdit.getElement().querySelector(`.card__btn--favorites`).classList.contains(`card__btn--disabled`),
        };
        this._onDataChange(entry, this._task);
        document.removeEventListener(`keydown`, onEscKeyDown);
        this._taskEdit.getElement().querySelector(`.card__btn--archive`).removeEventListener(`click`, this._onArchiveBtnClick);
        this._taskEdit.getElement().querySelector(`.card__btn--favorites`).removeEventListener(`click`, this._onFavoritesBtnClick);
      });

    render(this._container.getElement(), this._taskView.getElement(), Position.BEFOREEND);
  }

  _makeOnCardBtnClickCB(button) {
    const btn = this._taskEdit.getElement().querySelector(button);
    if (btn.classList.contains(`card__btn--disabled`)) {
      btn.classList.remove(`card__btn--disabled`);
    } else {
      btn.classList.add(`card__btn--disabled`);
    }
  }

  _onArchiveBtnClick() {
    this._makeOnCardBtnClickCB(`.card__btn--archive`);
  }

  _onFavoritesBtnClick() {
    this._makeOnCardBtnClickCB(`.card__btn--favorites`);
  }
}

