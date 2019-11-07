import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import Head from '../components/Head'
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

export default function BaseLayout({ children, meta }) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Head
        title={meta.title}
        description={meta.description}
        previewImage={meta.previewImage}
      />
      <Header />
      <div className={classes.content}>{children}</div>
      <Footer />
    </div>
  )
}
