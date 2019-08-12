import {
  getMenuWrappedMarkup,
  getSearchMarkup,
  getFilterWrappedMarkup,
  getEditFormMarkup,
  getBoardMarkup,
  getSortingMarkup,
  getLoadButtonMarkup,
  getTaskCardMarkup,
} from './components';

const menuElements = [
  {name: `new-task`},
  {name: `task`, isChecked: true},
  {name: `statistic`},
];

const filterElements = [
  {name: `All`, count: 13, isChecked: true},
  {name: `Overdue`, count: 0},
  {name: `Today`, count: 0},
  {name: `Favorites`, count: 1},
  {name: `Repeating`, count: 1},
  {name: `Tags`, count: 1},
  {name: `Archive`, count: 115},
];

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

renderComponent(menuContainer, getMenuWrappedMarkup(menuElements), `beforeend`);
renderComponent(mainContainer, getSearchMarkup(), `beforeend`);
renderComponent(mainContainer, getFilterWrappedMarkup(filterElements), `beforeend`);
renderComponent(mainContainer, getBoardMarkup(), `beforeend`);

const taskBoard = document.querySelector(`.board__tasks`);
const boardContainer = document.querySelector(`.board`);

renderComponent(boardContainer, getSortingMarkup(), `afterbegin`);
renderComponent(taskBoard, getEditFormMarkup(), `beforeend`);

for (let i = 0; i < 3; i++) {
  renderComponent(taskBoard, getTaskCardMarkup(taskCard), `beforeend`);
}

renderComponent(taskBoard, getLoadButtonMarkup(), `beforeend`);
