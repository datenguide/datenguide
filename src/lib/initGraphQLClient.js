import { GraphQLClient } from 'graphql-hooks'
import memCache from 'graphql-hooks-memcache'
import unfetch from 'isomorphic-unfetch'

let graphQLClient = null

const create = (initialState = {}) => {
  return new GraphQLClient({
    ssrMode: false, // graphql is only used on the client, pages are SSG
    url: `${process.env.DATENGUIDE_API}/graphql`,
    cache: memCache({ initialState }),
    fetch: typeof window !== 'undefined' ? fetch.bind() : unfetch, // eslint-disable-line
  })
}

const initGraphQLClient = (initialState) => {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (typeof window === 'undefined') {
    return create(initialState)
  }

  // Reuse client on the client-side
  if (!graphQLClient) {
    graphQLClient = create(initialState)
  }

  return graphQLClient
}

export default initGraphQLClient
