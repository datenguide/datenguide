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
  },

  content: {
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '80%',
    },
    margin: theme.spacing(10, 0),
  },

  title: {
    ...theme.typography.h2,
    marginBottom: 0,
    color: theme.palette.secondary.dark,

    [theme.breakpoints.up('md')]: {
      ...theme.typography.h1,
    },
  },

  description: {
    fontSize: theme.typography.subtitle1.fontSize,
    fontWeight: 'regular',
    margin: theme.spacing(2, 0),

    // [theme.breakpoints.up('sm')]: {
    //   fontSize: theme.typography.h5.fontSize,
    // },
  },
  metaInfo: {
    fontSize: theme.typography.subtitle1.fontSize,
  },
}))

const BlogHeader = ({ title, description }) => {
  const classes = useStyles()
  return (
    <header className={classes.root}>
      <Container maxWidth="lg">
        <div className={classes.content}>
          <h1 className={classes.title}>{title}</h1>
          <p className={classes.description}>{description}</p>
        </div>
      </Container>
    </header>
  )
}

export default BlogHeader
