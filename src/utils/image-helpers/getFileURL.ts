export const getFileURL = async (file: File) => {
  const response = new Response(file)
  const blob = await response.blob()
  return URL.createObjectURL(blob)
}
