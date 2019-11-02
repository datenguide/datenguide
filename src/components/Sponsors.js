import React from 'react'
import Link from 'next/link'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'

import bmbf from '../assets/logo.svg'

const useStyles = makeStyles(theme => ({
  root: {
    background: '#fff'
  }
}))

export default function Header({ menuButton }) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <a className={classes.homeLink} />
    </div>
  )
}
