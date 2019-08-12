import {getMarkup} from './util';

const getFilterItemMarkup = ({name, count = 0, isChecked = false} = {}) => {
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

const getFiltersMarkup = (data) =>
  getMarkup(data, getFilterItemMarkup);

export const getFilterWrappedMarkup = (elements) => {
  return `
    <section class="main__filter filter container">
      ${getFiltersMarkup(elements)}
    </section>`;
};
