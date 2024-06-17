import Link from 'next/link'

import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'

import logo from '../assets/logo.svg'
import { useRouter } from 'next/router'

const useStyles = makeStyles((theme) => ({
  controls: {
    display: 'flex',
  },

  nav: {
    display: 'flex',

    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },

  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  menuButton: {
    marginRight: theme.spacing(2),
  },

  homeLink: {
    color: 'inherit',
    textDecoration: 'none',
  },

  logo: {
    marginLeft: theme.spacing(1),
    padding: '0.5em 0.5em 0.5em 1.5em',
    lineHeight: '1.3em',
    fontWeight: 'bold',
    textTransform: 'lowercase',
    backgroundImage: `url(${logo})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '1.3em auto',
    backgroundPosition: 'left center',
  },

  message: {
    color: theme.palette.common.black,
    backgroundColor: theme.palette.info.main,
    padding: '0.5em 1em',
    fontSize: '0.8em',
    fontWeight: '600',
    textAlign: 'center',
  },

  link: {
    color: theme.palette.common.black,
    fontWeight: 'normal',
    textDecoration: 'underline',
    margin: '0 0.5em',
    display: 'inline-block',
  },
}))

// TODO Link to docs page doesn't work in dev mode after initial page load,
//  so we currently render a regular a tag as a workaround in dev mode

export default function HeaderToolbar({ menuButton }) {
  const classes = useStyles()

  const router = useRouter()

  return (
    <div className={classes.header}>
      <div className={classes.message}>
        Die Datenguide-API wurde im Juni 2024 abgeschaltet.
        <Link href="/blog/2024/bye-bye">
          <a className={classes.link}>Alles zur Abschaltung</a>
        </Link>
      </div>
      <Toolbar className={classes.toolbar}>
        <div className={classes.controls}>
          {menuButton}
          <Link href="/">
            <a className={classes.homeLink}>
              <Typography className={classes.logo} component="h2">
                Datenguide
              </Typography>
            </a>
          </Link>
        </div>
        <div className={classes.controls}>
          <div className={classes.nav}>
            <Link href="/statistik-erklaert">
              <Button
                component="a"
                color={
                  router.pathname.startsWith('/statistik-erklaert')
                    ? 'primary'
                    : 'inherit'
                }
              >
                Statistik erklärt
              </Button>
            </Link>
            <Link href="/blog">
              <Button
                component="a"
                color={
                  router.pathname.startsWith('/blog') ? 'primary' : 'inherit'
                }
              >
                Blog
              </Button>
            </Link>
            <Link href="/info">
              <Button
                component="a"
                color={
                  router.pathname.startsWith('/info') ? 'primary' : 'inherit'
                }
              >
                Über Datenguide
              </Button>
            </Link>
          </div>
        </div>
      </Toolbar>
    </div>
  )
}
