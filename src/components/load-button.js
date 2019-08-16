import {TASK_BOARD_SIZE} from './constants';
import {taskList} from './data';

let displayedTasks = taskList.slice(0, TASK_BOARD_SIZE);

export const getLoadButtonMarkup = () => {
  return `
    <button class="load-more" type="button">load more</button>
  `;
};
