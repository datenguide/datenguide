import PropTypes from 'prop-types'
import AutocompleteSearchField from './AutocompleteSearchField'
import RegionSearchParameterCard from './RegionSearchParameterCard'
import StatisticsSearchParameterCard from './MeasureSearchParameterCard'
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
  measures,
  loadMeasureOptions,
  dispatch,
  actions
}) => {
  const classes = useStyles()

  const handleLoadMeasure = measure => {
    dispatch(actions.loadMeasure(measure.value))
  }

  const handleRemoveMeausre = statisticsId => () => {
    dispatch(actions.closeMeasure(statisticsId))
  }

  const handleChangeDimension = value => {
    dispatch(actions.changeDimensionSelection(value))
  }

  const handleLoadRegion = region => {
    dispatch(actions.loadRegion(region.value))
  }

  const handleRemoveRegion = value => () => {
    dispatch(actions.closeRegion(value))
  }

  return (
    <div className={classes.root}>
      <h4>Regionen</h4>
      <AutocompleteSearchField
        onSelectionChange={handleLoadRegion}
        loadOptions={loadRegionOptions}
        placeholder="Regionen suchen"
      />
      {regions.map(region => (
        <RegionSearchParameterCard
          key={region.id}
          region={region}
          onClose={handleRemoveRegion(region.id)}
        />
      ))}
      <h4>Statistiken und Merkmale</h4>
      <AutocompleteSearchField
        onSelectionChange={handleLoadMeasure}
        loadOptions={loadMeasureOptions}
        placeholder="Merkmal oder Statistik suchen"
      />
      {measures.map(measure => (
        <StatisticsSearchParameterCard
          key={measure.id}
          statistic={measure}
          onClose={handleRemoveMeausre(measure.id)}
          onArgumentChange={handleChangeDimension}
        />
      ))}
    </div>
  )
}

QueryParameterSidebar.propTypes = {
  regions: PropTypes.array.isRequired,
  measures: PropTypes.array.isRequired,
  loadRegionOptions: PropTypes.func.isRequired,
  loadMeasureOptions: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  actions: PropTypes.object.isRequired
}

export default QueryParameterSidebar
