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

const getFilterMarkup = ({ title, count = 0, isChecked = false }) => {
  const id = title.toLowerCase();
  return `
  <input
    type="radio"
    id="filter__${id}"
    class="filter__input visually-hidden"
    name="filter"
    ${isChecked ? `checked` : ``}
  />
  <label for="filter__all" class="filter__label">
    ${title} <span class="filter__${id}-count">${count}</span></label
  >
  `.trim();
};

export const getFiltersMarkup = (filters) => {
  return (`
    <section class="main__filter filter container">
      ${filters.map((filter) => getFilterMarkup(filter)).join(`\n`)}
    </section>
  `);
};
