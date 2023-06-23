// next.config.js

import slug from 'remark-slug'
// import rehypePrism from '@mapbox/rehype-prism'
// import generateToc from './src/lib/mdx/generateToc'
// import authorMeta  from './src/authors.json'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'

import nextMdx from '@next/mdx'

const withMDX = nextMdx({
    extension: /\.mdx?$/,
    options: {
        // If you use remark-gfm, you'll need to use next.config.mjs
        // as the package is ESM only
        // https://github.com/remarkjs/remark-gfm#install
        remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
        rehypePlugins: [],
        // extendFrontMatter: {
        //     process: (mdxContent, frontMatter) => {
        //         if (frontMatter.layout === 'DocsPage') {
        //             return {
        //                 authorMeta,
        //                 tableOfContents: generateToc(mdxContent),
        //             }
        //         }
        //         return { authorMeta }
        //     },
        //     phase: 'both',
        // },
        // If you use `MDXProvider`, uncomment the following line.
        // providerImportSource: "@mdx-js/react",
    },
})

/** @type {import('next').NextConfig} */
const nextConfig = {
    // Configure pageExtensions to include md and mdx
    pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
    // Optionally, add any other Next.js config below
    reactStrictMode: true,
}

// Merge MDX config with Next.js config
export default withMDX(nextConfig)
