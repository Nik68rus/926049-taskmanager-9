import {
  Board,
  Task,
  TaskEdit,
  TaskList,
  Sorting,
  NoTasks,
  LoadButton,
} from '../components';

import {render, Position} from '../util/dom';
import {isEscapeKey} from '../util/predicates';

const TASK_LOAD_NUMB = 8;

export default class BoardController {
  constructor(container, tasks) {
    this._container = container;
    this._tasks = tasks;
    this._loadedTasks = TASK_LOAD_NUMB;
    this._board = new Board();
    this._taskList = new TaskList();
    this._noTasks = new NoTasks();
    this._sorting = new Sorting();
    this._loadButton = new LoadButton();
  }

  init() {
    render(this._container, this._board.getElement(), Position.BEFOREEND);

    if (this._tasks.filter((task) => task.isArchive === false).length === 0) {
      render(this._board.getElement(), this._noTasks.getElement(), Position.AFTERBEGIN);
    } else {
      render(this._board.getElement(), this._sorting.getElement(), Position.AFTERBEGIN);
      render(this._board.getElement(), this._taskList.getElement(), Position.BEFOREEND);
      this._tasks.slice(0, TASK_LOAD_NUMB).forEach((taskMock) => this._renderTask(taskMock));
      render(this._board.getElement(), this._loadButton.getElement(), Position.BEFOREEND);
      this._loadButton.getElement().addEventListener(`click`, (evt) => this._onLoadButtonClick(evt));
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
    const renderingTasks = this._tasks.slice(this._loadedTasks, this._loadedTasks + TASK_LOAD_NUMB);
    this._loadedTasks += TASK_LOAD_NUMB;
    renderingTasks.forEach((taskMock) => this._renderTask(taskMock));
    if (renderingTasks.length < TASK_LOAD_NUMB) {
      this._loadButton.getElement().style.display = `none`;
      this._loadButton.getElement().removeEventListener(`click`, this._onLoadMoreButtonClick);
    }
  }

}

