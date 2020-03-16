module.exports = async function(source) {
  const callback = this.async()

  // replace markdown image link with img tag and require image
  const sourceWithImages = source.replace(
    /!\[([^\])]*)\]\((.*?)\)/g,
    "<img alt='$1' class=\"contentImage\" src={require('$2')} />"
  )
  return callback(null, sourceWithImages)
}
