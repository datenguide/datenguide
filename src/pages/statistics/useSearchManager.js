import { createActions } from '../../lib/redux'
import { useCallback, useEffect } from 'react'
import { useReducer } from 'reinspect'
import { useManualQuery } from 'graphql-hooks'
import { produce } from 'immer'
import { getRegion } from '../api/region'
import Router from 'next/router'
import { graphQLClient } from '../../lib/graphql-client'

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

export const actions = Object.assign(
  createActions([
    'initializeRegions',
    'addRegion',
    'removeRegion',
    'initializeMeasures',
    'addMeasure',
    'removeMeasure',
    'updateDimension',
    'setLoading',
    'setError'
  ]),
  {
    syncUrl: () => async (dispatch, getState) => {
      const newQuery = {
        region: Object.values(getState().regions)
          .map(r => r.id)
          .join(','),
        data: Object.values(getState().measures).map(m => m.id)
      }
      console.log('newQuery', newQuery)
      // Router.Router.push({
      //   pathname: '/statistics',
      //   query: newQuery
      // })
    },
    loadMeasure: id => async dispatch => {
      const [statisticId, measureId] = id.split(':')
      dispatch(actions.setLoading())
      const schema = await graphQLClient.request({
        query: SCHEMA_QUERY,
        variables: {
          measures: [{ statisticId, measureId }]
        }
      })
      if (schema.error) {
        dispatch(actions.setError(JSON.stringify(schema.error))) // TODO better error handling
      } else {
        dispatch(actions.addMeasure(schema.data.measures[0]))
      }
    },
    loadRegion: id => async dispatch => {
      debugger
      dispatch(actions.setLoading())
      const region = await graphQLClient.request({
        query: REGION_QUERY,
        variables: {
          id
        }
      })
      if (region.error) {
        dispatch(actions.setError(JSON.stringify(region.error))) // TODO better error handling
      } else {
        dispatch(actions.addRegion(region.data.region))
        dispatch(actions.syncUrl())
      }
    }
  }
)

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
        state.measures[action.payload.id] = measureSchemaToState(action.payload)
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

const useSearchManager = (initialQuery, initialMeasures, initialRegions) => {
  const [fetchSchema] = useManualQuery(SCHEMA_QUERY)
  const [fetchRegion] = useManualQuery(REGION_QUERY)

  const cachedImmerReducer = useCallback(produce(reducer), [reducer])

  const [state, dispatch] = useReducer(
    cachedImmerReducer,
    {
      measures: {},
      regions: {},
      error: null,
      measuresLoading: true,
      query: initialQuery
    },
    state => state,
    'searchmanager'
  )

  const dispatchMiddleware = useCallback(
    (dispatch, getState) => async action => {
      if (typeof action === 'function') {
        return action(dispatch, getState)
      }
      return dispatch(action)
    },
    []
  )

  useEffect(() => {
    const fetch = async () => {
      dispatch(actions.setLoading())
      const result = await fetchSchema({
        variables: {
          measures: initialMeasures
        }
      })
      if (result.error) {
        dispatch(actions.setError(JSON.stringify(result.error))) // TODO better error handling
      } else {
        dispatch(actions.initializeMeasures(result.data.measures))
      }
    }
    if (initialMeasures.length > 0) {
      fetch()
    }
  }, [initialMeasures])

  useEffect(() => {
    const fetch = async () => {
      // TODO use proper API
      const result = initialRegions
        .map(id => getRegion(id))
        .reduce((acc, curr) => {
          acc[curr.id] = curr
          return acc
        }, {})
      dispatch(actions.initializeRegions(result))
    }

    if (initialRegions.length > 0) {
      fetch()
    }
  }, [initialRegions])

  return [
    {
      ...state,
      regions: Object.values(state.regions),
      measures: Object.values(state.measures)
    },
    dispatchMiddleware(dispatch, () => state)
  ]
}

export default useSearchManager
