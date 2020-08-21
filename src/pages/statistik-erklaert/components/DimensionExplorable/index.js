import React, { useEffect, useState } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'

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
    paddingBottom: '16px',
    color: 'grey',
  },
  comboHeading: {
    paddingTop: '8px',
  },
  combos: {
    display: 'flex',
    flexDirection: 'row',
    padding: theme.spacing(1, 1),
    marginBottom: theme.spacing(2),
    background: '#f5f5f5',
    height: '60px',
    alignItems: 'center',
  },
  comboLinkWrapper: {
    flex: '1 0 auto',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  comboLink: {
    color: theme.palette.grey[0],
    textDecoration: 'none',
  },
  icon: {
    marginTop: '2px',
  },
}))

const getQueryToolLink = (statistic, measure, combo) => {
  return `/statistiken?data=${statistic.value}:${measure}(${combo})&labels=id&layout=long`
}

const DimensionExplorable = () => {
  const classes = useStyles()
  const [statistic, setStatistic] = useState(null)
  const [measure, setMeasure] = useState(null)
  const [level, setLevel] = useState(1)

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * 4)
    const presets = [
      {
        statistic: { value: '12111', label: '12111 - Zensus 2011' },
        measure: 'ERWZ01',
      },
      {
        statistic: { value: '12511', label: '12511 - Einbürgerungsstatistik' },
        measure: 'BEV008',
      },
      {
        statistic: {
          value: '41120',
          label: '41120 - Allgemeine Agrarstrukturerhebung (bis 2007)',
        },
        measure: 'FLC017',
      },
      {
        statistic: {
          value: '12611',
          label: '12611 - Statistik der Eheschließungen',
        },
        measure: 'BEV003',
      },
    ]
    const randomPreset = presets[randomIndex]
    setStatistic(randomPreset.statistic)
    setMeasure(randomPreset.measure)
  }, [])

  const handleStatisticSelect = (statistic) => {
    setMeasure(null)
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
      <StatisticSelect onSelect={handleStatisticSelect} statistic={statistic} />
      <MeasureSelect
        onSelect={handleMeasureSelect}
        statistic={statistic}
        measure={measure}
      />
      <RegionLevelSelect onSelect={handleRegionLevelSelect} />
      <Typography variant="h4" className={classes.statisticHeading}>
        {statistic && statistic.label}
      </Typography>
      <Typography variant="h5" className={classes.measureHeading}>
        {measure &&
          `${measure} - ${schema[statistic.value].measures[measure].title_de}`}
      </Typography>
      {measure && statistic && (
        <Typography variant="h5" className={classes.comboHeading}>
          Kombinationsmöglichkeiten der sachlichen Merkmale
        </Typography>
      )}
      {combos.map((combo, index) => (
        <Paper key={index} className={classes.combos}>
          <MeasureSearchCombo combo={combo} dimensions={dimensions} />
          <div className={classes.comboLinkWrapper}>
            <ArrowForwardIcon className={classes.icon} color="secondary" />
            <a
              href={getQueryToolLink(statistic, measure, combo)}
              className={classes.comboLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Im Datenportal abfragen
            </a>
          </div>
        </Paper>
      ))}
    </div>
  )
}

export default DimensionExplorable
