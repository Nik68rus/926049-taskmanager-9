import {
  Task,
  TaskEdit,
} from '../components';

import {isEscapeKey} from '../util/predicates';
import {render, Position} from '../util/dom';
import {Mode} from '../constants';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/light.css';
import moment from 'moment';

export default class TaskController {
  constructor(container, task, mode, onDataChange, onChangeView) {
    this._container = container;
    this._task = task;
    this._onDataChange = onDataChange;
    this._onChangeView = onChangeView;
    this._taskView = new Task(task);
    this._taskEdit = new TaskEdit(task);
    this._init(mode);
  }

  setDefaultView() {
    if (this._container.getElement().contains(this._taskEdit.getElement())) {
      this._container.getElement().replaceChild(this._taskView.getElement(), this._taskEdit.getElement());
    }
  }

  _init(mode) {
    console.log(mode);
    const description = this._taskEdit.getElement().querySelector(`textarea`);
    const date = this._taskEdit.getElement().querySelector(`.card__date`);
    let dateTime = this._taskEdit.getElement().querySelector(`.card__datetime`);
    let renderPosition = Position.BEFOREEND;
    let currentView = this._taskView;

    flatpickr(date, {
      allowInput: true,
      enableTime: true,
      defaultDate: this._task.dueDate,
    });

    const onEscKeyDown = (evt) => {
      if (isEscapeKey(evt)) {
        if (mode === Mode.ADDING) {
          this._container.getElement().removeChild(this._taskEdit.getElement());
          this._onDataChange(null, null);
        } else {
          this._taskEdit.getElement().querySelector(`.card__form`).reset();
          this._container.getElement().replaceChild(this._taskView.getElement(), this._taskEdit.getElement());
        }
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    if (mode === Mode.ADDING) {
      document.addEventListener(`keydown`, onEscKeyDown);
      renderPosition = Position.AFTERBEGIN;
      currentView = this._taskEdit;
    }

    this._taskView.getElement()
      .querySelector(`.card__btn--edit`)
      .addEventListener(`click`, (evt) => {
        date.value = moment(new Date(dateTime.dateTime)).format(`MMMM D h:mm A`).toUpperCase();

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
          dueDate: formData.get(`date`) ? new Date(dateTime.dateTime) : null,
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
        this._onDataChange(entry, mode === Mode.DEFAULT ? this._task : null);
        document.removeEventListener(`keydown`, onEscKeyDown);
        this._taskEdit.getElement().querySelector(`.card__btn--archive`).removeEventListener(`click`, this._onArchiveBtnClick);
        this._taskEdit.getElement().querySelector(`.card__btn--favorites`).removeEventListener(`click`, this._onFavoritesBtnClick);
      });

    this._taskEdit.getElement().querySelector(`.card__delete`)
    .addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this._onDataChange(null, this._task);
    });

    render(this._container.getElement(), currentView.getElement(), renderPosition);
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

