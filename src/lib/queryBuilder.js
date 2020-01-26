import prettier from 'prettier/standalone'
import parserGraphql from 'prettier/parser-graphql'

const getRegionGraphQLArg = regionArgs => `{
      region: [
        ${regionArgs.map(r => `"${r.id}"`).join(',')}
      ]
    }`

const getDimensionsGraphQLArgs = dimensions =>
  dimensions
    .map(
      d => `{
  name: "${d.name}"
  values: [${d.selected.map(v => `"${v}"`).join(',')}]
}`
    )
    .join(',')

const getMeasuresGraphQLArg = measureArgs => `{
     id: "${measureArgs.id}"
     dimensions: [${getDimensionsGraphQLArgs(
       measureArgs.dimensions.filter(d => d.active)
     )}]
}`

const getQuery = (regions, measure) => {
  const query = `
  {
    table(regions: ${getRegionGraphQLArg(
      regions
    )}, measures: ${getMeasuresGraphQLArg(measure)}) {
        schema {
        fields {
          name
          type
        }
      }
      data
    }
  }
`

  return prettier.format(query, { parser: 'graphql', plugins: [parserGraphql] })
}

export default getQuery
