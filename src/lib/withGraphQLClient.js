import { Component } from 'react'

import initGraphQL from './initGraphQLClient'

export default (App) => {
  return class GraphQLHooks extends Component {
    static displayName = 'GraphQLHooks(App)'

    constructor(props) {
      super(props)
      this.graphQLClient = initGraphQL()
    }

    render() {
      return <App {...this.props} graphQLClient={this.graphQLClient} />
    }
  }
}
