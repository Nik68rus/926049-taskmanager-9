import {TaskDay, Time} from './constants';

const TASK_NUM = 22;
const MAX_TAGS_NUMBER = 3;
const TAGS = [`homework`, `theory`, `practice`, `intensive`, `keks`];
const DESCRIPTIONS = [
  `Изучить теорию`,
  `Сделать домашку`,
  `Пройти интенсив на соточку`,
];

export const TASK_LOAD_NUMB = 8;

export const COLORS = [
  `black`,
  `yellow`,
  `blue`,
  `green`,
  `pink`,
];

const getRandomBool = (chance = 0.5) =>
  Math.random() > chance;

const getRandomItem = (array) =>
  array[Math.floor(Math.random() * array.length)];

const getRandomNumber = (min = 0, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const weekDays = Object.values(TaskDay);

const repeatDayReducer = (days, day) => {
  days[day] = getRandomBool(0.9);
  return days;
};

const getRepeatingDays = (days) =>
  days.reduce(repeatDayReducer, {});

const getRandomSorting = () => Math.random() - 0.5;

const getRandomTags = ([...tags], num = MAX_TAGS_NUMBER) =>
  tags.sort(getRandomSorting).slice(0, num);

const getTask = () => ({
  description: getRandomItem(DESCRIPTIONS),
  dueDate: Date.now() + getRandomNumber(-Time.WEEK, Time.WEEK),
  repeatingDays: getRepeatingDays(weekDays),
  tags: getRandomTags(TAGS, getRandomNumber(0, 3)),
  color: getRandomItem(COLORS),
  isFavorite: getRandomBool(),
  isArchive: true,
});

const getTasks = (num = TASK_NUM) =>
  Array.from({length: num}, getTask);
export const Mock = {
  load: getTasks,
};
