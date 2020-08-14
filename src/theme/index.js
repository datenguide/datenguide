import { createMuiTheme } from '@material-ui/core/styles'
import { red } from '@material-ui/core/colors'

import { plex } from './fonts'

const RED = '#f26c6f'
const BLUE = '#01627c'
const WHITE = '#fff'

const theme = createMuiTheme({
  typography: {
    fontSize: 14,
    htmlFontSize: 16,
    fontFamily: [
      plex.name,
      '-apple-system',
      'BlinkMacSystemFont',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),

    h1: {
      fontSize: '3rem',
      lineHeight: 1.1,
      fontWeight: 'bold',
    },
    h2: {
      fontSize: '3rem',
      lineHeight: 1.1,
      fontWeight: 'bold',
    },
    h3: {
      fontSize: '2rem',
      lineHeight: 1.1,
      fontWeight: 'bold',
    },
    h4: {
      fontSize: '1.5rem',
      lineHeight: 1.1,
      fontWeight: 'bold',
    },
    h5: {
      fontSize: '1rem',
      lineHeight: 1.1,
      fontWeight: 'bold',
    },
    h6: {
      fontSize: '1rem',
      lineHeight: 1.1,
      fontWeight: 'bold',
    },
    subtitle1: {
      fontSize: '1rem',
      lineHeight: 1.3,
    },
    subtitle2: {
      fontSize: '1rem',
      lineHeight: 1.3,
    },
  },

  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': plex.fontFace,
        a: {
          color: BLUE,
        },
      },
    },
    MuiButton: {
      root: {
        fontWeight: 'bold',
      },
    },
    MuiToolbar: {
      root: {
        background: WHITE,
      },
    },
    MuiCardHeader: {
      content: {
        whiteSpace: 'normal',
      },
    },
  },

  palette: {
    primary: {
      main: RED,
    },
    secondary: {
      main: BLUE,
    },
    error: {
      main: red.A400,
    },
    background: {
      default: WHITE,
    },
  },

  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1200,
      xl: 1920,
    },
  },

  props: {
    MuiButtonBase: {
      disableRipple: true, // No more ripple, on the whole application 💣!
    },
  },
})

export default theme
