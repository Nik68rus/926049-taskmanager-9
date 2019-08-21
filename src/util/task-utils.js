export const checkDeadline = (date) =>
  Date.now() < date ? `` : `card--deadline`;

export const checkRepeat = (days) =>
  Object.keys(days).some((day) => days[day]) ? `card--repeat` : ``;
