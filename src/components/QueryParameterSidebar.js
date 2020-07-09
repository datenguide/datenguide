import PropTypes from 'prop-types'

import { makeStyles, Tab, Tabs } from '@material-ui/core'

import AutocompleteSearchField from './AutocompleteSearchField'
import Paper from '@material-ui/core/Paper'
import { useState } from 'react'

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
    flexGrow: 1,
  },
  tabs: {
    width: '100%',
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
  const [tabValue, setTabValue] = useState(0)

  const classes = useStyles()

  const handleLoadMeasure = (measure) => {
    dispatch(actions.loadMeasure(measure.value))
  }

  const handleLoadRegion = (region) => {
    dispatch(actions.loadRegion(region.value))
  }

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  return (
    <div className={classes.root}>
      <Tabs
        value={tabValue}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleTabChange}
        className={classes.tabs}
        variant="fullWidth"
      >
        <Tab label="Regionen" />
        <Tab label="Statistiken" />
      </Tabs>
      {tabValue === 0 && (
        <Paper className={classes.paper} elevation={0}>
          <h4 className={classes.title}>Regionen</h4>
          <AutocompleteSearchField
            onSelectionChange={handleLoadRegion}
            loadOptions={loadRegionOptions}
            placeholder="Regionen suchen"
          />
        </Paper>
      )}
      {tabValue === 1 && (
        <Paper className={classes.paper} elevation={0}>
          <h4 className={classes.title}>Statistiken und Merkmale</h4>
          <AutocompleteSearchField
            onSelectionChange={handleLoadMeasure}
            loadOptions={loadMeasureOptions}
            placeholder="Merkmal oder Statistik suchen"
          />
        </Paper>
      )}
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
