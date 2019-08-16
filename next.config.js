const path = require('path')

const withMDX = require('@zeit/next-mdx')({
  extension: /\.md?$/
})

module.exports = withMDX({
  pageExtensions: ['js', 'jsx', 'mdx', 'md'],
  webpack(config, options) {
    config.module.rules.push({
      test: /\.md?$/,
      use: [path.join(__dirname, './lib/frontmatter-loader')]
    })
    return config
  }
})
