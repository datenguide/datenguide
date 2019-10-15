import gql from 'graphql-tag'


const getQuery = ({ statistic, attribute, args }) => {
  const statisticsExpression = `statistics: [R${statistic}]`

  const valueAttributeArgumentsExpression = args.map(arg => {
    return arg.selected.length > 0
      ? `${arg.value}:[${arg.selected.join(',')}]`
      : ''
  })

  const argumentsExpression = `(${valueAttributeArgumentsExpression
    .concat(statisticsExpression)
    .join(',')})`

  const valueAttributeFieldSelections = args.map(arg => arg.value).join('\n')

  const query = `
    {
        region(id: "13") {
            id
            name
            ${attribute}${argumentsExpression}{
                year
                value
                ${valueAttributeFieldSelections}
            }
        }
    }
`

  return gql`
    ${query}
  `
}

export default getQuery
