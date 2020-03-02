import React from 'react'
import Link from 'next/link'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'

import logo from '../assets/logo.svg'

const useStyles = makeStyles(theme => ({
  controls: {
    display: 'flex'
  },

  nav: {
    display: 'flex',

    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },

  toolbar: {
    display: 'flex',
    justifyContent: 'space-between'
  },

  menuButton: {
    marginRight: theme.spacing(2)
  },

  homeLink: {
    color: 'inherit',
    textDecoration: 'none'
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
    backgroundPosition: 'left center'
  }
}))

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
        <Link href="/info">
          <Button component="a" color="inherit">
            Über Datenguide
          </Button>
        </Link>
      </div>
    </Toolbar>
  )
}
