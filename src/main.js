import {menuWrapper} from './components/site-menu';
import {getSearchMarkup} from './components/search';
import {filterWrapper} from './components/filter';
import {getEditForm} from './components/edit-form';
import {getBoardMarkup} from './components/board';
import {getSortingMarkup} from './components/sorting';
import {getLoadButton} from './components/load-button';
import {getTaskCard} from './components/task';

const taskCard = {
  text: `Example default task with default color.`,
  date: Date.now(),
  tags: [`todo`, `personal`, `important`],
};

const menuContainer = document.querySelector(`.main__control`);
const mainContainer = document.querySelector(`.main`);

const renderComponent = (container, component, position) => {
  container.insertAdjacentHTML(position, component);
};

renderComponent(menuContainer, menuWrapper, `beforeend`);
renderComponent(mainContainer, getSearchMarkup(), `beforeend`);
renderComponent(mainContainer, filterWrapper, `beforeend`);
renderComponent(mainContainer, getBoardMarkup(), `beforeend`);

const taskBoard = document.querySelector(`.board__tasks`);
const boardContainer = document.querySelector(`.board`);

renderComponent(boardContainer, getSortingMarkup(), `afterbegin`);
renderComponent(taskBoard, getEditForm(), `beforeend`);

for (let i = 0; i < 3; i++) {
  renderComponent(taskBoard, getTaskCard(taskCard), `beforeend`);
}

renderComponent(taskBoard, getLoadButton(), `beforeend`);
