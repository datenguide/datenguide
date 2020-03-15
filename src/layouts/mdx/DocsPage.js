import PropTypes from 'prop-types'
import { useState } from 'react'

import AppBar from '@material-ui/core/AppBar'
import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import { makeStyles } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import useTheme from '@material-ui/styles/useTheme'

import HeaderToolbar from '../../components/HeaderToolbar'
import Footer from '../../components/Footer'
import DocsNavigation from '../../components/DocsNavigation'
import Base from '../Base'
import docsNavigation from '../../docsNavigation'
import BodyText from '../../components/BodyText'

import '../../lib/vendor/prism-material-dark.css'

const drawerWidth = {
  mobile: 240,
  desktop: 250
}

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column'
  },
  wrapper: {
    flexGrow: 1,
    flexDirection: 'row'
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      zIndex: theme.zIndex.drawer + 1
    }
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth.desktop,
      flexShrink: 0
    }
  },
  drawerPaper: {
    paddingTop: theme.spacing(9),
    border: 'none',
    width: drawerWidth.mobile,
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth.desktop
    }
  },
  content: {
    flexGrow: 1,
    margin: theme.spacing(0, 4),
    height: '100%',
    [theme.breakpoints.up('sm')]: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      marginLeft: drawerWidth.desktop + theme.spacing(4)
    }
  }
}))

const DocsPage = frontMatter => ({ children, tableOfContents }) => {
  const classes = useStyles()
  const theme = useTheme()
  const [open, setOpen] = useState(false)
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'))

  const handleDrawerToggle = () => {
    setOpen(!open)
  }

  return (
    <Base meta={frontMatter}>
      <div className={classes.root}>
        <div className={classes.wrapper}>
          <AppBar position="fixed" className={classes.appBar}>
            <HeaderToolbar
              menuButton={
                isDesktop ? null : (
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerToggle}
                    className={classes.menuButton}
                  >
                    <MenuIcon />
                  </IconButton>
                )
              }
            />
          </AppBar>
          <nav className={classes.drawer} aria-label="mailbox folders">
            <Drawer
              variant={isDesktop ? 'permanent' : 'temporary'}
              open={open}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper
              }}
              ModalProps={{
                keepMounted: true
              }}
            >
              <div className={classes.toolbar} />
              <DocsNavigation docsNavigation={docsNavigation} />
            </Drawer>
          </nav>
          <main className={classes.content}>
            <BodyText>{children}</BodyText>
          </main>
        </div>
        <Footer />
      </div>
    </Base>
  )
}

DocsPage.propTypes = {
  children: PropTypes.node.isRequired
}

export default DocsPage
