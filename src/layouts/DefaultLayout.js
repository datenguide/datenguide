import AppBar from '@material-ui/core/AppBar'
import { makeStyles } from '@material-ui/styles'

import Base from '../layouts/Base'
import HeaderToolbar from '../components/HeaderToolbar'
import Footer from '../components/Footer'

const useStyles = makeStyles(theme => ({
  content: {
    paddingBottom: theme.spacing(20)
  }
}))

const DefaultLayout = ({ children, meta }) => {
  const classes = useStyles()

  return (
    <Base meta={meta}>
      <AppBar position="fixed">
        <HeaderToolbar />
      </AppBar>
      <div className={classes.content}>{children}</div>
      <Footer />
    </Base>
  )
}

export default DefaultLayout
