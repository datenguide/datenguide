import regions from '@datenguide/metadata'

const NUTS_LEVELS = [2, 3, 5, 8]

const NUTS_DESCRIPTIONS = [
  'Bundesland',
  'Regierungsbezirk',
  'Kreis',
  'Gemeinde',
]

export const getNutsHierarchy = (region) => {
  if (!region) {
    return []
  }
  const nutsHierarchy = []
  const regionId = region.value
  let i = 0
  while (NUTS_LEVELS[i] <= regionId.length) {
    const levelId = regionId.substring(0, NUTS_LEVELS[i])
    nutsHierarchy.push({
      id: levelId,
      nuts: i + 1,
      name: regions[levelId] && regions[levelId].name,
      nutsDescription: NUTS_DESCRIPTIONS[i],
    })
    i++
  }
  return nutsHierarchy.reverse()
}

export const getNutsComponents = (region) => {
  if (!region) {
    return []
  }
  const result = []
  const regionId = region.value
  let i = 0
  while (NUTS_LEVELS[i] <= regionId.length) {
    const levelId = regionId.substring(
      Math.max(0, NUTS_LEVELS[i - 1]),
      NUTS_LEVELS[i]
    )
    result.push(levelId)
    i++
  }
  return result
}
