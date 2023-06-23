import App from 'next/app'

import { StateInspector } from 'reinspect'
import { ClientContext } from 'graphql-hooks'

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline'

import withGraphQLClient from '@/lib/withGraphQLClient'
import theme from '@/theme'

import '@/lib/vendor/prism-material-dark.css'

class _App extends App {
  render() {
    const { Component, pageProps, graphQLClient } = this.props
    return (
      <StateInspector name="Datenguide">
         <ClientContext.Provider value={graphQLClient}>
           {/*<StyledEngineProvider injectFirst>*/}
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <Component {...pageProps} />
            </ThemeProvider>
           {/*</StyledEngineProvider>*/}
        </ClientContext.Provider>
      </StateInspector>
    );
  }
}

export default withGraphQLClient(_App)
