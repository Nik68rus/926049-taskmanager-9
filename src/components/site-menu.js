import AbstractComponent from './abstarct-component';

export default class SiteMenu extends AbstractComponent {
  constructor({name, isChecked}) {
    super();
    this._name = name;
    this._isChecked = isChecked;
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
