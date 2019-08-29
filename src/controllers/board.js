import {
  Board,
  Task,
  TaskEdit,
  TaskList,
  Sorting,
  LoadButton,
  BoardEmpty,
} from '../components';

import {render, Position} from '../util/dom';
import {isEscapeKey} from '../util/predicates';
import {TASK_LOAD_NUM} from '../mock';

export default class BoardController {
  constructor(container, tasks) {
    this._container = container;
    this._tasks = tasks;
    this._sortedTasks = tasks;
    this._loadedTasks = TASK_LOAD_NUM;
    this._board = new Board();
    this._taskList = new TaskList();
    this._boardEmpty = new BoardEmpty();
    this._sorting = new Sorting();
    this._loadButton = new LoadButton();
    this._onLoadButtonClick = this._onLoadButtonClick.bind(this);
  }

  init() {
    const boardElement = this._board.getElement();
    render(this._container, boardElement, Position.BEFOREEND);

    if (this._tasks.every(({isArchive}) => isArchive)) {
      render(boardElement, this._boardEmpty.getElement(), Position.AFTERBEGIN);
    } else {
      render(boardElement, this._sorting.getElement(), Position.AFTERBEGIN);
      render(boardElement, this._taskList.getElement(), Position.BEFOREEND);
      this._tasks.slice(0, TASK_LOAD_NUM).forEach((taskMock) => this._renderTask(taskMock));
      render(boardElement, this._loadButton.getElement(), Position.BEFOREEND);
      this._loadButton.getElement().addEventListener(`click`, this._onLoadButtonClick);
      this._sorting.getElement().addEventListener(`click`, (evt) => this._onSortLinkClick(evt));
    }
  }

  _renderTask(task) {
    const taskComponent = new Task(task);
    const taskEditComponent = new TaskEdit(task);

    const onEscKeyDown = (evt) => {
      if (isEscapeKey(evt)) {
        this._taskList.getElement().replaceChild(taskComponent.getElement(), taskEditComponent.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    taskComponent.getElement()
      .querySelector(`.card__btn--edit`)
      .addEventListener(`click`, () => {
        this._taskList.getElement().replaceChild(taskEditComponent.getElement(), taskComponent.getElement());
        document.addEventListener(`keydown`, onEscKeyDown);
      });

    taskEditComponent.getElement().querySelector(`textarea`)
      .addEventListener(`focus`, () => {
        document.removeEventListener(`keydown`, onEscKeyDown);
      });

    taskEditComponent.getElement().querySelector(`textarea`)
      .addEventListener(`blur`, () => {
        document.addEventListener(`keydown`, onEscKeyDown);
      });

    taskEditComponent.getElement()
      .querySelector(`.card__save`)
      .addEventListener(`click`, () => {
        this._taskList.getElement().replaceChild(taskComponent.getElement(), taskEditComponent.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
      });

    render(this._taskList.getElement(), taskComponent.getElement(), Position.BEFOREEND);
  }

  _onLoadButtonClick() {
    const renderingTasks = this._sortedTasks.slice(this._loadedTasks, this._loadedTasks + TASK_LOAD_NUM);
    this._loadedTasks += TASK_LOAD_NUM;
    renderingTasks.forEach((task) => this._renderTask(task));
    if (renderingTasks.length < TASK_LOAD_NUM) {
      this._loadButton.getElement().style.display = `none`;
      this._loadButton.getElement().removeEventListener(`click`, this._onLoadButtonClick);
    }
  }

  _onSortLinkClick(evt) {
    evt.preventDefault();

    if (evt.target.tagName.toLowerCase() !== `a`) {
      return;
    }

    this._taskList.getElement().innerHTML = ``;

    switch (evt.target.dataset.sortType) {
      case `date-up`:
        this._sortedTasks = this._tasks.slice().sort((a, b) => a.dueDate - b.dueDate);
        break;
      case `date-down`:
        this._sortedTasks = this._tasks.slice().sort((a, b) => b.dueDate - a.dueDate);
        break;
      case `default`:
        this._sortedTasks = this._tasks;
        break;
    }
    this._sortedTasks.slice(0, this._loadedTasks).forEach((task) => this._renderTask(task));
  }
}

