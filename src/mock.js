import {TAGS, MAX_TAGS_NUMBER, DESCRIPTIONS, TASK_DAY, Time, COLORS, TASK_NUM} from './constants';

const getRandomBool = (chance = 0.5) =>
  Math.random() > chance;

const getRandomItem = (array) =>
  array[Math.floor(Math.random() * array.length)];

const getRandomNumber = (min = 0, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const weekDays = Object.values(TASK_DAY);

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
  isArchive: getRandomBool(),
});

const getTasks = (num = TASK_NUM) =>
  Array.from({length: num}, getTask);
export const Mock = {
  load: getTasks,
};
