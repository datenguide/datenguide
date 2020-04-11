import AppBar from '@material-ui/core/AppBar'
import { makeStyles } from '@material-ui/styles'

import Base from '../layouts/Base'
import HeaderToolbar from '../components/HeaderToolbar'
import Footer from '../components/Footer'
import theme from '../theme'

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    paddingBottom: theme.spacing(20),
    display: 'flex',
    flexDirection: 'column',
  },
}))

const DefaultLayout = ({
  children,
  meta,
  backgroundColor = theme.palette.white,
}) => {
  const classes = useStyles()

  return (
    <Base meta={meta}>
      <AppBar position="fixed">
        <HeaderToolbar />
      </AppBar>
      <div
        className={classes.content}
        style={{ backgroundColor: backgroundColor }}
      >
        {children}
      </div>
      <Footer />
    </Base>
  )
}

export default DefaultLayout
