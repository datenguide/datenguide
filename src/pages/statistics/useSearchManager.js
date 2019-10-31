import { createActions } from '../../lib/redux'
import { useCallback, useEffect } from 'react'
import { useReducer } from 'reinspect'
import { useManualQuery } from 'graphql-hooks'
import { produce } from 'immer'

const REGION_QUERY = `
query Region($id: String!) {
  region(id: $id) {
    id
    name
  }
}
`

const SCHEMA_QUERY = `
query Schema($ids: [MeasureDescription]) {
  measures(ids: $ids) {
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

const useSearchManager = ids => {
  const [fetchSchema] = useManualQuery(SCHEMA_QUERY, {
    variables: {
      ids
    }
  })
  const [fetchRegion] = useManualQuery(REGION_QUERY)

  const reducer = (state, action) => {
    switch (action.type) {
      case 'setLoading':
        state.loading = true
        return state
      case 'initializeMeasures':
        state.measures = measureSchemaListToState(action.payload)
        state.loading = false
        return state
      case 'addRegion':
        // TODO transform to state object
        // const regionId = action.payload.value
        // state.regions[regionId] = getRegionStateObject(regionId)
        state.regions[action.payload.id] = action.payload
        state.loading = false
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
              ids: [{ statisticId, measureId }]
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
      const schema = await fetchSchema()
      if (schema.error) {
        dispatch(actions.setError(JSON.stringify(schema.error))) // TODO better error handling
      } else {
        dispatch(actions.initializeMeasures(schema.data.measures))
      }
    }
    fetch()
  }, [ids])

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
