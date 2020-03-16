import path from 'path'
import fs from 'fs'
import matter from 'gray-matter'

const readdirSync = fs.readdirSync

const FILE_EXTENSIONS = ['.mdx']
const ROOT_PATH = path.resolve('src', 'pages')

const TYPE_DIRECTORY = 'directory'
const TYPE_PAGE = 'page'

const getResourcePath = (directory, filename = null) => {
  const resourceBasePath = `/${path.relative(ROOT_PATH, directory)}`
  if (filename) {
    const name = filename.split('.')[0]
    const resourceFilePath = name === 'index' ? '' : `/${name}`
    return `${resourceBasePath}${resourceFilePath}`
  }
  return resourceBasePath
}

const getFrontMatter = (directory, filename) => {
  const { data } = matter(fs.readFileSync(path.resolve(directory, filename)))
  return data
}

const traverseDirectory = directory =>
  readdirSync(directory, { withFileTypes: true }).reduce((acc, current) => {
    if (
      current.isFile() &&
      FILE_EXTENSIONS.includes(path.extname(current.name))
    ) {
      acc.push({
        name: current.name,
        type: TYPE_PAGE,
        path: getResourcePath(directory, current.name),
        frontmatter: getFrontMatter(directory, current.name)
      })
    }
    if (current.isDirectory()) {
      const subDirectoryPath = path.resolve(directory, current.name)
      acc.push({
        name: current.name,
        path: getResourcePath(subDirectoryPath),
        type: TYPE_DIRECTORY,
        children: traverseDirectory(subDirectoryPath)
      })
    }
    return acc
  }, [])

const flattenTree = pageInfoTree =>
  pageInfoTree.reduce((acc, curr) => {
    if (curr.children) {
      acc = acc.concat(flattenTree(curr.children))
    } else {
      acc.push(curr)
    }
    return acc
  }, [])

const collectPageInfo = (pagesDir, flatten = false) => {
  const result = traverseDirectory(path.resolve(ROOT_PATH, pagesDir))
  return flatten ? flattenTree(result) : result
}

export default collectPageInfo
