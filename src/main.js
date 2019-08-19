import {
  getMenuWrappedMarkup,
  getSearchMarkup,
  getFilterWrappedMarkup,
  updateFilters,
  getFilterElements,
  getEditFormMarkup,
  getBoardMarkup,
  getSortingMarkup,
  getLoadButtonMarkup,
  getTasksMarkup,
} from './components';

import {TASK_LOAD_NUMB} from './constants';
import {Mock} from './mock';

const tasks = Mock.load();

let loadedTasks = tasks.slice(0, TASK_LOAD_NUMB);

const menuElements = [
  {name: `new-task`},
  {name: `task`, isChecked: true},
  {name: `statistic`},
];

const menuContainer = document.querySelector(`.main__control`);
const mainContainer = document.querySelector(`.main`);

const renderComponent = (container, component, position = `beforeend`) => {
  container.insertAdjacentHTML(position, component);
};

renderComponent(menuContainer, getMenuWrappedMarkup(menuElements));
renderComponent(mainContainer, getSearchMarkup(), `beforeend`);
renderComponent(mainContainer, getFilterWrappedMarkup(getFilterElements(loadedTasks)));
renderComponent(mainContainer, getBoardMarkup());

const taskBoard = document.querySelector(`.board__tasks`);
const boardContainer = document.querySelector(`.board`);

renderComponent(boardContainer, getSortingMarkup(), `afterbegin`);
renderComponent(taskBoard, getEditFormMarkup(loadedTasks[0]));
renderComponent(taskBoard, getTasksMarkup(loadedTasks.slice(1, loadedTasks.length)));
renderComponent(boardContainer, getLoadButtonMarkup());

const loadMoreButton = document.querySelector(`.load-more`);

const onLoadMoreButtonClick = () => {
  const renderingTasks = tasks.slice(loadedTasks.length, loadedTasks.length + TASK_LOAD_NUMB);
  renderComponent(taskBoard, getTasksMarkup(renderingTasks));
  loadedTasks = loadedTasks.concat(renderingTasks);
  if (renderingTasks.length < TASK_LOAD_NUMB) {
    loadMoreButton.style.display = `none`;
    loadMoreButton.removeEventListener(`click`, onLoadMoreButtonClick);
  }
  updateFilters(getFilterElements(loadedTasks));
};

loadMoreButton.addEventListener(`click`, onLoadMoreButtonClick);
