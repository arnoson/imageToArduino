import {
  loadImage,
  getImageData,
  getFileURL,
  indent,
  isValidIdentifier,
} from './utils'
import { ArduinoBitmap } from './ArduinoBitmap'

export type ImageInput = string | File | ImageData

export interface ImageOptions {
  indentMode?: 'tabs' | 'spaces'
  spaces?: number
}

export const imageToArduino = async (
  input: ImageInput,
  name: string,
  { indentMode = 'spaces', spaces = 2 }: ImageOptions = {}
) => {
  if (!isValidIdentifier(name)) {
    throw new Error(`Name '${name}' is not a valid identifier.`)
  }

  if (input instanceof ImageData) {
    return new ArduinoBitmap(input).toCode({ name })
  }

  const url = input instanceof File ? await getFileURL(input) : input
  const image = await loadImage(url)
  const code = new ArduinoBitmap(getImageData(image)).toCode({ name })

  return indent(code, indentMode, spaces)
}
