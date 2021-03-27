export function setBit(
  buffer: Uint8Array,
  byteIndex: number,
  bitIndex: number,
  value: boolean
) {
  if (value) {
    buffer[byteIndex] &= ~(1 << bitIndex)
  } else {
    buffer[byteIndex] |= 1 << bitIndex
  }
}
