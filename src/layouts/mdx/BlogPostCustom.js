import moment from 'moment'

import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'

import Base from '../Base'
import HeaderToolbar from '../../components/HeaderToolbar'
import Footer from '../../components/Footer'
import BlogHeader from '../../components/BlogHeader'

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(2, 0, 30, 0),
  },
  metaInfo: {
    color: theme.palette.grey[500],
    fontWeight: 'bold',
  },
}))

const BlogPost = (frontMatter) => ({ children }) => {
  const classes = useStyles()

  return (
    <Base meta={frontMatter}>
      <AppBar position="fixed">
        <HeaderToolbar />
      </AppBar>
      <BlogHeader
        title={frontMatter.title}
        description={frontMatter.description}
      />
      <div className={classes.content}>
        <Container maxWidth="lg">
          <div className={classes.metaInfo}>
            {moment(frontMatter.date).format('DD.MM.YYYY')} -{' '}
            {frontMatter.author}
          </div>
        </Container>
        {children}
      </div>
      <Footer />
    </Base>
  )
}

export default BlogPost
