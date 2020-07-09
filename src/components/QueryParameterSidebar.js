import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core'

import AutocompleteSearchField from './AutocompleteSearchField'
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
    backgroundColor: theme.palette.grey[100],
  },
  title: {
    marginTop: theme.spacing(1),
  },
}))

const QueryParameterSidebar = ({
  loadRegionOptions,
  loadMeasureOptions,
  dispatch,
  actions,
}) => {
  const classes = useStyles()

  const handleLoadMeasure = (measure) => {
    dispatch(actions.loadMeasure(measure.value))
  }

  const handleLoadRegion = (region) => {
    dispatch(actions.loadRegion(region.value))
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper} elevation={0}>
        <h4 className={classes.title}>Regionen</h4>
        <AutocompleteSearchField
          onSelectionChange={handleLoadRegion}
          loadOptions={loadRegionOptions}
          placeholder="Regionen suchen"
        />
      </Paper>
      <Paper className={classes.paper} elevation={0}>
        <h4 className={classes.title}>Statistiken und Merkmale</h4>
        <AutocompleteSearchField
          onSelectionChange={handleLoadMeasure}
          loadOptions={loadMeasureOptions}
          placeholder="Merkmal oder Statistik suchen"
        />
      </Paper>
    </div>
  )
}

QueryParameterSidebar.propTypes = {
  loadRegionOptions: PropTypes.func.isRequired,
  loadMeasureOptions: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  actions: PropTypes.object.isRequired,
}

export default QueryParameterSidebar
