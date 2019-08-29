import AbstractComponent from './abstarct-component';

export default class Board extends AbstractComponent {
  getTemplate() {
    return `
      <section class="board container">
      </section>
    `.trim();
  }
}
