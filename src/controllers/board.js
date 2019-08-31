import {
  Board,
  TaskList,
  Sorting,
  LoadButton,
  BoardEmpty,
} from '../components';

import {render, unrender, Position} from '../util/dom';
import {TASK_LOAD_NUM} from '../mock';
import TaskController from './task';

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

    this._subscriptions = [];
    this._onChangeView = this._onChangeView.bind(this);
    this._onDataChange = this._onDataChange.bind(this);

  }

  init() {
    const boardElement = this._board.getElement();
    render(this._container, boardElement, Position.BEFOREEND);

    if (this._tasks.every(({isArchive}) => isArchive)) {
      render(boardElement, this._boardEmpty.getElement(), Position.AFTERBEGIN);
    } else {
      render(boardElement, this._sorting.getElement(), Position.AFTERBEGIN);
      this._renderBoard();
    }
  }

  _renderBoard() {
    unrender(this._taskList.getElement());
    this._taskList.removeElement();
    render(this._board.getElement(), this._taskList.getElement(), Position.BEFOREEND);

    this._sortedTasks.slice(0, this._loadedTasks).forEach((task) => this._renderTask(task));
    render(this._board.getElement(), this._loadButton.getElement(), Position.BEFOREEND);
    this._loadButton.getElement().addEventListener(`click`, this._onLoadButtonClick);
    this._sorting.getElement().addEventListener(`click`, (evt) => this._onSortLinkClick(evt));
  }

  _renderTask(task) {
    const taskController = new TaskController(this._taskList, task, this._onDataChange, this._onChangeView);
    this._subscriptions.push(taskController.setDefaultView.bind(taskController));
  }

  _onDataChange(newData, oldData) {
    this._tasks[this._tasks.findIndex((it) => it === oldData)] = newData;
    this._sortedTasks[this._sortedTasks.findIndex((it) => it === oldData)] = newData;
    this._renderBoard();
  }

  _onChangeView() {
    this._subscriptions.forEach((it) => it());
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

