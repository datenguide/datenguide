import flexsearch from 'flexsearch'
import regions from '@datenguide/metadata'

const getLabel = (id) => {
  return `${id} - ${regions[id].name}`
}

const regionsIndex = flexsearch.create()
Object.keys(regions).forEach((id) => {
  if (id.length === 8) {
    regionsIndex.add(id, getLabel(id))
  }
})

const searchRegion = (filter) => {
  const regionsResult = regionsIndex.search({
    query: filter || '1',
  })

  return regionsResult.map((id) => ({
    value: id,
    name: getLabel(id),
  }))
}

export const getAllCommunities = () => {
  return Object.keys(regions)
    .sort()
    .filter((id) => id.length === 8)
    .map((id) => ({
      value: id,
      name: getLabel(id),
    }))
}

export default searchRegion
