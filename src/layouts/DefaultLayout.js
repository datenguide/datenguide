import AppBar from '@material-ui/core/AppBar'

import Base from '../layouts/Base'
import HeaderToolbar from '../components/HeaderToolbar'
import Footer from '../components/Footer'

const DefaultLayout = ({ children, meta }) => {
  return (
    <Base meta={meta}>
      <AppBar position="fixed">
        <HeaderToolbar />
      </AppBar>
      <div>{children}</div>
      <Footer />
    </Base>
  )
}

export default DefaultLayout
