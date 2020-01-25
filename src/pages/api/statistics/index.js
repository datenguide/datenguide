const schema = require('../../../data/schema.json')

const data = Object.keys(schema).reduce((statistics, id) => {
  const statsId = schema[id].source.name
  statistics[statsId] = statistics[statsId] || {}
  const measures = statistics[statsId].measures || []
  statistics[statsId].title = schema[id].source.title_de
  statistics[statsId].measures = [
    ...measures,
    { title: schema[id].name, desc: schema[id].description }
  ]
  return statistics
}, {})

const result = Object.keys(data)
  .map(id => ({ id, title: data[id].title, measures: data[id].measures }))
  .sort((a, b) => (a.id < b.id ? -1 : 1))

export default (req, res) => {
  res.status(200).json(result)
}
