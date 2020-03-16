module.exports = async function(source) {
  const callback = this.async()

  // replace markdown image link with img tag and require image
  const sourceWithImages = source.replace(
    /!\[([^\])]*)\]\((.*?)\)/g,
    "<img alt='$1' className=\"contentImage\" srcSet={require('$2?resize&sizes[]=320&sizes[]=600&sizes[]=960&sizes[]=1280').srcSet} src={require('$2')} />"
  )
  return callback(null, sourceWithImages)
}
