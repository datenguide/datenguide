// 1234:FOO12
// 1234:FOO12(GES,GEN)
const statisticUrlEncoding = /([0-9]+):([A-Z0-9]+)(\((.*)\))?/

const toArray = (data) => {
  if (!data) {
    return []
  } else if (!Array.isArray(data)) {
    return [data]
  }
  return data
}

export const queryArgsToState = (queryArgs) => {
  const { data, region, labels, layout, level, parent, time } = queryArgs

  const measures = toArray(data).map((statistic) => {
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
      dimensions,
    }
  })

  return {
    measures,
    regions: parent ? [parent] : (region && [region]) || [], // TODO support multiple regions
    labels,
    layout,
    time,
    level,
  }
}

// GES:A|B|C,NAT
const dimensionsQueryString = (measure) => {
  const dimensionString = measure.dimensions
    // remove inactive dimensions and empty active dimensions
    .filter((dim) => dim.active && dim.selected.length > 0)
    .map((dim) => {
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

export const stateToQueryArgs = (state) => {
  // TODO change this as soon as tabular API support multiple region
  // selection and levels for each region
  const regionQueryArgs = {}
  if (Object.keys(state.regions).length === 1) {
    const region = state.regions[Object.keys(state.regions)[0]]
    if (region.nuts === state.level) {
      // level is equal to region: simple region query
      regionQueryArgs.region = region.id
    } else {
      // different level selected: parent query with 'region all'
      regionQueryArgs.region = 'all'
      regionQueryArgs.parent = region.id
      regionQueryArgs.level = state.level
    }
  }

  return {
    // region: Object.values(state.regions)
    //   .map((r) => r.id)
    //   .join(','),
    ...regionQueryArgs,
    data: Object.values(state.measures).map(
      (m) => `${m.id}${dimensionsQueryString(m)}`
    ),
    labels: state.labels,
    time: state.time,
    layout: state.layout,
  }
}
