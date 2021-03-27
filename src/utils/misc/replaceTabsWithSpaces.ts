export const replaceTabsWithSpaces = (string: string, spaces = 2) =>
  string.replaceAll('\t', ' '.repeat(spaces))
