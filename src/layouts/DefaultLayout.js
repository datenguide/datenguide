import React from 'react'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import BaseLayout from '../layouts/BaseLayout'
import AppBar from '@material-ui/core/AppBar'
import HeaderToolbar from '../components/HeaderToolbar'
import Footer from '../components/Footer'

const useStyles = makeStyles(theme => ({
  content: {
    flexGrow: 1
  }
}))

export default function DefaultLayout({ children, meta }) {
  const classes = useStyles()

  return (
    <BaseLayout meta={meta}>
      <AppBar position="static">
        <HeaderToolbar />
      </AppBar>
      <div className={classes.content}>
        <Container>
          <div className={classes.root}>{children}</div>
        </Container>
      </div>
      <Footer />
    </BaseLayout>
  )
}
