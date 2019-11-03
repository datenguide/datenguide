import { useState, useEffect } from 'react'
import _ from 'lodash'

// 1234:FOO12
// 1234:FOO12(GES,GEN)
const statisticUrlEncoding = /([1-9]+):([A-Z0-9]+)(\((.*)\))?/

const normalizeToArray = data => {
  if (!data) {
    return []
  } else if (!Array.isArray(data)) {
    return [data]
  }
  return data
}

export const parseQueryArgs = queryArgs => {
  const { data, region } = queryArgs

  const measures = normalizeToArray(data).map(statistic => {
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

export default parseQueryArgs
