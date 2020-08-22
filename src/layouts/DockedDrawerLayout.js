import clsx from 'clsx'
import PropTypes from 'prop-types'

import AppBar from '@material-ui/core/AppBar'
import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import { makeStyles } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import useTheme from '@material-ui/styles/useTheme'

import HeaderToolbar from '../components/HeaderToolbar'
import Footer from '../components/Footer'
import Base from '../layouts/Base'

const drawerWidth = {
  mobile: 240,
  desktop: 450,
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column',
  },
  wrapper: {
    display: 'flex',
    flexGrow: 1,
    height: '100%',
    flexDirection: 'column',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth.desktop,
      flexShrink: 0,
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  drawerPaper: {
    width: drawerWidth.mobile,
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth.desktop,
    },
  },
  drawerContent: {
    paddingTop: '64px', // TODO use constant for app bar height
    height: '100%',
  },
  content: {
    flexGrow: 1,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('sm')]: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: 0,
    },
  },
  contentShift: {
    [theme.breakpoints.up('sm')]: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: drawerWidth.desktop,
    },
  },
}))

const DockedDrawerLayout = ({
  children,
  drawerContent,
  meta = { title: null },
  drawerOpen,
  onToggleDrawer,
}) => {
  const classes = useStyles()
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'))

  const handleDrawerToggle = () => {
    onToggleDrawer(!drawerOpen)
  }

  const drawer = <div className={classes.drawerContent}>{drawerContent}</div>

  return (
    <Base meta={meta}>
      <div className={classes.root}>
        <div className={classes.wrapper}>
          <AppBar position="fixed" className={clsx(classes.appBar)}>
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
              open={drawerOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true,
              }}
            >
              {drawer}
            </Drawer>
          </nav>
          <main
            className={clsx(classes.content, {
              [classes.contentShift]: drawerOpen,
            })}
          >
            <div className={classes.toolbar} />
            {children}
          </main>
        </div>
        <Footer />
      </div>
    </Base>
  )
}

DockedDrawerLayout.propTypes = {
  children: PropTypes.node.isRequired,
  drawerContent: PropTypes.node.isRequired,
}

export default DockedDrawerLayout
