import flexsearch from 'flexsearch'

import schema from '../../../data/schema.json'
import mappings from '../../../data/mappings.json'

// TODO move to server

const getLabel = identifier => {
  const statistic = identifier.substr(0, 5)
  const attribute = identifier.substr(5)

  const statisticMapping = mappings[attribute].find(m => m.name === statistic)
  return `${statisticMapping.name} ${statisticMapping.title_de}  - ${attribute} ${schema[attribute].name}`
}

const statisticsIndex = flexsearch.create()
Object.keys(schema).forEach(key => {
  mappings[key].forEach(mapping => {
    const identifier = `${mapping.name}${key}`
    statisticsIndex.add(identifier, getLabel(identifier))
  })
})

export default (req, res) => {
  const { filter } = req.query

  const statistics = statisticsIndex.search({
    query: filter || '1'
  })

  const result = statistics.map(id => ({
    value: id,
    label: getLabel(id)
  }))

  res.setHeader('Content-Type', 'application/json')
  res.statusCode = 200
  res.end(JSON.stringify(result))
}
