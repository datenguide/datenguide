import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import Head from '../components/Head'
import HeaderToolbar from '../components/HeaderToolbar'
import Footer from '../components/Footer'
import AppBar from '@material-ui/core/AppBar'

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

export default function BaseLayout({ children, meta }) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Head
        title={meta.title}
        description={meta.description}
        previewImage={meta.previewImage}
      />
      <AppBar position="static">
        <HeaderToolbar />
      </AppBar>
      <div className={classes.content}>{children}</div>
      <Footer />
    </div>
  )
}
