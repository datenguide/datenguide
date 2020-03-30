import flexsearch from 'flexsearch'
const regions = require('@datenguide/metadata')

// TODO move to server

const getLabel = id => `${id} - ${regions[id].name}`

const regionsIndex = flexsearch.create()
Object.keys(regions)
  .filter(id => regions[id].level <= 3) // NUTS 1 - 3, no LAU
  .forEach(id => {
    regionsIndex.add(id, getLabel(id))
  })

export default (req, res) => {
  const { filter } = req.query

  const regionsResult = regionsIndex.search({
    query: filter || '1'
  })

  const result = regionsResult.map(id => ({
    value: id,
    name: regions[id].name,
    label: getLabel(id)
  }))

  res.setHeader('Content-Type', 'application/json')
  res.statusCode = 200
  res.end(JSON.stringify(result))
}
