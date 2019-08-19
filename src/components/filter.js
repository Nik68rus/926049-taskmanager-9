import {makeMarkupGenerator} from '../util/dom';
import {formatDate} from './card-date';

const getFilterItemMarkup = ({title, count = 0, isChecked = false}) => {
  const id = title.toLowerCase();
  return `
    <input
      type="radio"
      id="filter__${id}"
      class="filter__input visually-hidden"
      name="filter"
      ${isChecked ? `checked` : ``}
    />
    <label for="filter__${id}" class="filter__label">
      ${title.toUpperCase()}
      <span class="filter__${id}-count">${count}</span>
    </label>`.trim();
};

const getFiltersMarkup = makeMarkupGenerator(getFilterItemMarkup, `\n`);

export const getFilterWrappedMarkup = (elements) => `
  <section class="main__filter filter container">
    ${getFiltersMarkup(elements)}
  </section>`;

const checkFilterOverdue = (task) =>
  task.dueDate < Date.now();

const checkFilterToday = (task) =>
  formatDate(task.dueDate) === formatDate(Date.now());

const checkFilterFavorite = (task) =>
  task.isFavorite === true;

const checkFilterRepeating = (task) =>
  Object.keys(task.repeatingDays).some((day) => task.repeatingDays[day]);

const checkFilterTags = (task) =>
  task.tags.size > 0;

const checkFilterArchived = (task) =>
  task.isArchive === true;

const getTaskCount = (data, cb) =>
  data.filter(cb).length;

export const getFilterElements = (tasks) => [
  {title: `All`, count: tasks.length, isChecked: true},
  {title: `Overdue`, count: getTaskCount(tasks, checkFilterOverdue)},
  {title: `Today`, count: getTaskCount(tasks, checkFilterToday)},
  {title: `Favorites`, count: getTaskCount(tasks, checkFilterFavorite)},
  {title: `Repeating`, count: getTaskCount(tasks, checkFilterRepeating)},
  {title: `Tags`, count: getTaskCount(tasks, checkFilterTags)},
  {title: `Archive`, count: getTaskCount(tasks, checkFilterArchived)},
];

export const updateFilters = (filters) => {
  filters.forEach((filter) => {
    const node = document.querySelector(`.filter__${filter.title.toLowerCase()}-count`);
    node.textContent = filter.count;
  });
};
