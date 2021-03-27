import { ArduinoAnimation } from './ArduinoAnimation'
import { ArduinoBitmap } from './ArduinoBitmap'

export class ArduinoAnimationFrame {
  animation: ArduinoAnimation
  time: number
  index: number
  isClone: boolean

  constructor(
    public bitmap: ArduinoBitmap,
    public size: { width: number; height: number },
    public offset: { top: number; left: number },
    public delay: number
  ) {}

  clone() {
    const clone = new ArduinoAnimationFrame(
      this.bitmap,
      this.size,
      this.offset,
      this.delay
    )
    clone.isClone = true
    Object.assign(clone, this)
    return clone
  }

  get bitmapName() {
    return `${this.animation.name}Bitmap${this.index}`
  }

  toBitmapCode() {
    return this.bitmap.toCode({ name: this.bitmapName })
  }

  toCode() {
    const { offset, size } = this
    return `{ (uint8_t *)${this.bitmapName}, ${offset.top}, ${offset.left}, ${size.width}, ${size.height}, ${this.time} }`
  }
}
