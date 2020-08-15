import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Avatar from '@material-ui/core/Avatar'
import MastodonIcon from 'mdi-material-ui/Mastodon'
import GithubIcon from 'mdi-material-ui/Github'
import TwitterIcon from 'mdi-material-ui/Twitter'

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

  authorSocial: {
    display: 'inline',

    '& a': {
      color: theme.palette.grey[600],
      textDecoration: 'none',
    },

    '& a:hover': {
      textDecoration: 'underline',
    },

    '& svg': {
      fontSize: 18,
      marginLeft: 5,
      verticalAlign: 'middle',
    },
  },
}))

const renderAuthorSocial = ({ icon, text, href }) => (
  <a href={href} target="_blank" rel="noopener noreferrer">
    {text}
    {icon}
  </a>
)

const renderAuthors = (authors) => {
  const classes = useStyles()
  return (
    <div className={classes.authors}>
      {authors.map(({ name, image, social = {} }) => (
        <div key={name} className={classes.author}>
          <Avatar alt="" src={image} className={classes.authorAvatar} />
          <div className={classes.authorMeta}>
            <b className={classes.authorName}>{name}</b>
            <div className={classes.authorSocial}>
              {social.twitter &&
                renderAuthorSocial({
                  icon: <TwitterIcon />,
                  text: `@${social.twitter}`,
                  href: `https://twitter.com/${social.twitter}/`,
                })}
              {social.github &&
                renderAuthorSocial({
                  icon: <GithubIcon />,
                  href: `https://github.com/${social.github}/`,
                })}
              {social.mastodon &&
                renderAuthorSocial({
                  icon: <MastodonIcon />,
                  href: `https://${social.mastodon}/`,
                })}
            </div>
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
