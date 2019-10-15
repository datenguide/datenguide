import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import _ from 'lodash'

import Grid from '@material-ui/core/Grid'

import getAttributeArgs from '../lib/schema'
import DefaultLayout from '../layouts/Default'
import DataTable from '../components/DataTable'
import RegionSelectTree from '../components/RegionSelectTree'
import StatisticsSelect from '../components/StatisticsSelect'
import ValueAttributeSelect from '../components/ValueAttributeSelect'

const getFilterSelection = (regions, statisticAndAttribute, args) => {
  if (statisticAndAttribute.length !== 1) {
    return null
  }
  const statistic = statisticAndAttribute[0].value.substr(0, 5)
  const attribute = statisticAndAttribute[0].value.substr(5)

  return {
    regions,
    statistic,
    attribute,
    args
  }
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: '0 80px'
  }
}))

const Detail = () => {
  const classes = useStyles()
  const [filterSelection, setFilterSelection] = useState(null)
  const [statistic, setStatistic] = useState([])
  const [args, setArgs] = useState([])
  const [regions, setRegions] = useState([])

  useEffect(() => {
    const attribute =
      statistic.length === 1 ? statistic[0].value.substr(5) : null
    const attributeArgs = getAttributeArgs(attribute)
    setArgs(attributeArgs.map(arg => ({ ...arg, selected: [] })))
  }, [statistic])

  useEffect(() => {
    setFilterSelection(getFilterSelection(regions, statistic, args))
  }, [statistic, args, regions])

  const handleStatisticSelectionChange = value => {
    setStatistic([value])
  }

  const handleValueAttributeChange = index => event => {
    // TODO this is just a temporary solution, implement proper state management
    const newArgs = _.cloneDeep(args)
    newArgs[index].selected = event.target.value
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
            value={statistic}
          />
          {args.map((arg, index) => {
            return (
              <ValueAttributeSelect
                key={arg.label}
                label={arg.label}
                value={arg.selected}
                options={arg.values}
                onChange={handleValueAttributeChange(index)}
              />
            )
          })}
          <DataTable filterSelection={filterSelection} />
        </Grid>
      </Grid>
    </DefaultLayout>
  )
}

export default Detail
