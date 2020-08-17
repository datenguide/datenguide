import _ from 'lodash'
import moment from 'moment'

import { makeStyles } from '@material-ui/styles'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'

import DefaultLayout from '../../layouts/DefaultLayout'
import BlogPostFeaturedItem from '../../components/BlogPostFeaturedItem'
import traverseDirectory from '../../lib/traverseDirectory'
import BodyText from '../../components/BodyText'

const useStyles = makeStyles((theme) => ({
  title: {
    ...theme.typography.h1,
    margin: theme.spacing(10, 0, 6, 0),
  },
}))

const Blog = ({ meta, blogPosts = [] }) => {
  const classes = useStyles()
  const [featuredPost, ...posts] = blogPosts
  return (
    <DefaultLayout meta={meta}>
      <Container>
        <BodyText>
          <h1 className={classes.title}>Statistik erklärt</h1>
          <Grid container spacing={3}>
            <Grid item xs={8}>
              <BlogPostFeaturedItem {...featuredPost} />
            </Grid>
            {posts.map((post) => (
              <Grid key={post.href} item xs={4}>
                <BlogPostFeaturedItem {...post} />
              </Grid>
            ))}
          </Grid>
        </BodyText>
      </Container>
    </DefaultLayout>
  )
}

export const getStaticProps = async () => {
  const blogPages = await traverseDirectory('statistik-erklaert', true)

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
