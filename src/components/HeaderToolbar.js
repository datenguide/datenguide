import Link from 'next/link'

import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'

import logo from '../assets/logo.svg'

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
}))

// TODO Link to docs page doesn't work in dev mode after initial page load,
//  so we currently render a regular a tag as a workaround in dev mode

export default function HeaderToolbar({ menuButton }) {
  const classes = useStyles()

  return (
    <Toolbar className={classes.toolbar}>
      <div className={classes.controls}>
        {menuButton}
        <Link href="/">
          <a className={classes.homeLink}>
            <Typography className={classes.logo} variant="h6" component="h2">
              Datenguide
            </Typography>
          </a>
        </Link>
      </div>
      <div className={classes.controls}>
        {process.env.NODE_ENV !== 'production' ? (
          <a
            className="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-colorInherit"
            href="/docs/gettingstarted/intro"
          >
            Docs
          </a>
        ) : (
          <Link href="/docs/gettingstarted/intro" passHref>
            <Button component="a" color="inherit">
              Docs
            </Button>
          </Link>
        )}
        <div className={classes.nav}>
          <Link href="/statistiken">
            <Button component="a" color="inherit">
              Data
            </Button>
          </Link>
          <Link href="/regionen">
            <Button component="a" color="inherit">
              Regions
            </Button>
          </Link>
          <Link href="/info">
            <Button component="a" color="inherit">
              Über Datenguide
            </Button>
          </Link>
          <Link href="/blog">
            <Button component="a" color="inherit">
              Blog
            </Button>
          </Link>
        </div>
      </div>
    </Toolbar>
  )
}
