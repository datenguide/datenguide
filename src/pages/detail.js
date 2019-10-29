import React from 'react'
import { useImmerReducer } from 'use-immer'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles'
import Snackbar from '@material-ui/core/Snackbar'

import { createActions } from '../lib/redux'
import { getSchema } from '../pages/api/schema'
import DrawerLayout from '../layouts/Drawer'
import { findInvalidRegionIds } from './api/region'
import DataTable from '../components/DataTable'
import QueryParameterSidebar from '../components/QueryParameterSidebar'

const useStyles = makeStyles(theme => ({
  main: {
    display: 'block',
    padding: theme.spacing(3)
  }
}))

const actions = createActions([
  'addRegion',
  'removeRegion',
  'addStatistic',
  'removeStatistic',
  'updateStatisticsArguments',
  'updateError'
])

const getStatisticStateObject = statisticId => {
  const schema = getSchema(statisticId)
  schema.args = schema.args.map(arg => ({
    ...arg,
    selected: arg.values.map(a => a.value),
    active: false
  }))
  return schema
}

const getRegionStateObject = regionId => {
  const region = getRegion(regionId)
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'addRegion':
      const regionId = action.payload.value
      state.regions[regionId] = getRegionStateObject(regionId)
      return state
    case 'removeRegion':
      delete state.statistics[action.payload]
      return state
    case 'addStatistic':
      const statisticId = action.payload.value
      state.statistics[statisticId] = getStatisticStateObject(statisticId)
      return state
    case 'removeStatistic':
      delete state.statistics[action.payload]
      return state
    case 'updateStatisticsArguments':
      const { statisticAndAttribute, argCode, change } = action.payload
      state.statistics[statisticAndAttribute].args = state.statistics[
        statisticAndAttribute
      ].args.map(arg =>
        arg.value === argCode
          ? {
              ...arg,
              ...change
            }
          : arg
      )
      return state
    case 'updateError':
      state.error = null
      return state
    default:
      throw new Error(`unknown action ${action.type}`)
  }
}

const loadStatisticsOptions = async (value = '') => {
  const result = await fetch(`/api/search/statistics?filter=${value}`)
  const json = await result.json()
  return json.map(statistic => {
    const split = statistic.label.split('-').map(s => s.trim()) // TODO fetch data in proper format to avoid this
    return {
      value: statistic.value,
      label: split[1],
      description: split[0]
    }
  })
}

const loadRegionOptions = async (value = '') => {
  const result = await fetch(`/api/search/regions?filter=${value}`)
  const json = await result.json()
  return json.map(region => ({
    value: region.value,
    label: region.name,
    description: `Bundesland, id: ${region.value}` // TODO define description, add nuts level description (Bundesland, Kreis etc)
  }))
}

const Detail = ({ initialStatistics, initialRegions, initialError }) => {
  const classes = useStyles()

  const [state, dispatch] = useImmerReducer(reducer, {
    regions: initialRegions,
    statistics: initialStatistics,
    error: initialError
  })

  const { regions, statistics, error } = state

  return (
    <DrawerLayout
      drawerContent={
        <QueryParameterSidebar
          regions={regions}
          statistics={statistics}
          loadRegionOptions={loadRegionOptions}
          loadStatisticsOptions={loadStatisticsOptions}
          dispatch={dispatch}
          actions={actions}
        />
      }
    >
      <main className={classes.content}>
        <DataTable regions={regions} statistics={statistics} />
      </main>

      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        open={error !== null}
        onClose={() => dispatch(actions.updateError(null))}
        autoHideDuration={6000}
        message={<span>{error}</span>}
      />
    </DrawerLayout>
  )
}

Detail.propTypes = {
  initialStatistics: PropTypes.arrayOf(PropTypes.string),
  initialRegions: PropTypes.arrayOf(PropTypes.string),
  initialError: PropTypes.string
}

Detail.defaultProps = {
  initialStatisticAndAttribute: null,
  initialRegions: [],
  initialError: null
}

Detail.getInitialProps = async function({ query }) {
  let initialError = null
  let initialRegions = []

  if (query.regions) {
    initialRegions = query.regions.split(',')
    const invalidRegions = findInvalidRegionIds(initialRegions)
    if (invalidRegions.length !== 0) {
      initialError = `Skipping invalid region${
        invalidRegions.length > 1 ? 's' : ''
      }: ${invalidRegions.join(',')}`
      initialRegions = initialRegions.filter(
        region => !invalidRegions.includes(region)
      )
    }
  }

  let initialStatistics = {}
  if (query.statistic && query.attribute) {
    const result = await fetch(
      `http://localhost:3000/api/statistics?filter=${query.statistic} ${query.attribute}`
    )
    const jsonResult = await result.json()
    if (jsonResult.length === 1) {
      initialStatistics = jsonResult[0]
    } else {
      initialError = `Could not find statistic ${query.statistic} / attribute ${query.attribute}`
    }
  }

  return {
    initialStatistics,
    initialRegions,
    initialError
  }
}

export default Detail
