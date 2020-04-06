import flexsearch from 'flexsearch'

import regions from '../../../../data/ags.json'

// TODO move to server

const getLabel = (identifier) => `${identifier} - ${regions[identifier]}`

const regionsIndex = flexsearch.create()
Object.keys(regions)
  .filter((key) => key.length <= 5) // NUTS 1 - 3, no LAU
  .forEach((key) => {
    regionsIndex.add(key, getLabel(key))
  })

export default (req, res) => {
  const { filter } = req.query

  const regionsResult = regionsIndex.search({
    query: filter || '1',
  })

  const result = regionsResult.map((id) => ({
    value: id,
    name: regions[id],
    label: getLabel(id),
  }))

  res.setHeader('Content-Type', 'application/json')
  res.statusCode = 200
  res.end(JSON.stringify(result))
}
