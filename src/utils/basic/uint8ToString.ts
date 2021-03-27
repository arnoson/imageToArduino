import { arrayToChunks } from './arrayToChunks'

export const uint8ToString = (buffer: Uint8Array) => {
  const hexStrings: Array<string> = []

  for (let i = 0; i < buffer.length; i++) {
    hexStrings.push('0x' + buffer[i].toString(16).padStart(2, '0'))
  }

  // 12 hex strings fit nicely into a 80 characters line with 2 or 4 spaces
  // indent.
  const hexStringsPerRow = 12
  const innerString = arrayToChunks(hexStrings, hexStringsPerRow)
    .map((row: Array<string>) => '\t' + row.join(', '))
    .join(',\n')

  return `{\n${innerString}\n}`
}
