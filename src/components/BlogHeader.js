import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Avatar from '@material-ui/core/Avatar'

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
    padding: theme.spacing(6, 0),

    [theme.breakpoints.up('md')]: {
      width: '80%',
    },
  },

  title: {
    ...theme.typography.h2,
    margin: 0,
    color: theme.palette.secondary.dark,

    [theme.breakpoints.up('md')]: {
      marginTop: theme.spacing(6),
      ...theme.typography.h1,
    },
  },

  description: {
    fontSize: theme.typography.subtitle1.fontSize,
    fontWeight: 'regular',
    margin: theme.spacing(2, 0),
  },

  authors: {
    display: 'inline-block',

    [theme.breakpoints.up('sm')]: {
      display: 'flex',
    },
  },

  author: {
    display: 'flex',
    padding: theme.spacing(4, 4, 0, 0),

    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(8, 8, 0, 0),
    },
  },

  authorName: {
    display: 'block',
    color: theme.palette.secondary.dark,
  },

  authorAvatar: {
    width: 50,
    height: 50,
  },

  authorMeta: {
    paddingLeft: theme.spacing(1),
  },

  authorTwitter: {
    color: theme.palette.grey[600],
    textDecoration: 'none',
  },
}))

const renderAuthors = (authors) => {
  const classes = useStyles()
  return (
    <div className={classes.authors}>
      {authors.map(({ name, image, twitter }) => (
        <div key={name} className={classes.author}>
          <Avatar alt="" src={image} className={classes.authorAvatar} />
          <div className={classes.authorMeta}>
            <b className={classes.authorName}>{name}</b>
            <a
              href={`https://twitter.com/${twitter}/`}
              className={classes.authorTwitter}
              target="_blank"
              rel="noopener noreferrer"
            >
              {twitter}
            </a>
          </div>
        </div>
      ))}
    </div>
  )
}

const BlogHeader = ({ title, description, authors }) => {
  const classes = useStyles()
  return (
    <header className={classes.root}>
      <Container maxWidth="lg">
        <div className={classes.content}>
          <h1 className={classes.title}>{title}</h1>
          <p className={classes.description}>{description}</p>
          {authors && authors.length && renderAuthors(authors)}
        </div>
      </Container>
    </header>
  )
}

export default BlogHeader
