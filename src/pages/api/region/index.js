const data = require('../../../data/ags.json')
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

export const getRegion = id => ({
  id,
  name: data[id],
  slug: slugify(data[id]),
  ...getNuts(id)
})

export default (req, res) => {
  const {
    query: { nuts, parent }
  } = req

  const result = Object.keys(data)
    .filter(id => AGS_TO_NUTS[id.length] === +nuts)
    .filter(id => !parent || id.startsWith(parent))
    .map(getRegion)

  if (result.length > 0) {
    res.status(200).json(result)
  } else {
    res.status(404).send(`No regions found found for nuts ${nuts}`)
  }
}
