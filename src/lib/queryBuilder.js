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

const getQuery = (regions, measure, page, itemsPerPage) => {
  const query = `
  {
    table(regions: ${getRegionGraphQLArg(
      regions
    )}, measures: ${getMeasuresGraphQLArg(measure)},
    page: ${page},
    itemsPerPage: ${itemsPerPage}) {
        schema {
        fields {
          name
          type
        }
      }
      data
      pagination {
        page
        itemsPerPage
        total
      }
    }
  }
`

  return process.browser
    ? window.prettier.format(query, {
        parser: 'graphql',
        plugins: window.prettierPlugins
      })
    : query
}

export default getQuery
