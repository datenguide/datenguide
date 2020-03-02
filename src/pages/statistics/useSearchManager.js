import { useEffect, useMemo } from 'react'
import { useManualQuery } from 'graphql-hooks'
import Router from 'next/router'
import { camelizeKeys } from 'humps'
import _ from 'lodash'

import { getNuts, getRegion } from '../api/region'
import useSuperRedux from '../../lib/useSuperRedux'
import { stateToQueryArgs } from '../../lib/queryString'

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
  measuresCatalog(ids: $measures) {
    id
    statistic_name
    statistic_title_de
    name
    definition_de
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

const getSelectedValues = (dim, dimensionSelection) => {
  const selection = (dimensionSelection && dimensionSelection[dim.name]) || []
  return selection && selection.length > 0
    ? selection
    : dim.values.map(v => v.name)
}

const measureToState = (schema, dimensionSelection) => {
  return {
    ...camelizeKeys(schema),
    dimensions: schema.dimensions.map(dim => ({
      ...camelizeKeys(dim),
      // selected values or all
      selected: getSelectedValues(dim, dimensionSelection),
      values: dim.values.map(v => ({ value: v.name, label: v.title_de })),
      active: !!(dimensionSelection && dimensionSelection[dim.name])
    }))
  }
}

const measureListToState = (schema, dimensionSelection) => {
  return schema.reduce((acc, curr) => {
    acc[curr.id] = measureToState(curr, dimensionSelection[curr.id])
    return acc
  }, {})
}

// TODO maybe move this up to query string parser to not parse strings here
const getDimensionSelection = measures =>
  measures.reduce((acc, curr) => {
    acc[`${curr.statisticId}:${curr.measureId}`] =
      curr.dimensions &&
      curr.dimensions.split(',').reduce((acc, curr) => {
        const [name, selectedValues] = curr.split(':')
        acc[name] = selectedValues ? selectedValues.split('|') : []
        return acc
      }, {})
    return acc
  }, {})

// TODO load from API
const regionToState = region => ({
  ...region,
  ...getNuts(region.id)
})

const useSearchManager = (initialMeasures, initialRegions) => {
  const [fetchSchema] = useManualQuery(SCHEMA_QUERY)
  const [fetchRegion] = useManualQuery(REGION_QUERY)

  const asyncActions = useMemo(
    () => ({
      syncUrl: () => async (dispatch, getState) => {
        Router.push({
          pathname: '/statistics',
          query: stateToQueryArgs(getState())
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
          dispatch(actions.addMeasure(schema.data.measuresCatalog[0]))
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
    }),
    []
  )

  const reducers = useMemo(
    () => ({
      setLoading: state => {
        state.loading = true
        return state
      },
      initializeMeasures: (state, action) => {
        const { schema, dimensionSelection } = action.payload
        state.measures = measureListToState(schema, dimensionSelection)
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
          state.regions[action.payload.id] = regionToState(action.payload)
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
          // TODO this will always replace the current measure to allow a
          // maximum of one measure.
          // change to this as soon as we support more than 1 measure:
          // state.measures[action.payload.id] = measureToState(action.payload)
          state.measures = {
            [action.payload.id]: measureToState(action.payload)
          }
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
        const measure = state.measures[id]
        measure.dimensions = measure.dimensions.map(dim =>
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
    }),
    []
  )

  const initialState = {
    measures: {},
    regions: {},
    error: null,
    measuresLoading: true
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
          measures: initialMeasures.map(measure =>
            _.pick(measure, ['statisticId', 'measureId'])
          )
        }
      })
      if (result.error) {
        dispatch(actions.setError(JSON.stringify(result.error))) // TODO better error handling
      } else {
        dispatch(
          actions.initializeMeasures({
            dimensionSelection: getDimensionSelection(initialMeasures),
            schema: result.data.measuresCatalog
          })
        )
      }
    }
    if (initialMeasures.length > 0) {
      fetch()
    } else {
      dispatch(
        actions.initializeMeasures({
          dimensionSelection: null,
          schema: []
        })
      )
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
    } else {
      dispatch(actions.initializeRegions([]))
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
