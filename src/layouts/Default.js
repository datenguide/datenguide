import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import Header from '../components/Header'
import Footer from '../components/Footer'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column'
  },

  content: {
    flexGrow: 1
  }
}))

export default function DefaultLayout(props) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Header />
      <div className={classes.content}>{props.children}</div>
      <Footer />
    </div>
  )
}
