import gql from 'graphql-tag'

const getQuery = (regions, statistics) => {

  const { statisticCode, attributeCode, args } = statistics

  const statisticsExpression = `statistics: [R${statisticCode}]`

  const selectedArgs = args.filter(arg => arg.selected.length > 0)

  const valueAttributeArgumentsExpression = selectedArgs.map(
    arg => `${arg.value}:[${arg.selected.join(',')}]`
  )

  const argumentsExpression = `(${valueAttributeArgumentsExpression
    .concat(statisticsExpression)
    .join(',')})`

  const valueAttributeFieldSelections = selectedArgs
    .map(arg => arg.value)
    .join('\n')

  const regionToQuery = region => `
   region_${region}: region(id: "${region}") {
            id
            name
            ${attributeCode}${argumentsExpression}{
                year
                value
                ${valueAttributeFieldSelections}
            }
        }
`

  const regionsToQuery = regions =>
    regions.map(region => regionToQuery(region.value)).join('\n')

  const query = `
    {
       ${regionsToQuery(regions)}
    }
`

  return gql`
    ${query}
  `
}

export default getQuery
