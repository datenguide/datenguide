import App from 'next/app'

import { StateInspector } from 'reinspect'

import { ThemeProvider } from '@material-ui/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

import theme from '../theme'

import '../lib/vendor/prism-material-dark.css'

class _App extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <StateInspector name="Datenguide">
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </StateInspector>
    )
  }
}

export default _App
