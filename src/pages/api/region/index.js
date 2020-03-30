const data = require('@datenguide/metadata')
const slugify = require('@sindresorhus/slugify')

const AGS_TO_NUTS = {
  2: 1,
  3: 2,
  5: 3
}

export const getNuts = id => {
  if (!id) {
    return {
      nuts: null,
      lau: false
    }
  }
  return {
    nuts: AGS_TO_NUTS[id.length],
    lau: id.length > 8
  }
}

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
