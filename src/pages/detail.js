import React from 'react'
import { useImmerReducer } from 'use-immer'
import { createActions } from '../lib/redux'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'

import Snackbar from '@material-ui/core/Snackbar'

import { getSchema } from '../lib/schema'
import DrawerLayout from '../layouts/Drawer'
// import DataTable from '../components/DataTable'
import AutocompleteSearchField from '../components/AutocompleteSearchField'
import { findInvalidRegionIds } from './api/region'
import RegionSearchParameterCard from '../components/RegionSearchParameterCard'
import StatisticsSearchParameterCard from '../components/StatisticSearchParameterCard'
import DataTable from '../components/DataTable'

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
  'updateStatisticsArguments'
])

const reducer = (state, action) => {
  console.log('reducing -- state', JSON.stringify(state, null, 2))
  console.log('reducing -- action', JSON.stringify(action, null, 2))
  switch (action.type) {
    case 'addRegion':
      state.regions.push(action.payload)
      return state
    case 'removeRegion':
      state.regions = state.regions.filter(r => r.value !== action.payload)
      return state
    case 'addStatistic':
      const statisticsId = action.payload.value
      const schema = getSchema(statisticsId)
      schema.args = schema.args.map(arg => ({
        ...arg,
        selected: [],
        active: false
      }))
      state.statistics[statisticsId] = schema
      return state
    case 'removeStatistic':
      delete state.statistics[action.payload]
      return state
    case 'updateStatisticsArguments':
      const { statisticAndAttribute, argCode, change } = action.payload
      debugger
      state.statistics[statisticAndAttribute].args = state.statistics[
        statisticAndAttribute
      ].args.map(arg => (arg.value === argCode ? { ...arg, ...change } : arg))
      return state
    default:
      throw new Error(`unknown action ${action.type}`)
  }
}

const Detail = ({ initialStatistics, initialRegions, initialError }) => {
  const classes = useStyles()

  const [state, dispatch] = useImmerReducer(reducer, {
    regions: initialRegions,
    statistics: initialStatistics,
    error: initialError
  })

  console.log('state', JSON.stringify(state, null, 2))

  const loadStatisticsOptions = async (value = '') => {
    const result = await fetch(`/api/search/statistics?filter=${value}`)
    return result.json()
  }

  const handleStatisticChange = statistic => {
    dispatch(actions.addStatistic(statistic))
  }

  const handleStatisticsClose = statisticsId => () => {
    dispatch(actions.removeStatistic(statisticsId))
  }

  const handleStatisticsArgumentChange = value => {
    dispatch(actions.updateStatisticsArguments(value))
  }

  const loadRegionOptions = async (value = '') => {
    const result = await fetch(`/api/search/regions?filter=${value}`)
    return result.json()
  }

  const handleRegionChange = value => {
    dispatch(actions.addRegion(value))
  }

  const handleRegionCardClose = value => () => {
    dispatch(actions.removeRegion(value))
  }

  const { regions, statistics, error } = state

  return (
    <DrawerLayout
      drawerContent={
        <>
          <h2>Regionen</h2>
          <AutocompleteSearchField
            onSelectionChange={handleRegionChange}
            loadOptions={loadRegionOptions}
            label="Regionen"
            placeholder="Regionen suchen"
          />
          {regions.map(region => (
            <RegionSearchParameterCard
              key={region.value}
              region={region}
              onClose={handleRegionCardClose(region.value)}
            />
          ))}
          <h2>Statistiken und Merkmale</h2>
          <AutocompleteSearchField
            onSelectionChange={handleStatisticChange}
            loadOptions={loadStatisticsOptions}
            label="Statistiken und Merkmale"
            placeholder="Merkmal oder Statistik suchen"
          />
          {Object.keys(statistics).map(id => (
            <StatisticsSearchParameterCard
              key={id}
              statistic={state.statistics[id]}
              onClose={handleStatisticsClose(id)}
              onArgumentChange={handleStatisticsArgumentChange}
            />
          ))}
        </>
      }
    >
      <main className={classes.content}>
        <DataTable
          regions={regions}
          statistics={statistics}
        />
      </main>

      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        open={error !== null}
        onClose={() => setError(null)}
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
