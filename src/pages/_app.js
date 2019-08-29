import App from 'next/app'
import React from 'react'
import { ThemeProvider } from '@material-ui/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ClientContext } from 'graphql-hooks'
import withGraphQLClient from '../lib/graphql-client'
import theme from '../theme'

class _App extends App {
  render() {
    const { Component, pageProps, graphQLClient } = this.props
    return (
      <ClientContext.Provider value={graphQLClient}>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </ClientContext.Provider>
    )
  }
}

export default withGraphQLClient(_App)
