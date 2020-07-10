import PropTypes from 'prop-types'

import { makeStyles, Tab, Tabs } from '@material-ui/core'

import AutocompleteSearchField from './AutocompleteSearchField'
import Paper from '@material-ui/core/Paper'
import { useState } from 'react'
import RegionTreeView from './TreeView'
import useSWR from 'swr'
import StatisticsTreeView from './StatisticsTreeView'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  paper: {
    padding: theme.spacing(2, 2, 0, 2),
    marginBottom: theme.spacing(2),
    // backgroundColor: theme.palette.grey[100],
    flexGrow: 1,
  },
  tabs: {
    width: '100%',
  },
  title: {
    marginTop: theme.spacing(1),
  },
  treeView: {
    marginTop: theme.spacing(2),
  },
}))

const fetcher = (url) => fetch(url).then((r) => r.json())

const QueryParameterSidebar = ({
  loadRegionOptions,
  loadMeasureOptions,
  dispatch,
  actions,
}) => {
  const [tabValue, setTabValue] = useState(0)

  const classes = useStyles()

  const { data: statistics } = useSWR(`/api/statistics`, fetcher)

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
          {/* <h4 className={classes.title}>Regionen</h4> */}
          <AutocompleteSearchField
            onSelectionChange={handleLoadRegion}
            loadOptions={loadRegionOptions}
            placeholder="Regionen suchen"
          />
          <RegionTreeView className={classes.treeView} />
        </Paper>
      )}
      {tabValue === 1 && (
        <Paper className={classes.paper} elevation={0}>
          {/* <h4 className={classes.title}>Statistiken und Merkmale</h4> */}
          <AutocompleteSearchField
            onSelectionChange={handleLoadMeasure}
            loadOptions={loadMeasureOptions}
            placeholder="Merkmal oder Statistik suchen"
          />
          {statistics && (
            <StatisticsTreeView statistics={Object.values(statistics)} />
          )}
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
