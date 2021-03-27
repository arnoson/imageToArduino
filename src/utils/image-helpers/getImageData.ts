export const getImageData = (image: HTMLImageElement) => {
  const { width, height } = image

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height

  const context = canvas.getContext('2d')
  context.drawImage(image, 0, 0)

  return context.getImageData(0, 0, width, height)
}
