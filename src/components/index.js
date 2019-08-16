import {getMenuWrappedMarkup} from './site-menu';
import {getSearchMarkup} from './search';
import {getFilterWrappedMarkup, checkFilterOverdue, checkFilterToday, checkFilterFavorite, checkFilterArchived, checkFilterRepeating, checkFilterTags} from './filter';
import {getEditFormMarkup} from './edit-form';
import {getBoardMarkup} from './board';
import {getSortingMarkup} from './sorting';
import {getLoadButtonMarkup} from './load-button';
import {getTaskCardMarkup} from './task';
import {taskList} from './data';
import {COLORS, TAG_LIST, TASK_BOARD_SIZE, TASK_COUNT} from './constants';

export {
  getMenuWrappedMarkup,
  getSearchMarkup,
  getFilterWrappedMarkup,
  checkFilterOverdue,
  checkFilterToday,
  checkFilterFavorite,
  checkFilterArchived,
  checkFilterRepeating,
  checkFilterTags,
  getEditFormMarkup,
  getBoardMarkup,
  getSortingMarkup,
  getLoadButtonMarkup,
  getTaskCardMarkup,
  taskList,
  COLORS,
  TAG_LIST,
  TASK_BOARD_SIZE,
  TASK_COUNT,
};
