//export const getMarkup = (dataList, generator) => dataList.map(generator).join(`\n`);

export const makeMarkupGenerator = (generator, separator = `\n`) =>
  (markups) => markups.map(generator).join(separator);
