const data = require('@datenguide/metadata')
const slugify = require('@sindresorhus/slugify')

const getRegion = (id) => {
  const region = data[id]
  if (region) {
    const [displayName, type] = region.name.split(', ')
    return {
      ...region,
      type,
      displayName,
      slug: slugify(region.name),
    }
  }
}

const getRegions = (level, parent) => {
  return Object.keys(data)
    .filter((key) => data[key].level === +level)
    .filter((key) => !parent || key.startsWith(parent))
    .map(getRegion)
}

export default (req, res) => {
  const {
    query: { level, id },
  } = req

  if (id && !level) {
    // Get data for a single region:
    const result = getRegion(id)
    if (result) {
      res.status(200).json(result)
    } else {
      res.status(404).send(`No regions found found for id ${id}`)
    }
  } else {
    // Get data for a range of regions:
    const result = getRegions(level || 1, id)
    if (result.length > 0) {
      res.status(200).json(result)
    } else {
      res.status(404).send(`No regions found found for nuts ${level}`)
    }
  }
}
