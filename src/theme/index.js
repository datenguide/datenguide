import { createMuiTheme } from '@material-ui/core/styles'
import { red } from '@material-ui/core/colors'

import { plex } from './fonts'

const RED = '#f26c6f'
const BLUE = '#01627c'
const WHITE = '#fff'

// Create a theme instance.
const theme = createMuiTheme({
  typography: {
    fontSize: 16,
    fontFamily: [
      plex.name,
      '-apple-system',
      'BlinkMacSystemFont',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(',')
  },

  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': plex.fontFace,
        a: {
          color: BLUE
        }
      }
    },
    MuiButton: {
      root: {
        fontWeight: 'bold'
      }
    },
    MuiToolbar: {
      root: {
        background: WHITE
      }
    }
  },

  palette: {
    primary: {
      main: RED
    },
    secondary: {
      main: BLUE
    },
    error: {
      main: red.A400
    },
    background: {
      default: WHITE
    }
  },

  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1200,
      xl: 1920
    }
  },

  props: {
    MuiButtonBase: {
      disableRipple: true // No more ripple, on the whole application 💣!
    }
  }
})

export default theme
