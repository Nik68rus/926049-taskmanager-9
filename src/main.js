import { getMenuMarkup } from './components/site-menu';
import { getSearchMarkup } from './components/search';
import { getFiltersMarkup, getFiltersData } from './components/filter';
import { getBoardMarkup } from './components/board';
import { getSortingMarkup } from './components/sorting';
import { getTaskMarkup } from './components/task';
import { getEditFormMarkup } from './components/task-edit';
import { getLoadBtnMarkup } from './components/load-more-button';
import { Mock, TASK_LOAD_NUM } from './mock';

const menuContainer = document.querySelector(`.main__control`);
const mainContainer = document.querySelector(`.main`);

const renderComponent = (container, component, position) => {
  container.insertAdjacentHTML(position, component);
};

const tasks = Mock.load();
const loadedTasks = tasks.slice(0, TASK_LOAD_NUM);

renderComponent(menuContainer, getMenuMarkup(), `beforeend`);
renderComponent(mainContainer, getSearchMarkup(), `beforeend`);
renderComponent(mainContainer, getFiltersMarkup(getFiltersData(loadedTasks)), `beforeend`);
renderComponent(mainContainer, getBoardMarkup(), `beforeend`);

const boardContainer = document.querySelector(`.board`);
const cardsContainer = document.querySelector(`.board__tasks`);

renderComponent(boardContainer, getSortingMarkup(), `afterbegin`);

renderComponent(cardsContainer, getEditFormMarkup(loadedTasks[0]), `afterbegin`);
loadedTasks.slice(1, 8).forEach((task) => renderComponent(cardsContainer, getTaskMarkup(task), `beforeend`));
renderComponent(boardContainer, getLoadBtnMarkup(), `beforeend`);

