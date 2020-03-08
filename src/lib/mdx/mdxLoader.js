const { getOptions } = require('loader-utils')
const images = require('remark-images')
const slug = require('remark-slug')
const mdx = require('@mdx-js/mdx')
const mdxTableOfContents = require('mdx-table-of-contents')
const mdxExportJSONByDefault = require('mdx-constant')
const grayMatter = require('gray-matter')

module.exports = async function(source) {
  let result
  const { data, content } = grayMatter(source)
  const callback = this.async()
  const options = Object.assign(
    {
      remarkPlugins: [slug, images],
      rehypePlugins: [],
      compilers: [
        mdxTableOfContents,
        mdxExportJSONByDefault('frontmatter', data)
      ]
    },
    getOptions(this),
    { filepath: this.resourcePath }
  )

  try {
    result = await mdx(content, options)
  } catch (err) {
    return callback(err)
  }

  const code = `
import React from 'react'
import { mdx } from '@mdx-js/react'
${result}
`

  return callback(null, code)
}
