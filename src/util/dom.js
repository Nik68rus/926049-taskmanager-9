export const Position = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.children.length === 1 ? newElement.firstChild : [...newElement.children];
};

export const render = (container, elements, place) => {
  switch (place) {
    case Position.AFTERBEGIN:
      if (elements.length > 1) {
        elements.forEach((element) => container.prepend(element));
      } else {
        container.prepend(elements);
      }
      break;
    case Position.BEFOREEND:
      if (elements.length > 1) {
        elements.forEach((element) => container.appendChild(element));
      } else {
        container.appendChild(elements);
      }
      break;
  }
};

export const unrender = (element) => {
  if (element) {
    element.remove();
  }
};

export const makeMarkupGenerator = (generator, separator = `\n`) =>
  (markups) => markups.map(generator).join(separator);
