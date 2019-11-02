import { createActions } from '../../lib/redux'
import { useCallback, useEffect } from 'react'
import { useReducer } from 'reinspect'
import { useManualQuery } from 'graphql-hooks'
import { produce } from 'immer'
import { getRegion } from '../api/region'

const REGION_QUERY = `
query Region($id: String!) {
  region(id: $id) {
    id
    name
  }
}
`

const SCHEMA_QUERY = `
query Schema($measures: [MeasureDescription]) {
  measures(ids: $measures) {
    id
    statistic_name
    statistic_title_de
    name
    title_de
    dimensions {
      name
      title_de
      values {
        name
        title_de
      }
    }
  }
}
`

export const actions = createActions([
  'initializeRegions',
  'loadRegion',
  'addRegion',
  'removeRegion',
  'initializeMeasures',
  'loadMeasure',
  'addMeasure',
  'removeMeasure',
  'updateDimension',
  'setLoading',
  'setError'
])

const measureSchemaToState = measure => ({
  ...measure,
  dimensions: measure.dimensions.map(dim => ({
    ...dim,
    selected: dim.values.map(v => v.name),
    values: dim.values.map(v => ({ value: v.name, label: v.title_de })),
    active: false
  }))
})

const measureSchemaListToState = measureList =>
  measureList.reduce((acc, curr) => {
    acc[curr.id] = measureSchemaToState(curr)
    return acc
  }, {})

const getRegionStateObject = regionId => {
  // const region = getRegion(regionId)
}

const useSearchManager = (measures, regions) => {
  const [fetchSchema] = useManualQuery(SCHEMA_QUERY, {
    variables: {
      measures
    }
  })
  const [fetchRegion] = useManualQuery(REGION_QUERY, {
    variables: {
      regions
    }
  })

  const reducer = (state, action) => {
    switch (action.type) {
      case 'setLoading':
        state.loading = true
        return state
      case 'initializeMeasures':
        state.measures = measureSchemaListToState(action.payload)
        state.loading = false
        return state
      case 'initializeRegions':
        // TODO transform to state object
        state.regions = action.payload
        state.loading = false
        return state
      case 'addRegion':
        // TODO transform to state object
        if (state.regions[action.payload.id]) {
          state.error = 'Region wurde bereits ausgewählt'
        } else {
          state.regions[action.payload.id] = action.payload
          state.loading = false
        }
        return state
      case 'removeRegion':
        delete state.regions[action.payload]
        return state
      case 'addMeasure':
        if (state.measures[action.payload.id]) {
          state.error = 'Statistik wurde bereits ausgewählt'
        } else {
          state.measures[action.payload.id] = measureSchemaToState(
            action.payload
          )
        }
        state.loading = false
        return state
      case 'removeMeasure':
        delete state.measures[action.payload]
        return state
      case 'updateDimension':
        const { id, argCode, diff } = action.payload
        state.measures[id].dimensions = state.measures[id].dimensions.map(dim =>
          dim.name === argCode
            ? {
                ...dim,
                ...diff
              }
            : dim
        )
        return state
      case 'setError':
        state.error = action.payload
        return state
      default:
        throw new Error(`unknown action ${action.type}`)
    }
  }

  const dispatchMiddleware = useCallback(
    dispatch => async action => {
      switch (action.type) {
        case 'loadMeasure':
          const [statisticId, measureId] = action.payload.split(':')
          dispatch(actions.setLoading())
          const schema = await fetchSchema({
            variables: {
              measures: [{ statisticId, measureId }]
            }
          })
          if (schema.error) {
            dispatch(actions.setError(JSON.stringify(schema.error))) // TODO better error handling
          } else {
            dispatch(actions.addMeasure(schema.data.measures[0]))
          }
          break
        case 'loadRegion':
          dispatch(actions.setLoading())
          const region = await fetchRegion({
            variables: {
              id: action.payload
            }
          })
          if (region.error) {
            dispatch(actions.setError(JSON.stringify(region.error))) // TODO better error handling
          } else {
            dispatch(actions.addRegion(region.data.region))
          }
          break
        default:
          return dispatch(action)
      }
    },
    []
  )

  const cachedImmerReducer = useCallback(produce(reducer), [reducer])

  const [state, dispatch] = useReducer(
    cachedImmerReducer,
    {
      measures: {},
      regions: {},
      error: null,
      measuresLoading: true
    },
    state => state,
    'searchmanager'
  )

  useEffect(() => {
    const fetch = async () => {
      dispatch(actions.setLoading())
      const result = await fetchSchema()
      if (result.error) {
        dispatch(actions.setError(JSON.stringify(result.error))) // TODO better error handling
      } else {
        dispatch(actions.initializeMeasures(result.data.measures))
      }
    }
    if (measures.length > 0) {
      fetch()
    }
  }, [measures])

  useEffect(() => {
    const fetch = async () => {
      // TODO use proper API
      const result = regions
        .map(id => getRegion(id))
        .reduce((acc, curr) => {
          acc[curr.id] = curr
          return acc
        }, {})
      dispatch(actions.initializeRegions(result))
    }

    if (regions.length > 0) {
      fetch(regions)
    }
  }, [regions])

  return [
    {
      ...state,
      regions: Object.values(state.regions),
      measures: Object.values(state.measures)
    },
    dispatchMiddleware(dispatch)
  ]
}

export default useSearchManager
