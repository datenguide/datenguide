import { useEffect } from 'react'
import { useManualQuery } from 'graphql-hooks'
import Router from 'next/router'
import { camelizeKeys } from 'humps'

import { getRegion } from '../api/region'
import useSuperRedux from '../../lib/useSuperRedux'

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

const measureSchemaToState = measure => ({
  ...camelizeKeys(measure),
  dimensions: measure.dimensions.map(dim => ({
    ...camelizeKeys(dim),
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

// TODO
// const getRegionStateObject = regionId => {
//   // const region = getRegion(regionId)
// }

const useSearchManager = (initialQuery, initialMeasures, initialRegions) => {
  const [fetchSchema] = useManualQuery(SCHEMA_QUERY)
  const [fetchRegion] = useManualQuery(REGION_QUERY)

  const asyncActions = {
    syncUrl: () => async (dispatch, getState) => {
      const newQuery = {
        region: Object.values(getState().regions)
          .map(r => r.id)
          .join(','),
        data: Object.values(getState().measures).map(m => m.id)
      }
      Router.push({
        pathname: '/statistics',
        query: newQuery
      })
    },
    loadMeasure: id => async dispatch => {
      const [statisticId, measureId] = id.split(':')
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
        dispatch(actions.syncUrl())
      }
    },
    loadRegion: id => async dispatch => {
      dispatch(actions.setLoading())
      const region = await fetchRegion({
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
    },
    closeRegion: id => async dispatch => {
      dispatch(actions.removeRegion(id))
      dispatch(actions.syncUrl())
    },
    closeMeasure: id => async dispatch => {
      dispatch(actions.removeMeasure(id))
      dispatch(actions.syncUrl())
    },
    changeDimensionSelection: payload => async dispatch => {
      dispatch(actions.updateDimension(payload))
      dispatch(actions.syncUrl())
    }
  }

  const reducers = {
    setLoading: state => {
      state.loading = true
      return state
    },
    initializeMeasures: (state, action) => {
      state.measures = measureSchemaListToState(action.payload)
      state.loading = false
      return state
    },
    initializeRegions: (state, action) => {
      // TODO transform to state object
      state.regions = action.payload
      state.loading = false
      return state
    },
    addRegion: (state, action) => {
      // TODO transform to state object
      if (state.regions[action.payload.id]) {
        state.error = 'Region wurde bereits ausgewählt'
      } else {
        state.regions[action.payload.id] = action.payload
        state.loading = false
      }
      return state
    },
    removeRegion: (state, action) => {
      delete state.regions[action.payload]
      return state
    },
    addMeasure: (state, action) => {
      if (state.measures[action.payload.id]) {
        state.error = 'Statistik wurde bereits ausgewählt'
      } else {
        state.measures[action.payload.id] = measureSchemaToState(action.payload)
      }
      state.loading = false
      return state
    },
    removeMeasure: (state, action) => {
      delete state.measures[action.payload]
      return state
    },
    updateDimension: (state, action) => {
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
    },
    setError: (state, action) => {
      state.error = action.payload
      return state
    }
  }

  const initialState = {
    measures: {},
    regions: {},
    error: null,
    measuresLoading: true,
    query: initialQuery
  }

  const [state, dispatch, actions] = useSuperRedux(
    asyncActions,
    reducers,
    initialState,
    'searchmanager'
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
    dispatch,
    actions
  ]
}

export default useSearchManager
