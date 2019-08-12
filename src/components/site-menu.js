import {getMarkup} from './util';

const getMenuItemMarkup = ({name, isChecked = false} = {}) => {
  const id = name.toLowerCase();
  const menuName = name.toUpperCase() + `S`;
  return `
    <input
      type="radio"
      name="control"
      id="control__${id}"
      class="control__input visually-hidden"
      ${isChecked ? `checked` : ``}
    />
    <label
      for="control__${id}"
      class="control__label ${id === `new-task` ? `control__label--new-task` : ``}">
    ${id === `new-task` ? `+ ADD NEW TASK` : menuName}
    </label>
  `.trim();
};

const getMenuMarkup = (data) => getMarkup(data, getMenuItemMarkup);

export const getMenuWrappedMarkup = (elements) => {
  return `
    <section class="control__btn-wrap">
      ${getMenuMarkup(elements)}
    </section>`;
};

