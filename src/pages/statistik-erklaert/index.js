import _ from 'lodash'
import moment from 'moment'

import { makeStyles, useTheme } from '@material-ui/styles'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'

import DefaultLayout from '../../layouts/DefaultLayout'
import BlogPostFeaturedItem from '../../components/BlogPostFeaturedItem'
import traverseDirectory from '../../lib/traverseDirectory'
import Funders from '../../components/Funders'

const useStyles = makeStyles((theme) => ({
  title: {
    ...theme.typography.h1,
    margin: theme.spacing(10, 0, 6, 0),
  },

  container: {
    marginBottom: theme.spacing(4),
  },
}))

const Blog = ({ meta, blogPosts = [] }) => {
  const classes = useStyles()
  const theme = useTheme()
  const [primaryFeature, secondaryFeature, ...posts] = blogPosts
  return (
    <DefaultLayout meta={meta}>
      <Container>
        <h1 className={classes.title}>Statistik erklärt</h1>
        <Grid className={classes.container} container spacing={3}>
          <Grid item xs={8}>
            <BlogPostFeaturedItem {...primaryFeature} />
          </Grid>
          <Grid item xs={4}>
            <BlogPostFeaturedItem
              {...secondaryFeature}
              background={theme.palette.info.main}
            />
          </Grid>
          {posts.map((post) => (
            <Grid key={post.href} item xs={4}>
              <BlogPostFeaturedItem {...post} />
            </Grid>
          ))}
        </Grid>
        <Funders />
      </Container>
    </DefaultLayout>
  )
}

export const getStaticProps = async () => {
  const blogPages = await traverseDirectory('statistik-erklaert', true)

  const blogPosts = blogPages.map(({ path, frontmatter }) => {
    const { title, description, published, date, previewImage } = frontmatter
    return {
      href: path,
      title,
      description,
      published,
      image: previewImage || null,
      date: moment(date).format('YYYY-MM-DD'),
    }
  })

  const publishedBlogPosts = _.orderBy(blogPosts, ({ date }) => date, ['desc'])
    .map((post) => ({ ...post }))
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
