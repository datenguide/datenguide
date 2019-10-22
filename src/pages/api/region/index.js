const slugify = require('@sindresorhus/slugify')
const data = require('../../../data/ags.json')

const NUTS_TO_AGS = {
  3: 5,
  2: 3,
  1: 2
}

export const getRegions = nutsLevel =>
  Object.keys(data)
    .filter(id => id.length === NUTS_TO_AGS[nutsLevel])
    .filter(id => id !== 'DG')
    .map(id => ({
      name: data[id],
      id,
      slug: slugify(data[id])
    }))

export const findInvalidRegionIds = ids =>
  ids.filter(id => data[id] === undefined)

export default (req, res) => {
  const {
    query: { nuts }
  } = req
  res.status(200).json(getRegions(nuts))
}
