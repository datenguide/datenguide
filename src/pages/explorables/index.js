import _ from 'lodash'
import moment from 'moment'

import Container from '@material-ui/core/Container'

import DefaultLayout from '../../layouts/DefaultLayout'
import SecondaryStage from '../../components/SecondaryStage'
import BlogPostListItem from '../../components/BlogPostListItem'
import traverseDirectory from '../../lib/traverseDirectory'
import BodyText from '../../components/BodyText'

const Blog = ({ meta, blogPosts = [] }) => {
  return (
    <DefaultLayout meta={meta}>
      <SecondaryStage claim="Statistik erklärt - Explorable Explanations" />
      <Container>
        <BodyText>
          <h1>Statistik Erklärt</h1>
          {blogPosts.map((blogPost) => (
            <BlogPostListItem {...blogPost} key={blogPost.href} />
          ))}
        </BodyText>
      </Container>
    </DefaultLayout>
  )
}

export const getStaticProps = async () => {
  const blogPages = await traverseDirectory('explorables', true)

  const blogPosts = blogPages.map((page) => ({
    href: page.path,
    title: page.frontmatter.title,
    description: page.frontmatter.description,
    published: page.frontmatter.published,
  }))

  const publishedBlogPosts = _.orderBy(
    blogPosts,
    (post) => moment(post.date).format('YYYYMMDD'),
    ['desc']
  )
    .map((post) => ({
      ...post,
    }))
    .filter((post) => post.published)

  return {
    props: {
      meta: {
        title: 'Blog',
      },
      blogPosts: publishedBlogPosts,
    },
  }
}

export default Blog
