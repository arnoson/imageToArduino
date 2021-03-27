import { ArduinoAnimationFrame } from './ArduinoAnimationFrame'
import { isValidIdentifier } from './utils'

export interface AnimationOptions {
  loop?: boolean
  backAndForth?: boolean
}

export class ArduinoAnimation {
  duration: number
  loop: boolean
  backAndForth: boolean

  constructor(
    public name: string,
    public frames: Array<ArduinoAnimationFrame>,
    { loop = true, backAndForth = false }: AnimationOptions = {}
  ) {
    this.loop = loop

    if (!isValidIdentifier(name)) {
      throw new Error(`Name '${name}' is not a valid identifier.`)
    }

    let time = 0
    for (const [index, frame] of frames.entries()) {
      frame.animation = this
      frame.time = time
      frame.index = index

      time += frame.delay
    }

    if (backAndForth) {
      const doubleFrames = [
        ...frames
          .slice(1, -1)
          .reverse()
          .map((frame) => frame.clone()),
      ]

      frames.push(...doubleFrames)

      for (const frame of doubleFrames) {
        frame.time = time
        time += frame.delay
      }
    }

    this.duration = time
  }

  toCode() {
    const { name, frames, duration, loop } = this

    const bitmapsCode = frames
      .filter(({ isClone }) => !isClone)
      .map((frame) => frame.toBitmapCode())
      .join('\n')

    const framesCode = frames
      .map((frame) => '\t\t' + frame.toCode())
      .join(',\n')

    return `${bitmapsCode}
GFXAnimation ${name} = {
\t{
${framesCode}
\t},
\t${frames.length},
\t${duration},
\t${loop ? 'true' : 'false'}
};\n`
  }
}
