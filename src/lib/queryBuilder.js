import gql from 'graphql-tag'

// TODO replace with tabular API
const getQuery = (regions, measure) => {
  const { name, statisticName, dimensions } = measure

  const statisticsExpression = `statistics: [R${statisticName}]`

  const selectedDimensions = dimensions.filter(dim => dim.selected.length > 0 && dim.active)

  const dimensionExpression = selectedDimensions.map(
    arg => `${arg.name}:[${arg.selected.join(',')}]`
  )

  const argumentsExpression = `(${dimensionExpression
    .concat(statisticsExpression)
    .join(',')})`

  const valueAttributeFieldSelections = selectedDimensions
    .map(dim => dim.name)
    .join('\n')

  const regionToQuery = region => `
   region_${region}: region(id: "${region}") {
            id
            name
            ${name}${argumentsExpression}{
                year
                value
                ${valueAttributeFieldSelections}
            }
        }
`

  const regionsToQuery = regions =>
    regions.map(region => regionToQuery(region.id)).join('\n')

  const query = `
    {
       ${regionsToQuery(regions)}
    }
`

  // console.log('query', query);

  return gql`
    ${query}
  `
}

export default getQuery
