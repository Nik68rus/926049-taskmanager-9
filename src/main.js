import {
  Search,
  TaskEdit,
  Board,
  Sorting,
  LoadButton,
  Task,
  SiteMenu,
  Filter,
  formatDate,
} from './components';

import {render, createElement, Position} from './util/dom';
import {isEscapeKey} from './util/predicates';
import {Mock, TASK_LOAD_NUMB} from './mock';

const menuContainer = document.querySelector(`.main__control`);
const mainContainer = document.querySelector(`.main`);

const menuElements = [
  {name: `new-task`},
  {name: `task`, isChecked: true},
  {name: `statistic`},
];

const getFilterElements = (data) => [
  {title: `All`, count: data.length, isChecked: true},
  {title: `Overdue`, count: getTaskCount(data, checkFilterOverdue)},
  {title: `Today`, count: getTaskCount(data, checkFilterToday)},
  {title: `Favorites`, count: getTaskCount(data, checkFilterFavorite)},
  {title: `Repeating`, count: getTaskCount(data, checkFilterRepeating)},
  {title: `Tags`, count: getTaskCount(data, checkFilterTags)},
  {title: `Archive`, count: getTaskCount(data, checkFilterArchived)},
];

const renderTask = (taskMock) => {
  const taskBoard = document.querySelector(`.board__tasks`);
  const task = new Task(taskMock);
  const taskEdit = new TaskEdit(taskMock);

  const onEscKeyDown = (evt) => {
    if (isEscapeKey(evt)) {
      taskBoard.replaceChild(task.getElement(), taskEdit.getElement());
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  task.getElement()
    .querySelector(`.card__btn--edit`)
    .addEventListener(`click`, () => {
      taskBoard.replaceChild(taskEdit.getElement(), task.getElement());
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

  taskEdit.getElement()
    .querySelector(`.card__save`)
    .addEventListener(`click`, () => {
      taskBoard.replaceChild(task.getElement(), taskEdit.getElement());
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

  render(taskBoard, task.getElement(), Position.BEFOREEND);
};

const renderBoard = () => {
  const board = new Board();
  render(mainContainer, board.getElement(), Position.BEFOREEND);
};

const renderLoadButton = () => {
  const loadButton = new LoadButton();

  const onLoadMoreButtonClick = () => {
    const renderingTasks = tasks.slice(loadedTasks.length, loadedTasks.length + TASK_LOAD_NUMB);
    renderingTasks.forEach((taskMock) => renderTask(taskMock));
    loadedTasks = loadedTasks.concat(renderingTasks);
    if (renderingTasks.length < TASK_LOAD_NUMB) {
      loadButton.getElement().style.display = `none`;
      loadButton.getElement().removeEventListener(`click`, onLoadMoreButtonClick);
    }
    updateFilters(getFilterElements(loadedTasks));
  };

  loadButton.getElement().addEventListener(`click`, onLoadMoreButtonClick);
  render(boardContainer, loadButton.getElement(), Position.BEFOREEND);
};

const renderSearch = () => {
  const search = new Search();
  render(mainContainer, search.getElement(), Position.BEFOREEND);
};

const renderSorting = () => {
  const sorting = new Sorting();
  render(boardContainer, sorting.getElement(), Position.AFTERBEGIN);
};

const renderMenuWrapper = () => {
  const menuWrapper = `<section class="control__btn-wrap">
    </section>`;
  menuContainer.insertAdjacentHTML(Position.BEFOREEND, menuWrapper);
};

const renderMenu = (menuItem) => {
  const menuWrapper = mainContainer.querySelector(`.control__btn-wrap`);
  const menu = new SiteMenu(menuItem);
  render(menuWrapper, menu.getElement(), Position.BEFOREEND);
};

const renderFilterWrapper = () => {
  const filterWrapper = `
    <section class="main__filter filter container">
    </section>
  `;
  mainContainer.insertAdjacentHTML(Position.BEFOREEND, filterWrapper);
};

const renderFilter = (filterItem) => {
  const filterContainer = mainContainer.querySelector(`.filter`);
  const filter = new Filter(filterItem);
  render(filterContainer, filter.getElement(), Position.BEFOREEND);
};

const checkFilterOverdue = (task) =>
  task.dueDate < Date.now();

const checkFilterToday = (task) =>
  formatDate(task.dueDate) === formatDate(Date.now());

const checkFilterFavorite = ({isFavorite}) => isFavorite;

const checkFilterRepeating = (task) =>
  Object.keys(task.repeatingDays).some((day) => task.repeatingDays[day]);

const checkFilterTags = (task) =>
  task.tags.size > 0;

const checkFilterArchived = ({isArchive}) => isArchive;

const getTaskCount = (task, cb) =>
  task.filter(cb).length;

const updateFilters = (filters) => {
  filters.forEach((filter) => {
    const node = document.querySelector(`.filter__${filter.title.toLowerCase()}-count`);
    node.textContent = filter.count;
  });
};

const getNoTaskTemplate = () => `
  <p class="board__no-tasks">
    Congratulations, all tasks were completed! To create a new click on
    «add new task» button.
  </p>
`.trim();

const tasks = Mock.load();
let loadedTasks = tasks.slice(0, TASK_LOAD_NUMB);
const filters = getFilterElements(loadedTasks);

renderMenuWrapper();
menuElements.forEach(renderMenu);
renderSearch();
renderFilterWrapper();
filters.forEach(renderFilter);
renderBoard();

const boardContainer = document.querySelector(`.board`);

if (tasks.filter((task) => task.isArchive === false).length === 0) {
  render(boardContainer, createElement(getNoTaskTemplate()), Position.AFTERBEGIN);
} else {
  renderSorting();
  loadedTasks.forEach(renderTask);
  renderLoadButton();
}
