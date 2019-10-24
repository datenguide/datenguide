import React from 'react'
import PropTypes from 'prop-types'
import AutocompleteSearchField from './AutocompleteSearchField'
import RegionSearchParameterCard from './RegionSearchParameterCard'
import StatisticsSearchParameterCard from './StatisticSearchParameterCard'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
    backgroundColor: '#f5f5f5',
    height: '100%'
  }
}))

const QueryParameterSidebar = ({
  regions,
  loadRegionOptions,
  statistics,
  loadStatisticsOptions,
  dispatch,
  actions
}) => {
  const classes = useStyles()

  const handleStatisticChange = statistic => {
    dispatch(actions.addStatistic(statistic))
  }

  const handleStatisticsClose = statisticsId => () => {
    dispatch(actions.removeStatistic(statisticsId))
  }

  const handleStatisticsArgumentChange = value => {
    dispatch(actions.updateStatisticsArguments(value))
  }

  const handleRegionChange = value => {
    dispatch(actions.addRegion(value))
  }

  const handleRegionCardClose = value => () => {
    dispatch(actions.removeRegion(value))
  }

  return (
    <div className={classes.root}>
      <h4>Regionen</h4>
      <AutocompleteSearchField
        onSelectionChange={handleRegionChange}
        loadOptions={loadRegionOptions}
        placeholder="Regionen suchen"
      />
      {regions.map(region => (
        <RegionSearchParameterCard
          key={region.value}
          region={region}
          onClose={handleRegionCardClose(region.value)}
        />
      ))}
      <h4>Statistiken und Merkmale</h4>
      <AutocompleteSearchField
        onSelectionChange={handleStatisticChange}
        loadOptions={loadStatisticsOptions}
        placeholder="Merkmal oder Statistik suchen"
      />
      {Object.keys(statistics).map(id => (
        <StatisticsSearchParameterCard
          key={id}
          statistic={statistics[id]}
          onClose={handleStatisticsClose(id)}
          onArgumentChange={handleStatisticsArgumentChange}
        />
      ))}
    </div>
  )
}

QueryParameterSidebar.propTypes = {
  regions: PropTypes.array.isRequired,
  statistics: PropTypes.object.isRequired,
  loadRegionOptions: PropTypes.func.isRequired,
  loadStatisticsOptions: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  actions: PropTypes.object.isRequired
}

export default QueryParameterSidebar
