import {getMarkup} from './util';
import {formatDate} from './util';

const getFilterItemMarkup = ({title, count = 0, isChecked = false} = {}) => {
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

const getFiltersMarkup = (data) =>
  getMarkup(data, getFilterItemMarkup);

export const getFilterWrappedMarkup = (elements) => {
  return `
    <section class="main__filter filter container">
      ${getFiltersMarkup(elements)}
    </section>`;
};

export const checkFilterOverdue = (task) => task.dueDate < Date.now();
export const checkFilterToday = (task) => formatDate(task.dueDate) === formatDate(Date.now());
export const checkFilterFavorite = (task) => task.isFavorite === true;
export const checkFilterRepeating = (task) => Object.keys(task.repeatingDays).some((day) => task.repeatingDays[day]);
export const checkFilterTags = (task) => task.tags.size > 0;
export const checkFilterArchived = (task) => task.isArchive === true;
