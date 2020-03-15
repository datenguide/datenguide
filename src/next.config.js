const path = require('path')
const withFonts = require('next-fonts')
const withImages = require('next-images')
const withMdxEnhanced = require('next-mdx-enhanced')

const slug = require('remark-slug')
const rehypePrism = require('@mapbox/rehype-prism')
const generateToc = require('./lib/mdx/generateToc')
const Dotenv = require('dotenv-webpack')

require('dotenv').config()

module.exports = withImages(
  withFonts(
    withMdxEnhanced({
      layoutPath: 'layouts/mdx',
      defaultLayout: false,
      fileExtensions: ['mdx'],
      remarkPlugins: [slug],
      rehypePlugins: [rehypePrism],
      extendFrontMatter: {
        process: (mdxContent, frontMatter) => {
          if (frontMatter.layout === 'DocsPage') {
            return {
              tableOfContents: generateToc(mdxContent)
            }
          }
          return {}
        },
        phase: 'both'
      }
    })({
      pageExtensions: ['js', 'jsx', 'mdx', 'md'],
      webpack(config, options) {
        config.plugins = [
          ...config.plugins,
          new Dotenv({
            path: path.join(__dirname, '..', '.env'),
            systemvars: true
          })
        ]
        const mdxLoaders = config.module.rules.find(
          rule => rule.test && '.mdx'.match(rule.test)
        )
        mdxLoaders.use.push({
          loader: path.join(__dirname, './lib/mdx/mdxPreLoader')
        })

        return config
      }
    })
  )
)
