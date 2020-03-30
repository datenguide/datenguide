const data = require('@datenguide/metadata')
const slugify = require('@sindresorhus/slugify')

export const getRegion = id => {
  const { name, level } = data[id]
  const [displayName, type] = name.split(', ')

  return {
    id,
    name,
    displayName,
    type,
    slug: slugify(name),
    level
  }
}

export default (req, res) => {
  const {
    query: { level, parent }
  } = req

  const result = Object.keys(data)
    .filter(id => data[id].level === +level)
    .filter(id => !parent || id.startsWith(parent))
    .map(getRegion)

  if (result.length > 0) {
    res.status(200).json(result)
  } else {
    res.status(404).send(`No regions found found for nuts ${level}`)
  }
}
