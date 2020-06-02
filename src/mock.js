import { TaskDay, Time } from './constants';
const TASK_NUM = 22;
export const TASK_LOAD_NUM = 8;
const MAX_TAGS_NUM = 3;
const TAGS = [`homework`, `theory`, `practice`, `intensive`, `keks`];
const DESCRIPTIONS = [
  `Изучить теорию`,
  `Сделать домашку`,
  `Пройти интенсив на соточку`,
];
export const COLORS = [
  `black`,
  `yellow`,
  `blue`,
  `green`,
  `pink`,
];

const weekDays = Object.values(TaskDay);

const getRandomBool = (chance = 0.5) => Math.random() > chance;
const getRandomItem = (array) => array[Math.floor(Math.random() * array.length)];
const getRandomNumber = (min = 0, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const repeatDayReducer = (days, day) => {
  days[day] = getRandomBool(0.9);
  return days;
};

const getRepeatingDays = (days) =>
  days.reduce(repeatDayReducer, {});

const getRandomSorting = () => Math.random() - 0.5;

const getRandomTags = (tags, num = MAX_TAGS_NUM) =>
  [...new Set(tags.sort(getRandomSorting).slice(0, num))];

const getTask = () => ({
  description: getRandomItem(DESCRIPTIONS),
  dueDate: Date.now() + getRandomNumber(-Time.WEEK, Time.WEEK),
  repeatingDays: getRepeatingDays(weekDays),
  tags: getRandomTags(TAGS, getRandomNumber(0, MAX_TAGS_NUM)),
  color: getRandomItem(COLORS),
  isFavorite: getRandomBool(),
  isArchive: getRandomBool(),
});

const getTasks = (num = TASK_NUM) => Array.from({ length: num }, getTask);

const getTaskCount = (tasks, cb) => tasks.filter(cb).length;

const checkFilterOverdue = (task) => task.dueDate < Date.now();
const checkFilterToday = (task) => {
  const taskDate = new Date(task.dueDate);
  const today = new Date(Date.now());
  return taskDate.getYear() === today.getYear() && taskDate.getMonth() === today.getMonth() && taskDate.getDate() === today.getDate();
};
const checkFilterFavorites = (task) => task.isFavorite;
const checkFilterArchive = (task) => task.isArchive;
const checkFilterTags = (task) => task.length > 0;
const checkFilterRepeating = (task) => Object.keys(task.repeatingDays).some((day) => task.repeatingDays[day]);

export const getFiltersData = (tasks) => [
  { title: `all`, count: tasks.length, isChecked: true },
  { title: `overdue`, count: getTaskCount(tasks, checkFilterOverdue) },
  { title: `today`, count: getTaskCount(tasks, checkFilterToday) },
  { title: `favorites`, count: getTaskCount(tasks, checkFilterFavorites) },
  { title: `repeating`, count: getTaskCount(tasks, checkFilterRepeating) },
  { title: `tags`, count: getTaskCount(tasks, checkFilterTags) },
  { title: `archive`, count: getTaskCount(tasks, checkFilterArchive) },
];

const menuElements = [
  { name: `new-task` },
  { name: `task`, isChecked: true },
  { name: `statistic` },
];

export const Mock = {
  load: getTasks,
  filters: getFiltersData,
  menu: menuElements,
};
