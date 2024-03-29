import _ from 'lodash'
import moment from 'moment'

import Container from '@mui/material/Container'

import DefaultLayout from '../../layouts/DefaultLayout'
import SecondaryStage from '@/components/SecondaryStage'
import BlogPostListItem from '@/components/BlogPostListItem'
import traverseDirectory from '../../lib/traverseDirectory'
import { BodyText } from '@/components/BodyText'

const Blog = ({ meta, blogPosts = [] }) => {
  return (
    <DefaultLayout meta={meta}>
      <SecondaryStage claim="Der Datenguide hilft dir dabei, dich im Dschungel der Statistiken zurecht zu finden." />
      <Container>
        <BodyText>
          <h1>Aktuelles</h1>
          {blogPosts.map((blogPost) => (
            <BlogPostListItem {...blogPost} key={blogPost.href} />
          ))}
        </BodyText>
      </Container>
    </DefaultLayout>
  )
}

export const getStaticProps = async () => {
  const blogPages = await traverseDirectory('blog', true)

  const blogPosts = blogPages.map((page) => ({
    href: page.path,
    title: page.frontmatter.title,
    description: page.frontmatter.description,
    date: page.frontmatter.date,
    published: page.frontmatter.published,
  }))

  const publishedBlogPosts = _.orderBy(
    blogPosts,
    (post) => moment(post.date).format('YYYYMMDD'),
    ['desc']
  )
    .map((post) => ({
      ...post,
      date: moment(post.date).format('DD.MM.YYYY'),
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
