import gql from 'graphql-tag'

import { getSchema } from './schema'

const getQuery = (regions, statisticAndAttribute, args) => {
  const { statistic, attribute } = getSchema(statisticAndAttribute)

  const statisticsExpression = `statistics: [R${statistic}]`

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
            ${attribute}${argumentsExpression}{
                year
                value
                ${valueAttributeFieldSelections}
            }
        }
`

  const regionsToQuery = regions =>
    regions.map(region => regionToQuery(region)).join('\n')

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
