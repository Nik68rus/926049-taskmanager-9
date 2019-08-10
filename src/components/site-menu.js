import {getMarkup} from './util';

const getMenuMarkup = ({name, isChecked = false} = {}) => {
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

const menuElements = [
  {name: `new-task`},
  {name: `task`, isChecked: true},
  {name: `statistic`},
];

const getMarkupMenu = (data) => getMarkup(data, getMenuMarkup);

const menuMarkup = getMarkupMenu(menuElements);

export const menuWrapper = `
<section class="control__btn-wrap">
  ${menuMarkup}
</section>`;

