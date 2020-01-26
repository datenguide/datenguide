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
  return query
}

export default getQuery
