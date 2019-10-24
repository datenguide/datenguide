import React, { useEffect, useState } from 'react'
import { useImmerReducer } from 'use-immer'
import { createActions } from '../lib/redux'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import _ from 'lodash'

import Grid from '@material-ui/core/Grid'
import Snackbar from '@material-ui/core/Snackbar'

import { getAttributeArgs, extractAttribute } from '../lib/schema'
import DefaultLayout from '../layouts/Default'
// import DataTable from '../components/DataTable'
import AutocompleteSearchField from '../components/AutocompleteSearchField'
import ValueAttributeSelect from '../components/ValueAttributeSelect'
import { findInvalidRegionIds } from './api/region'
import RegionSearchParameterCard from '../components/RegionSearchParameterCard'
import StatisticsSearchParameterCard from '../components/StatisticSearchParameterCard'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: '0 80px'
  },
  sidebar: {
    background: '#f5f5f5',
    height: '100%'
  }
}))

const actions = createActions([
  'addRegion',
  'removeRegion'
  'addStatistic',
  'removeStatistic',
])

// region: { value, name, label}
// statistic: { value, label}

const reducer = (state, action) => {
  console.log('reducing -- state', JSON.stringify(state, null, 2))
  console.log('reducing -- action', JSON.stringify(action, null, 2))
  switch (action.type) {
    case 'addRegion':
      state.regions.push(action.payload)
      return state
    case 'removeRegion':
      state.regions = state.regions.filter(r => r.value !== action.payload.value)
      return state
    case 'addStatistic':
      state.statistics.push(action.payload)
      return state
    case 'removeStatistic':
      state.statistics = state.statistics.filter(s => s.value !== action.payload.value)
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

  // const [statistics, setStatistics] = useState(initialStatistics)
  // const [args, setArgs] = useState([])
  // const [regions, setRegions] = useState(initialRegions)
  // const [error, setError] = useState(initialError)
  //
  // useEffect(() => {
  //   const attribute = extractAttribute(statistics)
  //   const attributeArgs = getAttributeArgs(attribute)
  //   setArgs(attributeArgs.map(arg => ({ ...arg, selected: [], active: false })))
  // }, [statistics])

  // statistics selection

  const loadStatisticsOptions = async (value = '') => {
    const result = await fetch(`/api/search/statistics?filter=${value}`)
    return result.json()
  }

  const handleStatisticSelectionChange = value => {
    dispatch(actions.addStatistic(value))
  }

  const handleStatisticsClose = value => {
    dispatch(actions.removeStatistic(value))
  }

  const handleValueAttributeChange = index => event => {
    // // TODO this is just a temporary solution, implement proper state management
    // const newArgs = _.cloneDeep(args)
    // newArgs[index].selected = event.target.value
    // setArgs(newArgs)
    // dispatch(actions.addStatistic, event.target.value)
  }

  const handleValueAttributeToggle = event => {
    // // TODO this is just a temporary solution, implement proper state management
    // const newArgs = _.cloneDeep(args)
    // const toggledArg = newArgs.find(arg => arg.value === event.target.value)
    // toggledArg.active = event.target.checked
    // toggledArg.selected = event.target.checked
    //   ? toggledArg.values.map(v => v.value)
    //   : []
    // setArgs(newArgs)
    // dispatch(actions.toggleAttribute, event.target)
  }

  // regions selections

  const loadRegionOptions = async (value = '') => {
    const result = await fetch(`/api/search/regions?filter=${value}`)
    return result.json()
  }

  const handleRegionSelectionChange = value => {
    dispatch(actions.addRegion(value))
  }

  const handleRegionCardClose = region => () => {
    dispatch(actions.removeRegion(region))
  }

  const { regions, statistics, error } = state

  return (
    <DefaultLayout>
      <Grid container spacing={3} className={classes.root}>
        <Grid item xs={4} className={classes.sidebar}>
          <h2>Regionen</h2>
          <AutocompleteSearchField
            onSelectionChange={handleRegionSelectionChange}
            loadOptions={loadRegionOptions}
            label="Regionen"
            placeholder="Regionen suchen"
          />
          {regions.map((region, index) => (
            <RegionSearchParameterCard
              key={index}
              title={region.name}
              subheader={region.value}
              text=""
              onClose={handleRegionCardClose(region)}
            />
          ))}
          <h2>Statistiken und Merkmale</h2>
          <AutocompleteSearchField
            onSelectionChange={handleStatisticSelectionChange}
            loadOptions={loadStatisticsOptions}
            label="Statistiken und Merkmale"
            placeholder="Merkmal oder Statistik suchen"
          />
          {statistics.map((statistic, index) => (
            <StatisticsSearchParameterCard
              key={index}
              title={statistic.name}
              subheader={statistic.value}
              text=""
              onClose={handleStatisticsClose(statistic)}
            />
          ))}
          {/*{args.map((arg, index) => {*/}
          {/*  return (*/}
          {/*    <ValueAttributeSelect*/}
          {/*      key={arg.label}*/}
          {/*      name={arg.value}*/}
          {/*      label={arg.label}*/}
          {/*      value={arg.selected}*/}
          {/*      options={arg.values}*/}
          {/*      active={arg.active}*/}
          {/*      onChange={handleValueAttributeChange(index)}*/}
          {/*      onToggle={handleValueAttributeToggle}*/}
          {/*    />*/}
          {/*  )*/}
          {/*})}*/}
        </Grid>
        <Grid item xs={8}>
          {/*<DataTable*/}
          {/*  regions={regions}*/}
          {/*  statistics={statistics}*/}
          {/*  args={args}*/}
          {/*/>*/}
        </Grid>
      </Grid>
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
    </DefaultLayout>
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

  let initialStatistics = []
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
