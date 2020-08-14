import PropTypes from 'prop-types'
import useSWR from 'swr'
import { useState } from 'react'
import getConfig from 'next/config';

import { makeStyles, Tab, Tabs } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'

import StatisticsTreeView from './StatisticsTreeView'
import fetcher from '../../lib/fetcher'
import RegionsTreeView from './RegionsTreeView'

const { publicRuntimeConfig } = getConfig();


const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  paper: {
    padding: theme.spacing(2, 0),
    marginBottom: theme.spacing(2),
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

const QueryParameterSidebar = ({ dispatch, actions }) => {
  const [tabValue, setTabValue] = useState(0)

  const classes = useStyles()

  const { data: statistics } = useSWR(`/api/statistics`, fetcher)
  const { data: regionData } = useSWR(
    `${publicRuntimeConfig.datenguideApiUrl}/catalog/regions?nuts=1&$children=true&$limit=16`,
    fetcher
  )

  const handleLoadMeasure = (measure) => {
    dispatch(actions.loadMeasure(measure))
  }

  const handleLoadRegion = (id) => {
    dispatch(actions.loadRegion(id))
  }

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  const regions = regionData ? regionData.data : []

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
          {regionData && (
            <RegionsTreeView
              nodes={Object.values(regions)}
              onSelect={handleLoadRegion}
            />
          )}
        </Paper>
      )}
      {tabValue === 1 && (
        <Paper className={classes.paper} elevation={0}>
          {statistics && (
            <StatisticsTreeView
              nodes={Object.values(statistics)}
              onSelect={handleLoadMeasure}
            />
          )}
        </Paper>
      )}
    </div>
  )
}

QueryParameterSidebar.propTypes = {
  dispatch: PropTypes.func.isRequired,
  actions: PropTypes.object.isRequired,
}

export default QueryParameterSidebar
