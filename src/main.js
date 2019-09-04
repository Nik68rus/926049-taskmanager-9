import {
  Search,
  SiteMenu,
  Filter,
  formatDate,
  Statistic,
} from './components';

import BoardController from './controllers/board';
import {render, Position} from './util/dom';
import {Mock, TASK_LOAD_NUM} from './mock';

const menuContainer = document.querySelector(`.main__control`);
const mainContainer = document.querySelector(`.main`);
const statistics = new Statistic();

const menuElements = [
  {name: `new-task`},
  {name: `task`, isChecked: true},
  {name: `statistic`},
];

const getFilterElements = (data) => [
  {title: `All`, count: getTaskCount(data, checkFilterAll), isChecked: true},
  {title: `Overdue`, count: getTaskCount(data, checkFilterOverdue)},
  {title: `Today`, count: getTaskCount(data, checkFilterToday)},
  {title: `Favorites`, count: getTaskCount(data, checkFilterFavorite)},
  {title: `Repeating`, count: getTaskCount(data, checkFilterRepeating)},
  {title: `Tags`, count: getTaskCount(data, checkFilterTags)},
  {title: `Archive`, count: getTaskCount(data, checkFilterArchived)},
];

const renderSearch = () => {
  const search = new Search();
  render(mainContainer, search.getElement(), Position.BEFOREEND);
};

const renderMenuWrapper = () => {
  const menuWrapper = `<section class="control__btn-wrap">
    </section>`;
  menuContainer.insertAdjacentHTML(Position.BEFOREEND, menuWrapper);
};

const onMenuChange = (evt) => {
  evt.preventDefault();
  if (evt.target.tagName.toLowerCase() !== `input`) {
    return;
  }
  switch (evt.target.id) {
    case `control__task`:
      statistics.getElement().classList.add(`visually-hidden`);
      boardController.show();
      break;
    case `control__statistic`:
      boardController.hide();
      statistics.getElement().classList.remove(`visually-hidden`);
      break;
    case `control__new-task`:
      boardController.createTask();
      // Вернем выделение на пункт меню TASKS
      menuContainer.querySelector(`#control__task`).checked = true;
      break;
  }
};

const renderMenu = (menuItem) => {
  const menuWrapper = mainContainer.querySelector(`.control__btn-wrap`);
  const menu = new SiteMenu(menuItem);
  render(menuWrapper, menu.getElement(), Position.BEFOREEND);
  menu.getElement()[0].addEventListener(`change`, (evt) => {
    onMenuChange(evt);
  });
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

const checkFilterAll = (task) =>
  !task.isArchive;

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

const tasks = Mock.load();
let loadedTasks = tasks.slice(0, TASK_LOAD_NUM);
const filters = getFilterElements(loadedTasks);

renderMenuWrapper();
menuElements.forEach(renderMenu);
renderSearch();
renderFilterWrapper();
filters.forEach(renderFilter);
updateFilters(getFilterElements(tasks));
render(mainContainer, statistics.getElement(), Position.BEFOREEND);
statistics.getElement().classList.add(`visually-hidden`);

const boardController = new BoardController(mainContainer, tasks);
boardController.init();
