import { useState, useEffect } from 'react'
import _ from 'lodash'

// 1234:FOO12
// 1234:FOO12(GES,GEN)
const statisticUrlEncoding = /([1-9]+):([A-Z0-9]+)(\((.*)\))?/

export const parseQueryArgs = queryArgs => {
  if (!queryArgs || !queryArgs.data) {
    return []
  }
  const data = _.isArray(queryArgs.data) ? queryArgs.data : [queryArgs.data]
  const measures = data.map(statistic => {
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

  const regions = queryArgs.region ? queryArgs.region.split(',') : []

  return {
    measures,
    regions
  }
}

export default parseQueryArgs
