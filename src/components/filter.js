import AbstractComponent from './abstarct-component';

export default class Filter extends AbstractComponent {
  constructor({title, count, isChecked}) {
    super();
    this._title = title;
    this._count = count;
    this._isChecked = isChecked;
  }

  getTemplate() {
    const id = this._title.toLowerCase();
    return `
      <input
        type="radio"
        id="filter__${id}"
        class="filter__input visually-hidden"
        name="filter"
        ${this._isChecked ? `checked` : ``}
      />
      <label for="filter__${id}" class="filter__label">
        ${this._title.toUpperCase()}
        <span class="filter__${id}-count">${this._count}</span>
      </label>`
    .trim();
  }
}
