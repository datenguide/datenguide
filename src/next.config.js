const path = require('path')
const withFonts = require('next-fonts')
const withMDX = require('@zeit/next-mdx')({
  extension: /\.mdx?$/
})

module.exports = withMDX(
  withFonts({
    pageExtensions: ['js', 'jsx', 'mdx', 'md'],
    webpack(config, options) {
      config.module.rules.push({
        test: /\.mdx?$/,
        use: [path.join(__dirname, './lib/frontmatter-loader')]
      })
      return config
    }
  })
)
