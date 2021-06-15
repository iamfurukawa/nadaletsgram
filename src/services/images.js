const ImageService = () => {
  const getAll = () => {
    const importAll = r => r.keys().map(r)
    const files = importAll(require.context('../static/imgs/', true, /\.*$/))
    return files
  }

  return {
    getAll
  }
}

export default ImageService()