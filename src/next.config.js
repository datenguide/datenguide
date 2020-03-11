const path = require('path')
const withFonts = require('next-fonts')
const withCSS = require('@zeit/next-css')
const withImages = require('next-images')
const withMdxEnhanced = require('next-mdx-enhanced')

const slug = require('remark-slug')
const images = require('remark-images')
const normalizeHeadings = require('remark-normalize-headings')
const rehypePrism = require('@mapbox/rehype-prism')
const generateToc = require('./lib/mdx/generateToc')
const Dotenv = require('dotenv-webpack')

require('dotenv').config()

module.exports = withCSS(
  withMdxEnhanced({
    layoutPath: 'layouts',
    defaultLayout: false,
    fileExtensions: ['mdx'],
    remarkPlugins: [slug, images, normalizeHeadings],
    rehypePlugins: [rehypePrism],
    extendFrontMatter: {
      process: mdxContent => {
        return {
          tableOfContents: generateToc(mdxContent)
        }
      },
      phase: 'both'
    }
  })(
    withImages(
      withFonts({
        pageExtensions: ['js', 'jsx', 'mdx', 'md'],
        webpack(config, options) {
          config.plugins = [
            ...config.plugins,
            // Read the .env file
            new Dotenv({
              path: path.join(__dirname, '..', '.env'),
              systemvars: true
            })
          ]

          return config
        }
      })
    )
  )
)
