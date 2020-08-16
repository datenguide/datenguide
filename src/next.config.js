const path = require('path')
const Dotenv = require('dotenv-webpack')

const withPlugins = require('next-compose-plugins')
const fonts = require('next-fonts')
const mdxEnhanced = require('next-mdx-enhanced')
const optimizedImages = require('next-optimized-images')

const slug = require('remark-slug')
const rehypePrism = require('@mapbox/rehype-prism')
const generateToc = require('./lib/mdx/generateToc')
const authorMeta = require('./authors.json')

require('dotenv').config()

module.exports = withPlugins(
  [
    mdxEnhanced({
      layoutPath: 'layouts/mdx',
      defaultLayout: false,
      fileExtensions: ['mdx'],
      remarkPlugins: [slug],
      rehypePlugins: [rehypePrism],
      extendFrontMatter: {
        process: (mdxContent, frontMatter) => {
          if (frontMatter.layout === 'DocsPage') {
            return {
              authorMeta,
              tableOfContents: generateToc(mdxContent),
            }
          }
          return { authorMeta }
        },
        phase: 'both',
      },
    }),
    optimizedImages,
    fonts,
  ],
  {
    pageExtensions: ['js', 'jsx', 'mdx', 'md'],
    // make env variables available at runtime
    publicRuntimeConfig: {
      datenguideApiUrl: process.env.NEXT_PUBLIC_DATENGUIDE_API,
      tabularApiUrl: process.env.NEXT_PUBLIC_TABULAR_API,
      mapboxToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
    },
    webpack(config) {
      config.plugins = [
        ...config.plugins,
        new Dotenv({
          path: path.join(__dirname, '..', '.env'),
          systemvars: true,
        }),
      ]
      const mdxLoaders = config.module.rules.find(
        (rule) => rule.test && '.mdx'.match(rule.test)
      )
      mdxLoaders.use.push({
        loader: path.join(__dirname, './lib/mdx/mdxPreLoader'),
      })

      return config
    },
  }
)
