import { makeStyles } from '@mui/styles'
import AppBar from '@mui/material/AppBar'

import Base from '../Base'
import HeaderToolbar from '../../components/HeaderToolbar'
import Footer from '../../components/Footer'

const useStyles = makeStyles((theme) => ({
  content: {},
}))

const Minimal = (frontMatter) => ({ children }) => {
  const classes = useStyles()

  return (
    <Base meta={frontMatter}>
      <AppBar position="fixed">
        <HeaderToolbar />
      </AppBar>
      <div className={classes.content}>{children}</div>
      <Footer />
    </Base>
  )
}

export default Minimal
