import React from 'react'
import initGraphQL from './initGraphQLClient'

export default App => {
  return class GraphQLHooks extends React.Component {
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
