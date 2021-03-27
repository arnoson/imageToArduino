import { parseGIF, decompressFrames } from 'gifuct-js'
import { ArduinoAnimationFrame } from './ArduinoAnimationFrame'
import { ArduinoBitmap } from './ArduinoBitmap'

export const gifToFrames = async (
  input: Response
): Promise<Array<ArduinoAnimationFrame>> => {
  const buffer = await input.arrayBuffer()
  const gif = parseGIF(buffer)

  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  let imageData: ImageData

  const frames = decompressFrames(gif, true)
  return frames.map(({ patch, delay, dims: { width, height, top, left } }) => {
    // Initialize `imageData`, or re-initialize as frames in a gif can have
    // different dimensions.
    if (!imageData || width != imageData.width || height != imageData.height) {
      canvas.width = width
      canvas.height = height
      imageData = context.createImageData(width, height)
    }
    imageData.data.set(patch)

    return new ArduinoAnimationFrame(
      new ArduinoBitmap(imageData),
      { width, height },
      { top, left },
      delay
    )
  })
}
