const path = require('path')
const withFonts = require('next-fonts')
const withCSS = require('@zeit/next-css')
const withImages = require('next-images')
const withMDX = require('./lib/mdx/withMdx')
const Dotenv = require('dotenv-webpack')

require('dotenv').config()

module.exports = withCSS(
  withMDX()(
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
