import { createFewElements } from '../utils/utils';

export class SiteMenu {
  constructor({ name, isChecked }) {
    this._name = name;
    this._isChecked = isChecked;
    this._element = null;
  }

  getElement() {
    if (!this._element) {
      this._element = createFewElements(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }

  getTemplate() {
    const id = this._name.toLowerCase();
    const menuName = this._name.toUpperCase() + `S`;
    return `
      <input
        type="radio"
        name="control"
        id="control__${id}"
        class="control__input visually-hidden"
        ${this._isChecked ? `checked` : ``}
      />
      <label
        for="control__${id}"
        class="control__label ${id === `new-task` ? `control__label--new-task` : ``}">
      ${id === `new-task` ? `+ ADD NEW TASK` : menuName}
      </label>
    `.trim();
  }
}
