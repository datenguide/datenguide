import flexsearch from 'flexsearch'

import schema from '../../../../data/schema.json'
import mappings from '../../../../data/mappings.json'

// TODO move to server

const getLabel = (identifier) => {
  const [statisticId, measureId] = identifier.split(':')

  const statisticMapping = mappings[measureId].find(
    (m) => m.name === statisticId
  )
  return `${statisticMapping.name} ${statisticMapping.title_de}  - ${measureId} ${schema[measureId].name}`
}

const statisticsIndex = flexsearch.create()
Object.keys(schema).forEach((key) => {
  mappings[key].forEach((mapping) => {
    const identifier = `${mapping.name}:${key}`
    statisticsIndex.add(identifier, getLabel(identifier))
  })
})

export default (req, res) => {
  const { filter } = req.query

  const statistics = statisticsIndex.search({
    query: filter || '1',
  })

  const result = statistics.map((id) => ({
    value: id,
    label: getLabel(id),
  }))

  res.setHeader('Content-Type', 'application/json')
  res.statusCode = 200
  res.end(JSON.stringify(result))
}
