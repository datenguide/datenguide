import moment from 'moment'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Avatar from '@material-ui/core/Avatar'
import MastodonIcon from 'mdi-material-ui/Mastodon'
import GithubIcon from 'mdi-material-ui/Github'
import TwitterIcon from 'mdi-material-ui/Twitter'

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    backgroundColor: '#c3e5f1',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    marginBottom: theme.spacing(12),
    hyphens: 'auto',

    [theme.breakpoints.up('sm')]: {
      minHeight: theme.spacing(32),
      hyphens: 'initial',
    },
  },

  container: {
    position: 'relative',
    zIndex: 1,
  },

  content: {
    width: '100%',
    padding: theme.spacing(6, 0),

    [theme.breakpoints.up('md')]: {
      width: '70%',
    },
  },

  title: {
    margin: 0,
    ...theme.typography.h3,
    color: theme.palette.secondary.dark,

    [theme.breakpoints.up('md')]: {
      marginTop: theme.spacing(6),
      ...theme.typography.h1,
    },
  },

  description: {
    fontSize: theme.typography.subtitle2.fontSize,
    fontWeight: 'normal',
    margin: theme.spacing(2, 0),

    [theme.breakpoints.up('md')]: {
      fontSize: theme.typography.subtitle1.fontSize,
    },
  },

  meta: {
    color: theme.palette.grey[500],
    position: 'absolute',
    bottom: theme.spacing(-7),
  },

  category: {
    fontWeight: 'bold',
    color: 'black',
    background: theme.palette.info.main,
    textDecoration: 'none',
    padding: theme.spacing(0.5, 1),
    lineHeight: '1em',
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
    margin: theme.spacing(-0.5, 0, 0, 2),
  },

  authorSocial: {
    display: 'inline',

    '& a': {
      color: theme.palette.grey[600],
      textDecoration: 'none',
    },

    '& a:hover': {
      textDecoration: 'underline',
      color: theme.palette.secondary.main,
    },

    '& svg': {
      fontSize: 18,
      marginLeft: 5,
      verticalAlign: 'middle',
    },
  },

  visual: {
    position: 'absolute',
    width: '42%',
    left: '58%',
    bottom: 0,

    '& img': {
      display: 'block',
    },

    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },

    // Make space to allow for the children to overlap the bottom boundaries of the header component
    clip: 'rect(auto, auto, 1200px, auto)', // old browsers, deprecated
    clipPath: 'inset(0 0 -1200px 0)', // modern browsers
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

const renderMeta = ({ category, date }) => {
  const classes = useStyles()
  return (
    <div className={classes.meta}>
      {category && (
        <>
          {/* TODO: This is a workaround. Should use `Link` to optimize page loading: */}
          <a href={category.href} className={classes.category}>
            {category.name}
          </a>
          &nbsp;—&nbsp;
        </>
      )}
      {moment(date).format('DD.MM.YYYY')}
    </div>
  )
}

const BlogHeader = ({
  title,
  date,
  description,
  category,
  authors = [],
  authorMeta = {},
  children,
}) => {
  const classes = useStyles()
  const fullAuthorData = authors.map((name) => authorMeta[name] || { name })

  return (
    <header className={classes.root}>
      <div className={classes.wrapper}>
        <Container maxWidth="lg" className={classes.container}>
          <div className={classes.content}>
            <h1 className={classes.title}>{title}</h1>
            <p className={classes.description}>{description}</p>
            {authors.length > 0 && renderAuthors(fullAuthorData)}
          </div>
          {renderMeta({ category, date })}
        </Container>
        {children && <div className={classes.visual}>{children}</div>}
      </div>
    </header>
  )
}

export default BlogHeader
