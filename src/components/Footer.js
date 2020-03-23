import Link from 'next/link'

import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import MastodonIcon from 'mdi-material-ui/Mastodon'
import GithubIcon from 'mdi-material-ui/GithubCircle'
import TwitterIcon from 'mdi-material-ui/Twitter'

import background from '../assets/hero_village.svg'

const navItems = [
  {
    title: 'Startseite',
    path: '/'
  },
  {
    title: 'Blog',
    path: '/blog',
    external: true
  },
  {
    title: 'Dokumentation',
    path: 'https://preview.datengui.de/dokumentation',
    external: true
  },
  {
    title: 'Über Datenguide',
    path: '/info'
  },
  {
    title: 'Datenschutz',
    path: '/info/datenschutz'
  },
  {
    title: 'Kontakt und Impressum',
    path: '/info/kontakt'
  }
]

const socialItems = [
  {
    title: 'Datenguide auf Twitter',
    path: 'https://twitter.com/datenguide',
    Icon: TwitterIcon
  },
  {
    title: 'Datenguide auf Mastodon',
    path: 'https://chaos.social/@datenguide',
    Icon: MastodonIcon
  },
  {
    title: 'Datenguide auf Github',
    path: 'https://github.com/datenguide',
    Icon: GithubIcon
  }
]

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 0,
    backgroundColor: '#c3e5f1',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    fontSize: theme.typography.body1.fontSize,

    [theme.breakpoints.up('md')]: {
      position: 'relative',

      '&::after': {
        content: '""',
        backgroundImage: `url(${background})`,
        backgroundRepeat: 'no-repeat',
        position: 'absolute',
        opacity: '0.5',
        width: '500px',
        top: '57px',
        bottom: 0,
        transform: 'translateX(-170px)',
        backgroundSize: '500px auto'
      }
    }
  },

  nav: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),

    '& ul': {
      listStyle: 'none',
      margin: 0,
      paddingTop: theme.spacing(3),
      paddingLeft: theme.spacing(3)
    },

    '& a': {
      textDecoration: 'none',
      position: 'relative',
      marginBottom: theme.spacing(1),
      display: 'inline-block'
    },

    '& a:hover': {
      textDecoration: 'underline'
    },

    [theme.breakpoints.up('md')]: {
      paddingLeft: '33.3%'
    }
  },

  social: {
    '& li': {
      paddingLeft: '1em'
    }
  },

  icon: {
    position: 'absolute',
    width: '0.8em',
    left: '-1em'
  }
}))

export default function Footer() {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Container className={classes.container} fixed>
        <nav className={classes.nav}>
          <Grid container direction="row" justify="center">
            <Grid item xs={12} sm={6}>
              <ul className={classes.social}>
                {socialItems.map(({ title, path, Icon }) => (
                  <li key={path}>
                    <a href={path} className={classes.link}>
                      <Icon className={classes.icon} /> {title}
                    </a>
                  </li>
                ))}
              </ul>
            </Grid>
            <Grid item xs={12} sm={6}>
              <ul>
                {navItems.map(({ title, path, external }) => (
                  <li key={path}>
                    {external ? (
                      <a href={path} className={classes.link}>
                        {title}
                      </a>
                    ) : (
                      <Link href={path}>
                        <a className={classes.link}>{title}</a>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </Grid>
          </Grid>
        </nav>
      </Container>
    </div>
  )
}
