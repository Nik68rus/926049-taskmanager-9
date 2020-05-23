import { getMenuMarkup } from './components/site-menu';
import { getSearchMarkup } from './components/search';
import { getFiltersMarkup } from './components/filter';
import { getBoardMarkup } from './components/board';
import { getSortingMarkup } from './components/sorting';
import { getTaskMarkup } from './components/task';
import { getEditFormMarkup } from './components/task-edit';
import { getLoadBtnMarkup } from './components/load-more-button';

const menuContainer = document.querySelector(`.main__control`);
const mainContainer = document.querySelector(`.main`);

const renderComponent = (container, component, position) => {
  container.insertAdjacentHTML(position, component);
};

renderComponent(menuContainer, getMenuMarkup(), `beforeend`);
renderComponent(mainContainer, getSearchMarkup(), `beforeend`);
renderComponent(mainContainer, getFiltersMarkup(), `beforeend`);
renderComponent(mainContainer, getBoardMarkup(), `beforeend`);

const boardContainer = document.querySelector(`.board`);
const cardsContainer = document.querySelector(`.board__tasks`);

renderComponent(boardContainer, getSortingMarkup(), `afterbegin`);
renderComponent(cardsContainer, getEditFormMarkup(), `afterbegin`);

new Array(3).fill(``).forEach(() => renderComponent(cardsContainer, getTaskMarkup(), `beforeend`));

renderComponent(boardContainer, getLoadBtnMarkup(), `beforeend`);
