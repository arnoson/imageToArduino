export const isValidIdentifier = (string: string) =>
  /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(string)
