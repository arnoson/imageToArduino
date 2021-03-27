import { setBit, uint8ToString } from './utils'

export interface ArduinoBitmapOptions {
  threshold?: number
}

export class ArduinoBitmap {
  width: number
  height: number
  bits: Array<boolean>

  constructor(imageData: ImageData, options: ArduinoBitmapOptions = {}) {
    this.width = imageData.width
    this.height = imageData.height
    this.bits = ArduinoBitmap.imageToBitmap(imageData, options.threshold)
  }

  toCode({ name }) {
    return `const uint8_t ${name}[] PROGMEM = ${uint8ToString(
      ArduinoBitmap.bitmapToUint8(this)
    )};\n`
  }

  static imageToBitmap(imageData: ImageData, threshold = 128) {
    const { data } = imageData
    const pixels: Array<boolean> = []

    for (let i = 0; i < data.length; i += 4) {
      const average = (data[i] + data[i + 1] + data[i + 2]) / 3
      const value = average > threshold
      pixels.push(value)
    }

    return pixels
  }

  static bitmapToUint8(image: ArduinoBitmap) {
    const { bits, width, height } = image

    const bytesPerRow = Math.ceil(width / 8)
    const bytesCount = height * bytesPerRow

    const bytes = new Uint8Array(bytesCount)
    bytes.fill(0)

    for (let row = 0; row < height; row++) {
      let byteIndex = row * bytesPerRow
      let bitIndex = 7
      for (let column = 0; column < width; column++) {
        if (bitIndex < 0) {
          byteIndex++
          bitIndex = 7
        }
        setBit(bytes, byteIndex, bitIndex, bits[row * width + column])
        bitIndex--
      }
    }

    return bytes
  }
}
