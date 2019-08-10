import {getMarkup} from './util';

const filterElements = [
  {name: `All`, count: 13, isChecked: true},
  {name: `Overdue`, count: 0},
  {name: `Today`, count: 0},
  {name: `Favorites`, count: 1},
  {name: `Repeating`, count: 1},
  {name: `Tags`, count: 1},
  {name: `Archive`, count: 115},
];

const getFilterMarkup = ({name, count = 0, isChecked = false} = {}) => {
  const id = name.toLowerCase();
  return `
    <input
      type="radio"
      id="filter__${id}"
      class="filter__input visually-hidden"
      name="filter"
      ${isChecked ? `checked` : ``}
    />
    <label for="filter__${id}" class="filter__label">
      ${name.toUpperCase()}
      <span class="filter__${id}-count">${count}</span>
    </label>`.trim();
};

const getMarkupFilters = (data) =>
  getMarkup(data, getFilterMarkup);

const filtersMarkup = getMarkupFilters(filterElements);

export const filterWrapper = `
<section class="main__filter filter container">
  ${filtersMarkup}
</section>`;
