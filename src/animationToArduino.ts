import { ArduinoAnimation } from './ArduinoAnimation'
import { ArduinoAnimationFrame } from './ArduinoAnimationFrame'
import { gifToFrames } from './gifToFrames'
import { indent } from './utils'

type Input = string | File | Array<ArduinoAnimationFrame>

export interface AnimationOptions {
  loop?: boolean
  backAndForth?: boolean
  indentMode?: 'tabs' | 'spaces'
  spaces?: number
}

export const animationToArduino = async (
  input: Input,
  name: string,
  {
    loop = true,
    backAndForth = false,
    indentMode = 'spaces',
    spaces = 2,
  }: AnimationOptions = {}
) => {
  const frames =
    input instanceof File
      ? await gifToFrames(new Response(input))
      : typeof input === 'string'
      ? await gifToFrames(await fetch(input))
      : input

  const animation = new ArduinoAnimation(name, frames, {
    loop,
    backAndForth,
  })

  return indent(animation.toCode(), indentMode, spaces)
}
