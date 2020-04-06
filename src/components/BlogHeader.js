import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#c3e5f1',
    minHeight: '200px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    [theme.breakpoints.up('sm')]: {
      minHeight: theme.spacing(32),
    },
    [theme.breakpoints.up('md')]: {},
  },
  content: {
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '60%',
    },
  },

  title: {
    fontSize: theme.typography.h5.fontSize,
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.typography.h4.fontSize,
    },
  },

  description: {
    fontSize: theme.typography.subtitle1.fontSize,
    fontWeight: 'regular',
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.typography.h5.fontSize,
    },
  },
  metaInfo: {
    fontSize: theme.typography.subtitle1.fontSize,
  },
}))

const BlogHeader = ({ title, description }) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Container maxWidth="lg">
        <div className={classes.content}>
          <h1 className={classes.title}>{title}</h1>
          <h2 className={classes.description}>{description}</h2>
        </div>
      </Container>
    </div>
  )
}

export default BlogHeader
