import {
  getMenuWrappedMarkup,
  getSearchMarkup,
  getFilterWrappedMarkup,
  checkFilterOverdue,
  checkFilterToday,
  checkFilterFavorite,
  checkFilterArchived,
  checkFilterRepeating,
  checkFilterTags,
  getEditFormMarkup,
  getBoardMarkup,
  getSortingMarkup,
  getLoadButtonMarkup,
  getTaskCardMarkup,
  taskList,
  TASK_BOARD_SIZE
} from './components';

let displayedTasks = taskList.slice(0, TASK_BOARD_SIZE);
const menuElements = [
  {name: `new-task`},
  {name: `task`, isChecked: true},
  {name: `statistic`},
];

const getTaskCount = (tasks, cb) => tasks.filter(cb).length;


const filterElements = [
  {title: `All`, count: taskList.length, isChecked: true},
  {title: `Overdue`, count: getTaskCount(taskList, checkFilterOverdue)},
  {title: `Today`, count: getTaskCount(taskList, checkFilterToday)},
  {title: `Favorites`, count: getTaskCount(taskList, checkFilterFavorite)},
  {title: `Repeating`, count: getTaskCount(taskList, checkFilterRepeating)},
  {title: `Tags`, count: getTaskCount(taskList, checkFilterTags)},
  {title: `Archive`, count: getTaskCount(taskList, checkFilterArchived)},
];

const menuContainer = document.querySelector(`.main__control`);
const mainContainer = document.querySelector(`.main`);

const renderComponent = (container, component, position) => {
  container.insertAdjacentHTML(position, component);
};

const renderTasks = (container, tasks) => {
  container.insertAdjacentHTML(`beforeend`, tasks.map(getTaskCardMarkup).join(``));
};

renderComponent(menuContainer, getMenuWrappedMarkup(menuElements), `beforeend`);
renderComponent(mainContainer, getSearchMarkup(), `beforeend`);
renderComponent(mainContainer, getFilterWrappedMarkup(filterElements), `beforeend`);
renderComponent(mainContainer, getBoardMarkup(), `beforeend`);

const taskBoard = document.querySelector(`.board__tasks`);
const boardContainer = document.querySelector(`.board`);

renderComponent(boardContainer, getSortingMarkup(), `afterbegin`);
renderComponent(taskBoard, getEditFormMarkup(displayedTasks[0]), `beforeend`);
renderTasks(taskBoard, displayedTasks.filter((task, i) => i !== 0));
renderComponent(boardContainer, getLoadButtonMarkup(), `beforeend`);

const loadMoreButton = document.querySelector(`.load-more`);

const onLoadMoreButtonClick = () => {
  const renderingTasks = taskList.slice(displayedTasks.length, displayedTasks.length + TASK_BOARD_SIZE);
  renderTasks(taskBoard, renderingTasks, `beforeend`);
  displayedTasks = displayedTasks.concat(renderingTasks);
  if (renderingTasks.length < TASK_BOARD_SIZE) {
    loadMoreButton.style.display = `none`;
  }
};

loadMoreButton.addEventListener(`click`, onLoadMoreButtonClick);
