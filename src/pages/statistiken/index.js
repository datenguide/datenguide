import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles'
import Snackbar from '@material-ui/core/Snackbar'
import Paper from '@material-ui/core/Paper'

import DataTable from '../../components/querytool/DataTable'
import QueryParameterSidebar from '../../components/querytool/QueryParameterSidebar'
import { queryArgsToState, stateToQueryArgs } from '../../lib/queryString'
import useSearchManager from '../../lib/useSearchManager'
import DockedDrawerLayout from '../../layouts/DockedDrawerLayout'
import RegionSearchParameterCard from '../../components/querytool/RegionSearchParameterCard'
import MeasureSearchParameterCard from '../../components/querytool/MeasureSearchParameterCard'

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

// TODO this was for autocomplete field
// const loadMeasureOptions = async (value = '') => {
//   // TODO use server API
//   const result = await fetch(`/api/search/measures?filter=${value}`)
//   const json = await result.json()
//   return json.map((statistic) => {
//     const split = statistic.label.split('-').map((s) => s.trim()) // TODO fetch data in proper format to avoid this
//     return {
//       value: statistic.value,
//       label: split[1],
//       description: split[0],
//     }
//   })
// }
//
// const loadRegionOptions = async (value = '') => {
//   // TODO use server API
//   const result = await fetch(`/api/search/regions?filter=${value}`)
//   const json = await result.json()
//   return json.map((region) => ({
//     value: region.value,
//     label: region.name,
//     description: region.value, // TODO define description, add nuts level description (Bundesland, Kreis etc)
//   }))
// }

const Detail = ({
  initialMeasures,
  initialRegions,
  initialLabels,
  initialLayout,
}) => {
  const classes = useStyles()

  const [state, dispatch, actions] = useSearchManager(
    initialMeasures,
    initialRegions,
    initialLabels,
    initialLayout
  )

  const { measures, regions, labels, layout, error } = state

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
          <Paper elevation={0} className={classes.sectionPaper}>
            <h4 className={classes.sectionTitle}>Aktuelle Auswahl</h4>
            {regions.map((region) => (
              <RegionSearchParameterCard
                key={region.id}
                region={region}
                onClose={handleRemoveRegion(region.id)}
              />
            ))}
            {measures.map((measure) => (
              <MeasureSearchParameterCard
                key={measure.id}
                statistic={measure}
                onClose={handleRemoveMeasure(measure.id)}
                onDimensionChange={handleDimensionChange}
                onDimensionValuesChange={handleDimensionValuesChange}
              />
            ))}
            {regions.length === 0 && measures.length === 0 && (
              <div className={classes.emptyState}>
                Wähle mindestens eine Region und eine Statistik aus.
              </div>
            )}
            {regions.length === 0 && measures.length !== 0 && (
              <div className={classes.emptyState}>
                Wähle mindestens eine Region aus.
              </div>
            )}
            {regions.length !== 0 && measures.length === 0 && (
              <div className={classes.emptyState}>
                Wähle mindestens eine Statistik aus.
              </div>
            )}
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
  const { measures, regions, labels, layout } = queryArgsToState(query)

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
    },
  }
}

export default Detail
