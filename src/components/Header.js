import React from 'react'
import Link from 'next/link'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    fontWeight: 'bold'
  },
}))

export default function ButtonAppBar() {
  const classes = useStyles()
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="h2" className={classes.title}>
          Datenguide
        </Typography>
        <Link href="/">
          <Button component="a" color="inherit">
            Home
          </Button>
        </Link>
        <Link href="/detail">
          <Button component="a" color="inherit">
            Detail
          </Button>
        </Link>
        <Link href="/about">
          <Button component="a" color="inherit">
            About
          </Button>
        </Link>
      </Toolbar>
    </AppBar>
  )
}
