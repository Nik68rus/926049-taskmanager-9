import {makeMarkupGenerator} from '../util/dom';

const getMenuItemMarkup = ({name, isChecked = false}) => {
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

const getMenuMarkup = makeMarkupGenerator(getMenuItemMarkup, `\n`);

export const getMenuWrappedMarkup = (elements) => `
  <section class="control__btn-wrap">
    ${getMenuMarkup(elements)}
  </section>`;

