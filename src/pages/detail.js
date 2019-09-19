import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import Grid from '@material-ui/core/Grid'

import DefaultLayout from '../layouts/Default'
import DataTable from '../components/DataTable'
import RegionSelectTree from '../components/RegionSelectTree'
import StatisticsSelect from '../components/StatisticsSelect'

import schema from '../data/schema.json'
import ValueAttributeSelect from '../components/ValueAttributeSelect'

// TODO move to server API and get rid of these transformations
const getArgValues = values =>
  values.map(v => ({
    value: v.value,
    label: v.name
  }))

// TODO move to server API and get rid of these transformations
const getArgs = attribute => {
  const attributeSchema = schema[attribute]
  return attributeSchema
    ? Object.keys(attributeSchema.args).reduce((acc, curr) => {
        const value = attributeSchema.args[curr]
        const option = {
          value: curr,
          label: value.name,
          description: value.description,
          values: getArgValues(attributeSchema.args[curr].values)
        }
        acc.push(option)
        return acc
      }, [])
    : []
}

const getFilterSelection = (statistic, args) => {
  if (statistic.length !== 1) {
    return null
  }
  const sourceStatistic = statistic[0].value.substr(0, 5)
  const attribute = statistic[0].value.substr(5)
  const selectedArgs = args
    .map(arg => ({
      value: arg.value,
      values: arg.values.filter(v => v.checked === 'on')
    }))
    .filter(arg => arg.values.length > 0)

  return {
    statistic: sourceStatistic,
    attribute,
    args: selectedArgs
  }
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  }
}))

const Detail = () => {
  const classes = useStyles()
  const [filterSelection, setFilterSelection] = useState({})
  const [statistic, setStatistic] = useState([])
  const [args, setArgs] = useState([])

  useEffect(() => {
    const attribute =
      statistic.length === 1 ? statistic[0].value.substr(5) : null
    setArgs(getArgs(attribute))
  }, [statistic])

  useEffect(() => {
    setFilterSelection(getFilterSelection(statistic, args))
  }, [statistic, args])

  const handleStatisticSelectionChange = value => {
    setStatistic([value])
  }

  return (
    <DefaultLayout>
      <Grid container spacing={3} className={classes.root}>
        <Grid item xs={4}>
          <h2>Regionen</h2>
          <RegionSelectTree />
        </Grid>
        <Grid item xs={8}>
          <h2>Statistiken und Merkmale</h2>
          <StatisticsSelect
            onSelectionChange={handleStatisticSelectionChange}
            value={statistic}
          />
          {args.map(arg => (
            <ValueAttributeSelect />
          ))}
          <DataTable filterSelection={filterSelection} />
        </Grid>
      </Grid>
    </DefaultLayout>
  )
}

export default Detail
