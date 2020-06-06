import { createFewElements } from '../utils/utils';
import AbstractComponent from './abstract-component';

export default class Filter extends AbstractComponent {
  constructor({ title, count, isChecked }) {
    super();
    this._title = title;
    this._count = count;
    this._isChecked = isChecked;
  }

  getElement() {
    if (!this._element) {
      this._element = createFewElements(this.getTemplate());
    }
    return this._element;
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
    <label for="filter__all" class="filter__label">
      ${this._title} <span class="filter__${id}-count">${this._count}</span></label
    >
    `.trim();
  }
}
