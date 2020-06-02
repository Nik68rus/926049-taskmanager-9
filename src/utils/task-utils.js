export const checkRepeat = (days) =>
  Object.keys(days).some((day) => days[day]) ? `card--repeat` : ``;

export const checkDeadline = (date) => Date.now() < date ? `` : `card--deadline`;
