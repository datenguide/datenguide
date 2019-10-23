import React from 'react'
import Link from 'next/link'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'

import logo from '../assets/logo.svg'

const useStyles = makeStyles(theme => ({
  bar: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    background: '#fff'
  },

  container: {
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
    position: 'relative',
    top: '0.15em',
    height: '1.35em',
    paddingLeft: '1.5em',
    lineHeight: '1.35em',
    fontWeight: 'bold',
    textTransform: 'lowercase',
    backgroundImage: `url(${logo})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '1.35em auto'
  }
}))

export default function Header() {
  const classes = useStyles()
  return (
    <AppBar className={classes.bar} position="static">
      <Container className={classes.container} fixed>
        <Link href="/">
          <a className={classes.homeLink}>
            <Typography className={classes.logo} variant="h6" component="h2">
              Datenguide
            </Typography>
          </a>
        </Link>
        <div className={classes.controls}>
          <Link href="/">
            <Button component="a" color="inherit">
              Home
            </Button>
          </Link>
          <Link href="/detail">
            <Button component="a" color="inherit">
              Statistics
            </Button>
          </Link>
        </div>
      </Container>
    </AppBar>
  )
}
