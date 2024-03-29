import { makeStyles } from '@mui/styles'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'

import BlogPostFeaturedItem from './BlogPostFeaturedItem'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4, 0),
    backgroundColor: theme.palette.grey[100],
  },
  cta: {
    margin: theme.spacing(3, 0),
  },
}))

const BlogPostTeasers = ({ children, posts }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Container>
        {children}
        <Grid container spacing={3}>
          {posts.map((post) => (
            <Grid key={post.href} item xs={12} md={4}>
              <BlogPostFeaturedItem {...post} />
            </Grid>
          ))}
        </Grid>
        <Button
          variant="outlined"
          size="large"
          color="secondary"
          className={classes.cta}
          href="/statistik-erklaert"
        >
          Weitere Artikel
        </Button>{' '}
      </Container>
    </div>
  )
}

export default BlogPostTeasers
