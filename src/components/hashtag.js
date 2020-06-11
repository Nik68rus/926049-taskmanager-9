import AbstractComponent from './abstract-component';

export default class Hashtag extends AbstractComponent {
  constructor(tagName) {
    super();
    this._text = tagName;
    this.addListeners();
  }

  addListeners() {
    this.getElement().querySelector(`.card__hashtag-delete`).addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this.getElement().remove();
    });
  }

  onDeleteClick() {

  }

  getTemplate() {
    return `<span class="card__hashtag-inner">
    <input
      type="hidden"
      name="hashtag"
      value="${this._text}"
      class="card__hashtag-hidden-input"
    />
    <p class="card__hashtag-name">
      #${this._text}
    </p>
    <button type="button" class="card__hashtag-delete">
      delete
    </button>
  </span>`.trim();
  }
}
