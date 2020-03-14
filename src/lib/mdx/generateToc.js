const unified = require('unified')
const markdown = require('remark-parse')
const toc = require('mdast-util-toc')

const remarkProcessor = unified().use(markdown, { commonmark: true })

const convertMdAstTocListItem = mdAstListItem =>
  mdAstListItem.children.reduce((acc, current) => {
    if (current.type === 'paragraph') {
      acc.url = current.children[0].url
      acc.title = current.children[0].children[0].value
    } else if (current.type === 'list') {
      acc.children = convertMdAstTocList(current)
    }
    return acc
  }, {})

const convertMdAstTocList = mdAstList => {
  return mdAstList.children.map(child => {
    return convertMdAstTocListItem(child)
  })
}

const generateToc = mdxContent => {
  const mdAstToc = toc(remarkProcessor.parse(mdxContent))
  return mdAstToc.map && convertMdAstTocList(mdAstToc.map)
}

module.exports = generateToc
