import Link from 'next/link'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import GithubIcon from 'mdi-material-ui/GithubCircle'
import TwitterIcon from 'mdi-material-ui/TwitterCircle'

import background from '../assets/hero_village.svg'

const navItems = [
  {
    title: 'Startseite',
    path: '/'
  },
  {
    title: 'Blog',
    path: 'https://blog.datengui.de',
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
      backgroundImage: `url(${background})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: '500px auto',
      backgroundPosition: '-170px bottom',
      borderBottom: '3px solid #44707f'
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
    top: '-0.1em',
    left: '-1em'
  }
}))

export default function Footer() {
  const classes = useStyles()
  return (
    <div className={classes.root} position="static">
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
