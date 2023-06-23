import Link from 'next/link'

import { makeStyles } from '@mui/styles'
import Typography from '@mui/material/Typography'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'

import logo from '../assets/logo.svg'
import { useRouter } from 'next/router'

const useStyles = makeStyles((theme) => ({
  controls: {
    display: 'flex',
  },

  nav: {
    display: 'flex',

    [theme.breakpoints.down('md')]: {
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

  const router = useRouter()

  return (
    <Toolbar className={classes.toolbar}>
      <div className={classes.controls}>
        {menuButton}
        <Link legacyBehavior href="/">
          <a className={classes.homeLink}>
            <Typography className={classes.logo} component="h2">
              Datenguide
            </Typography>
          </a>
        </Link>
      </div>
      <div className={classes.controls}>
        {/* {process.env.NODE_ENV !== 'production' ? ( */}
        {/*  <a */}
        {/*    className="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-colorInherit" */}
        {/*    href="/docs/gettingstarted/intro" */}
        {/*  > */}
        {/*    Docs */}
        {/*  </a> */}
        {/* ) : ( */}
        {/*  <Link legacyBehavior href="/docs/gettingstarted/intro" passHref> */}
        {/*    <Button component="a" color="inherit"> */}
        {/*      Docs */}
        {/*    </Button> */}
        {/*  </Link> */}
        {/* )} */}
        <div className={classes.nav}>
          <Link legacyBehavior href="/statistiken">
            <Button
              component="a"
              color={
                router.pathname.startsWith('/statistiken')
                  ? 'primary'
                  : 'inherit'
              }
            >
              Datenportal
            </Button>
          </Link>
          {/* <Link legacyBehavior href="/regionen"> */}
          {/*  <Button component="a" color="inherit"> */}
          {/*    Regions */}
          {/*  </Button> */}
          {/* </Link> */}
          <Link legacyBehavior href="/statistik-erklaert">
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
          <Link legacyBehavior href="/blog">
            <Button
              component="a"
              color={
                router.pathname.startsWith('/blog') ? 'primary' : 'inherit'
              }
            >
              Blog
            </Button>
          </Link>
          <Link legacyBehavior href="/info">
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
  )
}
