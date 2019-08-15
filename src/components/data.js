const tagList = [`homework`, `theory`, `practice`, `intensive`, `keks`];

export const getTask = () => ({
  description: [
    `Изучить теорию`,
    `Сделать домашку`,
    `Пройти интенсив на соточку`][Math.floor(Math.random() * 3)],
  dueDate: Date.now() + (Math.floor(Math.random() * 7) - Math.floor(Math.random() * 7)) * 24 * 60 * 60 * 1000 - Math.floor(Math.random() * 24) * Math.floor(Math.random() * 60) * 60 * 1000,
  repeatingDays: {
    'mo': false,
    'tu': false,
    'we': Boolean(Math.round(Math.random())),
    'th': false,
    'fr': false,
    'sa': false,
    'su': false,
  },
  tags: new Set([
    tagList[Math.floor(Math.random() * 5)],
    tagList[Math.floor(Math.random() * 5)],
    tagList[Math.floor(Math.random() * 5)],
  ]),
  color: [
    `black`,
    `yellow`,
    `blue`,
    `green`,
    `pink`,
  ][Math.floor(Math.random() * 5)],
  isFavorite: Boolean(Math.round(Math.random())),
  isArchive: Boolean(Math.round(Math.random())),
});
