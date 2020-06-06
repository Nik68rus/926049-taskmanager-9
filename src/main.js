import { Mock } from './mock';
import { Position } from './constants';
import BoardController from './controllers/board';

import {
  Search,
  SiteMenu,
  Filter,
} from './components';

import { render } from './utils/utils';

const menuContainer = document.querySelector(`.main__control`);
const mainContainer = document.querySelector(`.main`);
const tasks = Mock.load();

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

renderMenuWrapper(menuContainer);

const menuWrapper = document.querySelector(`.control__btn-wrap`);
Mock.menu.forEach((item) => renderMenu(menuWrapper, item));

renderSearch(mainContainer);

renderFilterWrapper(mainContainer);
const filterContainer = document.querySelector(`.filter`);
Mock.filters(tasks).forEach((filter) => renderFilter(filterContainer, filter));

const boardController = new BoardController(mainContainer, tasks);
boardController.init();
