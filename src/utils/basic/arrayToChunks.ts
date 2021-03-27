export const arrayToChunks = (
  array: Array<any>,
  size: number
): Array<Array<any>> =>
  array.length > size
    ? [array.slice(0, size), ...arrayToChunks(array.slice(size), size)]
    : [array]
