import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import _ from 'lodash'

import Grid from '@material-ui/core/Grid'
import Snackbar from '@material-ui/core/Snackbar'
import CloseIcon from '@material-ui/icons/Close'

import { getAttributeArgs, extractAttribute } from '../lib/schema'
import DefaultLayout from '../layouts/Default'
import DataTable from '../components/DataTable'
import RegionSelectTree from '../components/RegionSelectTree'
import StatisticsSelect from '../components/StatisticsSelect'
import ValueAttributeSelect from '../components/ValueAttributeSelect'
import { findInvalidRegionIds } from './api/region'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: '0 80px'
  }
}))

const Detail = ({
  initialStatisticAndAttribute,
  initialRegions,
  initialError
}) => {
  const classes = useStyles()
  const [statisticAndAttribute, setStatisticAndAttribute] = useState(
    initialStatisticAndAttribute
  )
  const [args, setArgs] = useState([])
  const [regions, setRegions] = useState(initialRegions)
  const [error, setError] = useState(initialError)

  useEffect(() => {
    const attribute = extractAttribute(statisticAndAttribute)
    const attributeArgs = getAttributeArgs(attribute)
    setArgs(attributeArgs.map(arg => ({ ...arg, selected: [], active: false })))
  }, [statisticAndAttribute])

  const handleStatisticSelectionChange = value => {
    setStatisticAndAttribute(value)
  }

  const handleValueAttributeChange = index => event => {
    // TODO this is just a temporary solution, implement proper state management
    const newArgs = _.cloneDeep(args)
    newArgs[index].selected = event.target.value
    setArgs(newArgs)
  }

  const handleValueAttributeToggle = event => {
    // TODO this is just a temporary solution, implement proper state management
    const newArgs = _.cloneDeep(args)
    const toggledArg = newArgs.find(arg => arg.value === event.target.value)
    toggledArg.active = event.target.checked
    toggledArg.selected = event.target.checked
      ? toggledArg.values.map(v => v.value)
      : []
    setArgs(newArgs)
  }

  const handleRegionSelectionChange = newRegions => {
    setRegions(newRegions)
  }

  return (
    <DefaultLayout>
      <Grid container spacing={3} className={classes.root}>
        <Grid item xs={4}>
          <h2>Regionen</h2>
          <RegionSelectTree
            checked={regions}
            onChecked={handleRegionSelectionChange}
          />
        </Grid>
        <Grid item xs={8}>
          <h2>Statistiken und Merkmale</h2>
          <StatisticsSelect
            onSelectionChange={handleStatisticSelectionChange}
            value={statisticAndAttribute}
          />
          {args.map((arg, index) => {
            return (
              <ValueAttributeSelect
                key={arg.label}
                name={arg.value}
                label={arg.label}
                value={arg.selected}
                options={arg.values}
                active={arg.active}
                onChange={handleValueAttributeChange(index)}
                onToggle={handleValueAttributeToggle}
              />
            )
          })}
          <DataTable
            regions={regions}
            statisticAndAttribute={statisticAndAttribute}
            args={args}
          />
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
  initialStatisticAndAttribute: PropTypes.string,
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

  let initialStatisticAndAttribute = null
  if (query.statistic && query.attribute) {
    const result = await fetch(
      `http://localhost:3000/api/statistics?filter=${query.statistic} ${query.attribute}`
    )
    const jsonResult = await result.json()
    if (jsonResult.length === 1) {
      initialStatisticAndAttribute = jsonResult[0]
    } else {
      initialError = `Could not find statistic ${query.statistic} / attribute ${query.attribute}`
    }
  }

  return {
    initialStatisticAndAttribute,
    initialRegions,
    initialError
  }
}

export default Detail
