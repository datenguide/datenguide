import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Base from '../layouts/Base'
import AppBar from '@material-ui/core/AppBar'
import HeaderToolbar from '../components/HeaderToolbar'
import Footer from '../components/Footer'

const useStyles = makeStyles(theme => ({
  content: {
    flexGrow: 1,
    paddingTop: theme.spacing(2)
  }
}))

export default function DefaultLayout({ children, meta = { title: '' } }) {
  const classes = useStyles()

  return (
    <Base meta={meta}>
      <AppBar position="fixed">
        <HeaderToolbar />
      </AppBar>
      <div className={classes.content}>
        <div className={classes.root}>{children}</div>
      </div>
      <Footer />
    </Base>
  )
}
