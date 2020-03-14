import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#c3e5f1',
    minHeight: theme.spacing(25),
    fontSize: theme.typography.body1.fontSize,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    [theme.breakpoints.up('sm')]: {
      minHeight: theme.spacing(32)
    },
    [theme.breakpoints.up('md')]: {}
  },
  content: {
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '60%'
    }
  },

  title: {
    fontSize: '1.3rem',
    [theme.breakpoints.up('sm')]: {
      fontSize: '2rem'
    }
  },

  description: {
    fontSize: '1rem',
    fontWeight: 'regular',
    [theme.breakpoints.up('sm')]: {
      fontSize: '1.3rem'
    }
  }
}))

const BlogHeader = ({ title, description }) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Container maxWidth="md">
        <div className={classes.content}>
          <h1 className={classes.title}>{title}</h1>
          <h2 className={classes.description}>{description}</h2>
        </div>
      </Container>
    </div>
  )
}

export default BlogHeader
