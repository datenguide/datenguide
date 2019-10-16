import schema from '../data/schema.json'

// TODO move to server API and get rid of these transformations
const getArgValues = values =>
  values.map(v => ({
    value: v.value,
    label: v.name
  }))

// TODO move to server API and get rid of these transformations
export const getAttributeArgs = attribute => {
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
  statisticAndAttribute != null
    ? statisticAndAttribute.value.substr(5)
    : null

export const extractStatistic = statisticAndAttribute =>
  statisticAndAttribute != null
    ? statisticAndAttribute.value.substr(0, 5)
    : null

export const extractStatisticAndAttribute = statisticAndAttribute =>
  statisticAndAttribute != null
    ? {
        attribute: extractAttribute(statisticAndAttribute),
        statistic: extractStatistic(statisticAndAttribute)
      }
    : null
