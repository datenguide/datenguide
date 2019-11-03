// 1234:FOO12
// 1234:FOO12(GES,GEN)
const statisticUrlEncoding = /([1-9]+):([A-Z0-9]+)(\((.*)\))?/

const toArray = data => {
  if (!data) {
    return []
  } else if (!Array.isArray(data)) {
    return [data]
  }
  return data
}

export const queryArgsToState = queryArgs => {
  const { data, region } = queryArgs

  const measures = toArray(data).map(statistic => {
    const match = statistic.match(statisticUrlEncoding)
    if (!match) {
      throw new Error(`invalid data attribute ${statistic}`)
    }
    const [, statisticId, measureId, , dimensions] = statistic.match(
      statisticUrlEncoding
    )
    if (!statisticId || !measureId) {
      throw new Error(`invalid data attribute ${statistic}`)
    }

    return {
      statisticId,
      measureId,
      dimensions
    }
  })

  const regions = region ? region.split(',') : []

  return {
    measures,
    regions
  }
}

// GES:A|B|C,NAT
const dimensionsQueryString = measure => {
  const dimensionString = measure.dimensions
    // remove inactive dimensions and empty active dimensions
    .filter(dim => dim.active && dim.selected.length > 0)
    .map(dim => {
      if (dim.selected.length !== dim.values.length) {
        // partial selection of values: specify selected values
        const selectedDimensionValues = dim.selected.join('|')
        return `${dim.name}:${selectedDimensionValues}`
      }
      // all values are selected: specify dimension only, without values
      return dim.name
    })
    .join(',')

  return dimensionString ? `(${dimensionString})` : ''
}

export const stateToQueryArgs = state => {
  return {
    region: Object.values(state.regions)
      .map(r => r.id)
      .join(','),
    data: Object.values(state.measures).map(
      m => `${m.id}${dimensionsQueryString(m)}`
    )
  }
}
