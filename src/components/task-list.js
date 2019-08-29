import AbstractComponent from './abstarct-component';

export default class TaskList extends AbstractComponent {
  getTemplate() {
    return `<div class="board__tasks"></div>`;
  }
}
