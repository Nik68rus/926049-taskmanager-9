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
import {Mode, SortType} from '../constants';

export default class BoardController {
  constructor(container, tasks) {
    this._container = container;
    this._tasks = tasks;
    this._creatingTask = null;
    this._sortType = SortType.DEFAULT;
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

  hide() {
    this._board.getElement().classList.add(`visually-hidden`);
  }

  show() {
    this._board.getElement().classList.remove(`visually-hidden`);
  }

  createTask() {
    const defaultTask = {
      description: ``,
      dueDate: new Date(),
      tags: new Set(),
      color: [],
      repeatingDays: {
        'mo': false,
        'tu': false,
        'we': false,
        'th': false,
        'fr': false,
        'sa': false,
        'su': false,
      },
      isFavorite: false,
      isArchive: false,
    };

    if (this._creatingTask) {
      return;
    }
    this._creatingTask = new TaskController(this._taskList, defaultTask, Mode.ADDING, this._onDataChange, this._onChangeView);
  }

  _renderBoard() {
    unrender(this._taskList.getElement());
    this._taskList.removeElement();
    render(this._board.getElement(), this._taskList.getElement(), Position.BEFOREEND);

    this._getSortedTasks().slice(0, this._loadedTasks).forEach((task) => this._renderTask(task));
    render(this._board.getElement(), this._loadButton.getElement(), Position.BEFOREEND);
    this._loadButton.getElement().addEventListener(`click`, this._onLoadButtonClick);
    this._sorting.getElement().addEventListener(`click`, (evt) => this._onSortLinkClick(evt));
  }

  _renderTask(task) {
    const taskController = new TaskController(this._taskList, task, Mode.DEFAULT, this._onDataChange, this._onChangeView);
    this._subscriptions.push(taskController.setDefaultView.bind(taskController));
  }

  _onDataChange(newData, oldData) {
    const index = this._tasks.findIndex((it) => it === oldData);

    if (newData === null) {
      this._tasks = [...this._tasks.slice(0, index), ...this._tasks.slice(index + 1)];
      if (oldData === null) {
        this._creatingTask = null;
      }
    } else {
      if (oldData === null) {
        this._creatingTask = null;
        this._tasks = [newData, ...this._tasks];
      } else {
        this._tasks[index] = newData;
      }
    }

    this._renderBoard();
  }

  _onChangeView() {
    this._subscriptions.forEach((it) => it());
  }

  _onLoadButtonClick() {
    const renderingTasks = this._getSortedTasks().slice(this._loadedTasks, this._loadedTasks + TASK_LOAD_NUM);
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
    this._sortType = evt.target.dataset.sortType;
    this._getSortedTasks().slice(0, this._loadedTasks).forEach((task) => this._renderTask(task));
  }

  _getSortedTasks() {
    let currentTasks = [];
    switch (this._sortType) {
      case SortType.DATE_UP:
        currentTasks = this._tasks.slice().sort((a, b) => a.dueDate - b.dueDate);
        break;
      case SortType.DATE_DOWN:
        currentTasks = this._tasks.slice().sort((a, b) => b.dueDate - a.dueDate);
        break;
      case SortType.DEFAULT:
        currentTasks = this._tasks;
    }
    return currentTasks;
  }
}

