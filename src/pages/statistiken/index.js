import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles'
import Snackbar from '@material-ui/core/Snackbar'
import Paper from '@material-ui/core/Paper'
import HelpIcon from '@material-ui/icons/Help'

import DataTable from '../../components/querytool/DataTable'
import QueryParameterSidebar from '../../components/querytool/QueryParameterSidebar'
import { queryArgsToState, stateToQueryArgs } from '../../lib/queryString'
import useSearchManager from '../../lib/useSearchManager'
import DockedDrawerLayout from '../../layouts/DockedDrawerLayout'
import RegionSearchParameterCard from '../../components/querytool/RegionSearchParameterCard'
import MeasureSearchParameterCard from '../../components/querytool/MeasureSearchParameterCard'
import RegionEmptyState from '../../components/querytool/RegionEmptyState'
import MeasureEmptyState from '../../components/querytool/MeasureEmptyState'

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
  helpwrapper: {
    position: 'relative',
    color: theme.palette.secondary.dark,
  },
  helpicon: {
    position: 'absolute',
    marginTop: '2px',
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
  initialLevel,
}) => {
  const classes = useStyles()

  const [state, dispatch, actions] = useSearchManager(
    initialMeasures,
    initialRegions,
    initialLabels,
    initialLayout,
    initialLevel
  )

  const { measures, regions, labels, layout, level, error } = state

  const queryArgs = stateToQueryArgs(state)

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

  return (
    <DockedDrawerLayout
      drawerContent={
        <div className={classes.sidebar}>
          <QueryParameterSidebar dispatch={dispatch} actions={actions} />
        </div>
      }
    >
      <main className={classes.content}>
        <div className={classes.regionssection}>
          <div className={classes.helpsection}>
            <div className={classes.helpwrapper}>
              <HelpIcon className={classes.helpicon} />
              <a
                className={classes.helptext}
                href="/statistik-erklaert/dimensions"
              >
                Hilfe
              </a>
            </div>
          </div>
          <Paper elevation={0} className={classes.sectionPaper}>
            {regions.length === 0 && (
              <RegionEmptyState dispatch={dispatch} actions={actions} />
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
              <MeasureEmptyState dispatch={dispatch} actions={actions} />
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
        <h4 className={classes.sectionTitle}>Daten</h4>
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
}

export async function getServerSideProps({ query }) {
  const { measures, regions, labels, level, layout } = queryArgsToState(query)

  // TODO fix server-side data fetching?
  // const { origin } = absoluteUrl(req)
  // const fetchStatistics = await fetch(`${origin}/api/statistics`)
  // const statistics = await fetchStatistics.json()

  return {
    props: {
      // statistics: statistics,
      initialMeasures: measures.map((m) => ({
        ...m,
        dimensions: m.dimensions !== undefined ? m.dimensions : null, // undefined not allowed here TODO avoid earlier
      })),
      initialRegions: regions,
      initialLabels: labels || 'id',
      initialLayout: layout || 'long',
      initialLevel: (level && Number(level)) || 1,
    },
  }
}

export default Detail
