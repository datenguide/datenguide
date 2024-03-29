import PropTypes from 'prop-types'
import { useState } from 'react'

import { makeStyles } from '@mui/styles'
import Snackbar from '@mui/material/Snackbar'
import Paper from '@mui/material/Paper'
import HelpIcon from '@mui/icons-material/Help'
import Button from '@mui/material/Button'

import DataTable from '@/components/querytool/DataTable'
import QueryParameterSidebar from '@/components/querytool/QueryParameterSidebar'
import { queryArgsToState, stateToQueryArgs } from '../../lib/queryString'
import useSearchManager from '../../lib/useSearchManager'
import DockedDrawerLayout from '../../layouts/DockedDrawerLayout'
import RegionSearchParameterCard from '@/components/querytool/RegionSearchParameterCard'
import MeasureSearchParameterCard from '@/components/querytool/MeasureSearchParameterCard'
import RegionEmptyState from '@/components/querytool/RegionEmptyState'
import MeasureEmptyState from '@/components/querytool/MeasureEmptyState'
import Disclaimer from '@/components/querytool/Disclaimer'

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[100],
  },
  headline: {
    paddingTop: theme.spacing(3),
    paddingLeft: theme.spacing(5),
    marginBottom: theme.spacing(0),
  },
  helpsection: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  disclaimer: {
    flex: '1 1 auto',
  },
  helpButton: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(2),
    padding: theme.spacing(1, 2),
  },
  helptext: {
    marginLeft: theme.spacing(3),
    textDecoration: 'none',
  },
  sidebar: {
    padding: theme.spacing(0, 2),
    height: '100%',
  },
  paper: {
    height: '300px',
    width: '100%',
    overflowX: 'auto',
  },
  sectionPaper: {
    minHeight: theme.spacing(12),
    marginBottom: theme.spacing(2),
    background: theme.palette.grey[100],
  },
  sectionTitle: {
    margin: theme.spacing(0, 0, 2, 0),
  },
  regionssection: {},
  measuressection: {},
  datasection: {
    display: 'flex',
    flexGrow: 1,
  },
  emptyState: {
    marginTop: theme.spacing(2),
  },
}))

const Detail = ({
  initialMeasures,
  initialRegions,
  initialLabels,
  initialLayout,
  initialTime,
  initialLevel,
}) => {
  const classes = useStyles()

  const [state, dispatch, actions] = useSearchManager(
    initialMeasures,
    initialRegions,
    initialLabels,
    initialLayout,
    initialTime,
    initialLevel
  )

  const { measures, regions, labels, layout, level, error } = state

  const queryArgs = stateToQueryArgs(state)

  const [drawerOpen, setDrawerOpen] = useState(false)

  const handleRemoveMeasure = (statisticsId) => () => {
    dispatch(actions.closeMeasure(statisticsId))
  }

  const handleDimensionChange = (value) => {
    dispatch(actions.changeDimensionSelection(value))
  }

  const handleDimensionValuesChange = (value) => {
    dispatch(actions.changeDimensionValues(value))
  }

  const handleRemoveRegion = (value) => () => {
    dispatch(actions.closeRegion(value))
  }

  const handleRegionLevelChange = (value) => {
    dispatch(actions.changeRegionLevel({ level: value }))
  }

  const handleToggleDrawer = (open) => {
    setDrawerOpen(open)
  }

  return (
    <DockedDrawerLayout
      drawerContent={
        <div className={classes.sidebar}>
          <QueryParameterSidebar dispatch={dispatch} actions={actions} />
        </div>
      }
      drawerOpen={drawerOpen}
      onToggleDrawer={handleToggleDrawer}
    >
      <Disclaimer />

      <main className={classes.content}>
        <div className={classes.helpsection}>
          <Button
            color="secondary"
            className={classes.helpButton}
            startIcon={<HelpIcon href="/statistik-erklaert/dimensions" />}
          >
            Hilfe
          </Button>
        </div>
        <div className={classes.regionssection}>
          <Paper elevation={0} className={classes.sectionPaper}>
            {regions.length === 0 && (
              <RegionEmptyState
                dispatch={dispatch}
                actions={actions}
                onToggleDrawer={handleToggleDrawer}
              />
            )}
            {regions.map((region) => (
              <RegionSearchParameterCard
                key={region.id}
                region={region}
                level={level}
                onClose={handleRemoveRegion(region.id)}
                onRegionLevelChange={handleRegionLevelChange}
              />
            ))}
            {measures.length === 0 && (
              <MeasureEmptyState
                dispatch={dispatch}
                actions={actions}
                onToggleDrawer={handleToggleDrawer}
              />
            )}
            {measures.map((measure) => (
              <MeasureSearchParameterCard
                key={measure.id}
                statistic={measure}
                onClose={handleRemoveMeasure(measure.id)}
                onDimensionChange={handleDimensionChange}
                onDimensionValuesChange={handleDimensionValuesChange}
              />
            ))}
          </Paper>
        </div>
        <div className={classes.datasection}>
          <DataTable
            regions={regions}
            measures={measures}
            labels={labels}
            layout={layout}
            dispatch={dispatch}
            actions={actions}
            queryArgs={queryArgs}
          />
        </div>
      </main>

      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={error !== null}
        onClose={() => dispatch(actions.setError(null))}
        autoHideDuration={6000}
        message={<span>{error}</span>}
      />
    </DockedDrawerLayout>
  )
}

Detail.propTypes = {
  initialMeasures: PropTypes.array.isRequired,
  initialRegions: PropTypes.array.isRequired,
  initialLabels: PropTypes.string.isRequired,
  initialLayout: PropTypes.string.isRequired,
  initialTime: PropTypes.string.isRequired,
}

export async function getServerSideProps({ query }) {
  const { measures, regions, labels, level, time, layout } = queryArgsToState(
    query
  )

  return {
    props: {
      initialMeasures: measures.map((m) => ({
        ...m,
        dimensions: m.dimensions !== undefined ? m.dimensions : null, // undefined not allowed here TODO avoid earlier
      })),
      initialRegions: regions,
      initialLabels: labels || 'name',
      initialLayout: layout || 'long',
      initialTime: time || '',
      initialLevel: (level && Number(level)) || 1,
    },
  }
}

export default Detail
