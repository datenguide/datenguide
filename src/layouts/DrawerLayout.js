import React from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'

import AppBar from '@material-ui/core/AppBar'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import { makeStyles } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import useTheme from '@material-ui/styles/useTheme'

import HeaderToolbar from '../components/HeaderToolbar'
import Footer from '../components/Footer'

const drawerWidth = {
  mobile: 240,
  desktop: 400
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
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth.desktop,
      flexShrink: 0
    }
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    }
  },
  appBarShift: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth.desktop}px)`,
      marginLeft: drawerWidth.desktop,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      })
    }
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth.mobile,
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth.desktop
    }
  },
  content: {
    flexGrow: 1,
    height: '100%',
    [theme.breakpoints.up('sm')]: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      marginLeft: 0
    }
  },
  contentShift: {
    [theme.breakpoints.up('sm')]: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      }),
      marginLeft: drawerWidth.desktop
    }
  }
}))

const DrawerLayout = ({ children, drawerContent }) => {
  const classes = useStyles()
  const theme = useTheme()
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'))

  const handleDrawerToggle = () => {
    setOpen(!open)
  }

  const drawer = (
    <>
      <div className={classes.toolbar} />
      <Divider />
      {drawerContent}
    </>
  )

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open
          })}
        >
          <HeaderToolbar
            menuButton={
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                className={classes.menuButton}
              >
                <MenuIcon />
              </IconButton>
            }
          />
        </AppBar>
        <nav className={classes.drawer} aria-label="mailbox folders">
          <Drawer
            variant={isDesktop ? 'persistent' : 'temporary'}
            open={open}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true
            }}
          >
            {drawer}
          </Drawer>
        </nav>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open
          })}
        >
          <div className={classes.toolbar} />
          {children}
        </main>
      </div>
      <Footer />
    </div>
  )
}

DrawerLayout.propTypes = {
  children: PropTypes.node.isRequired,
  drawerContent: PropTypes.node.isRequired
}

export default DrawerLayout