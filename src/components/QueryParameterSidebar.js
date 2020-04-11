import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core'

import AutocompleteSearchField from './AutocompleteSearchField'
import RegionSearchParameterCard from './RegionSearchParameterCard'
import StatisticsSearchParameterCard from './MeasureSearchParameterCard'
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  paper: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(4),
  },
  title: {
    marginTop: theme.spacing(1),
  },
}))

const QueryParameterSidebar = ({
  regions,
  loadRegionOptions,
  measures,
  loadMeasureOptions,
  dispatch,
  actions,
}) => {
  const classes = useStyles()

  const handleLoadMeasure = (measure) => {
    dispatch(actions.loadMeasure(measure.value))
  }

  const handleRemoveMeausre = (statisticsId) => () => {
    dispatch(actions.closeMeasure(statisticsId))
  }

  const handleChangeDimension = (value) => {
    dispatch(actions.changeDimensionSelection(value))
  }

  const handleLoadRegion = (region) => {
    dispatch(actions.loadRegion(region.value))
  }

  const handleRemoveRegion = (value) => () => {
    dispatch(actions.closeRegion(value))
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <h4 className={classes.title}>Regionen</h4>
        <AutocompleteSearchField
          onSelectionChange={handleLoadRegion}
          loadOptions={loadRegionOptions}
          placeholder="Regionen suchen"
        />
        {regions.map((region) => (
          <RegionSearchParameterCard
            key={region.id}
            region={region}
            onClose={handleRemoveRegion(region.id)}
          />
        ))}
      </Paper>
      <Paper className={classes.paper}>
        <h4 className={classes.title}>Statistiken und Merkmale</h4>
        <AutocompleteSearchField
          onSelectionChange={handleLoadMeasure}
          loadOptions={loadMeasureOptions}
          placeholder="Merkmal oder Statistik suchen"
        />
        {measures.map((measure) => (
          <StatisticsSearchParameterCard
            key={measure.id}
            statistic={measure}
            onClose={handleRemoveMeausre(measure.id)}
            onArgumentChange={handleChangeDimension}
          />
        ))}
      </Paper>
    </div>
  )
}

QueryParameterSidebar.propTypes = {
  regions: PropTypes.array.isRequired,
  measures: PropTypes.array.isRequired,
  loadRegionOptions: PropTypes.func.isRequired,
  loadMeasureOptions: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  actions: PropTypes.object.isRequired,
}

export default QueryParameterSidebar
