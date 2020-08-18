import React, { useState } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'

import schema from '../../../../data/statSchema.json'
import inventory from '../../../../data/inventory.json'

import StatisticSelect from './StatisticSelect'
import MeasureSelect from './MeasureSelect'
import RegionLevelSelect from './RegionLevelSelect'
import MeasureSearchCombo from '../../../../components/querytool/MeasureSearchCombo'

const useStyles = makeStyles((theme) => ({
  statisticHeading: {
    paddingTop: '24px',
    width: '100%',
  },
  measureHeading: {
    paddingTop: '8px',
    paddingBottom: '16px',
    color: 'grey',
  },
  comboHeading: {
    paddingTop: '8px',
    paddingBottom: '16px',
  },
  combos: {
    display: 'flex',
    flexDirection: 'row',
    padding: theme.spacing(1, 1),
  },
}))

const DimensionExplorable = () => {
  const classes = useStyles()
  const [statistic, setStatistic] = useState(null)
  const [measure, setMeasure] = useState(null)
  const [level, setLevel] = useState(1)

  const handleStatisticSelect = (statistic) => {
    setStatistic(statistic)
  }

  const handleMeasureSelect = (measure) => {
    setMeasure(measure)
  }

  const handleRegionLevelSelect = (level) => {
    setLevel(level)
  }

  const combos =
    (statistic &&
      measure &&
      level &&
      inventory[statistic.value].measures[measure][level]) ||
    []

  const dimensions =
    statistic &&
    measure &&
    level &&
    Object.keys(schema[statistic.value].measures[measure].dimensions)
      .map((key) => schema[statistic.value].measures[measure].dimensions[key])
      .map((d) => ({ titleDe: d.title_de, name: d.name }))

  return (
    <div>
      <StatisticSelect onSelect={handleStatisticSelect} />
      <MeasureSelect onSelect={handleMeasureSelect} statistic={statistic} />
      <RegionLevelSelect onSelect={handleRegionLevelSelect} />
      <Typography variant="h3" className={classes.statisticHeading}>
        {statistic && statistic.label}
      </Typography>
      <Typography variant="h5" className={classes.measureHeading}>
        {measure &&
          `${measure} - ${schema[statistic.value].measures[measure].title_de}`}
      </Typography>
      {measure && statistic && (
        <Typography variant="h4" className={classes.comboHeading}>
          Kombinationsmöglichkeiten der sachlichen Merkmale
        </Typography>
      )}
      {combos.map((combo, index) => (
        <div key={index} className={classes.combos}>
          <MeasureSearchCombo combo={combo} dimensions={dimensions} />
        </div>
      ))}
    </div>
  )
}

export default DimensionExplorable
