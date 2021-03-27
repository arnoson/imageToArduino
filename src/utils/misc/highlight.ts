const tokenMarkup = (token: string, content: string) =>
  `<span class="token ${token}">${content}</span>`

const tokens = {
  keyword: /(const|true|false|PROGMEM)/g,
  type: /(uint8_t|GFXAnimation)/g,
  punctuation: /({|}|\(|\)| \[|\]|,|;)/g,
  hex: /(0x[0-9a-z]+)/g,
  number: /(\s(\d+))/g,
}

export const highlight = (string: string) => {
  for (const [token, regExp] of Object.entries(tokens)) {
    string = string.replaceAll(regExp, (_: string, p: string) =>
      tokenMarkup(token, p)
    )
  }
  return string
}
