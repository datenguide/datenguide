import schema from '../../../data/schema.json'
// import mappings from '../data/mappings.json'

// TODO move to server API and get rid of these transformations
const getArgValues = values =>
  values.map(v => ({
    value: v.value,
    label: v.name
  }))

// TODO move to server API and get rid of these transformations
export const getArgs = statisticAndAttribute => {
  const attribute = extractAttribute(statisticAndAttribute)
  const attributeSchema = schema[attribute]
  return attributeSchema
    ? Object.keys(attributeSchema.args).reduce((acc, curr) => {
      const value = attributeSchema.args[curr]
      const option = {
        value: curr,
        label: value.name,
        description: value.description,
        values: getArgValues(attributeSchema.args[curr].values)
      }
      acc.push(option)
      return acc
    }, [])
    : []
}

export const extractAttribute = statisticAndAttribute =>
  statisticAndAttribute != null ? statisticAndAttribute.substr(5) : null

export const extractStatistic = statisticAndAttribute =>
  statisticAndAttribute != null ? statisticAndAttribute.substr(0, 5) : null

export const getSchema = statisticAndAttribute => {
  if (!statisticAndAttribute) {
    return null
  }
  const attributeCode = extractAttribute(statisticAndAttribute)
  const statisticCode = extractStatistic(statisticAndAttribute)
  const args = getArgs(statisticAndAttribute)
  const {
    name: attributeName,
    source: { title_de: statisticName }
  } = schema[attributeCode]
  return {
    statisticAndAttribute,
    attributeCode,
    attributeName,
    statisticCode,
    statisticName,
    args
  }
}
