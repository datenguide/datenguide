import gql from 'graphql-tag'

const getQuery = ({ regions, statistic, attribute, args }) => {
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
        region(id: "${regions[0]}") {
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
