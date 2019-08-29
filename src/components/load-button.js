import AbstractComponent from './abstarct-component';

export default class LoadButton extends AbstractComponent {
  getTemplate() {
    return `
      <button class="load-more" type="button">load more</button>
    `.trim();
  }
}
