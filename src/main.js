import { Mock, TASK_LOAD_NUM } from './mock';
import { Position } from './constants';

import {
  Search,
  TaskEdit,
  Board,
  Sorting,
  LoadButton,
  Task,
  SiteMenu,
  Filter,
} from './components';

import { render } from './utils/utils';

const menuContainer = document.querySelector(`.main__control`);
const mainContainer = document.querySelector(`.main`);
const tasks = Mock.load();
let loadedTasks = tasks.slice(0, TASK_LOAD_NUM);

const renderMenuWrapper = (container) => {
  const menuWrapper = `<section class="control__btn-wrap">
    </section>`;
  container.insertAdjacentHTML(Position.BEFOREEND, menuWrapper);
};

const renderMenu = (container, menuItem) => {
  const menu = new SiteMenu(menuItem);
  render(container, menu.getElement(), Position.BEFOREEND);
};

const renderFilterWrapper = (container) => {
  const filterWrapper = `
    <section class="main__filter filter container">
    </section>
  `;
  container.insertAdjacentHTML(Position.BEFOREEND, filterWrapper);
};

const renderFilter = (container, filterItem) => {
  const filter = new Filter(filterItem);
  render(container, filter.getElement(), Position.BEFOREEND);
};

const renderSearch = (container) => {
  const search = new Search();
  render(container, search.getElement(), Position.BEFOREEND);
};

const renderBoard = (container) => {
  const board = new Board();
  render(container, board.getElement(), Position.BEFOREEND);
};

const renderSorting = (container) => {
  const sorting = new Sorting();
  render(container, sorting.getElement(), Position.AFTERBEGIN);
};

renderMenuWrapper(menuContainer);

const menuWrapper = document.querySelector(`.control__btn-wrap`);
Mock.menu.forEach((item) => renderMenu(menuWrapper, item));

renderSearch(mainContainer);

renderFilterWrapper(mainContainer);
const filterContainer = document.querySelector(`.filter`);
Mock.filters(tasks).forEach((filter) => renderFilter(filterContainer, filter));
renderBoard(mainContainer);
const taskBoard = document.querySelector(`.board__tasks`);
const boardContainer = document.querySelector(`.board`);
renderSorting(boardContainer);


const renderTask = (container, taskMock) => {
  const task = new Task(taskMock);
  const taskEdit = new TaskEdit(taskMock);

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      container.replaceChild(task.getElement(), taskEdit.getElement());
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  task.getElement().querySelector(`.card__btn--edit`).addEventListener(`click`, () => {
    container.replaceChild(taskEdit.getElement(), task.getElement());
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  taskEdit.getElement().querySelector(`textarea`)
    .addEventListener(`focus`, () => {
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

  taskEdit.getElement().querySelector(`textarea`)
    .addEventListener(`blur`, () => {
      document.addEventListener(`keydown`, onEscKeyDown);
    });

  taskEdit.getElement().querySelector(`.card__save`).addEventListener(`click`, () => {
    container.replaceChild(task.getElement(), taskEdit.getElement());
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(container, task.getElement(), Position.BEFOREEND);
};

const renderLoadBtn = (container) => {
  const btn = new LoadButton();
  render(container, btn.getElement(), Position.BEFOREEND);
};


loadedTasks.forEach((taskMock) => renderTask(taskBoard, taskMock));
renderLoadBtn(boardContainer);

const loadMoreButton = document.querySelector(`.load-more`);

const onLoadMoreButtonClick = () => {
  const renderingTasks = tasks.slice(loadedTasks.length, loadedTasks.length + TASK_LOAD_NUM);
  renderingTasks.forEach((task) => renderTask(taskBoard, task));
  loadedTasks = loadedTasks.concat(renderingTasks);
  if (renderingTasks.length < TASK_LOAD_NUM) {
    loadMoreButton.style.display = `none`;
    loadMoreButton.removeEventListener(`click`, onLoadMoreButtonClick);
  }
};

loadMoreButton.addEventListener(`click`, onLoadMoreButtonClick);
