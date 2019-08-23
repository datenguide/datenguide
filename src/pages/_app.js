import App from 'next/app'
import React from 'react'
import withGraphQLClient from '../lib/graphql-client'
import { ClientContext } from 'graphql-hooks'

class _App extends App {
  render() {
    const { Component, pageProps, graphQLClient } = this.props
    return (
      <ClientContext.Provider value={graphQLClient}>
        <Component {...pageProps} />
      </ClientContext.Provider>
    )
  }
}

export default withGraphQLClient(_App)
