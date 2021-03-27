import { replaceTabsWithSpaces } from '../index'

export const indent = (string: string, mode: 'spaces' | 'tabs', spaces = 2) =>
  // The input string already as tabs so we don't have to anything.
  mode === 'tabs' ? string : replaceTabsWithSpaces(string, spaces)
