import PropTypes from 'prop-types'
import fetch from 'isomorphic-unfetch'
import absoluteUrl from 'next-absolute-url'

import { makeStyles } from '@material-ui/core/styles'
import Snackbar from '@material-ui/core/Snackbar'

import DefaultLayout from '../../layouts/DefaultLayout'
import DataTable from '../../components/DataTable'
import QueryParameterSidebar from '../../components/QueryParameterSidebar'
import { queryArgsToState } from '../../lib/queryString'
import useSearchManager from '../../lib/useSearchManager'
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    backgroundColor: '#f5f5f5',
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    padding: theme.spacing(3),
  },
  headline: {
    paddingTop: theme.spacing(3),
    paddingLeft: theme.spacing(5),
    marginBottom: theme.spacing(0),
  },
  sidebar: {
    width: '400px',
    padding: theme.spacing(2),
  },
  paper: {
    height: '300px',
    // margin: theme.spacing(2),
    width: '100%',
    overflowX: 'auto',
  },
  data: {
    padding: theme.spacing(2),
    display: 'flex',
    flexGrow: 1,
  },
}))

const loadMeasureOptions = async (value = '') => {
  // TODO use server API
  const result = await fetch(`/api/search/measures?filter=${value}`)
  const json = await result.json()
  return json.map((statistic) => {
    const split = statistic.label.split('-').map((s) => s.trim()) // TODO fetch data in proper format to avoid this
    return {
      value: statistic.value,
      label: split[1],
      description: split[0],
    }
  })
}

const loadRegionOptions = async (value = '') => {
  // TODO use server API
  const result = await fetch(`/api/search/regions?filter=${value}`)
  const json = await result.json()
  return json.map((region) => ({
    value: region.value,
    label: region.name,
    description: region.value, // TODO define description, add nuts level description (Bundesland, Kreis etc)
  }))
}

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

  return (
    <DefaultLayout backgroundColor="#f5f5f5">
      <h1 className={classes.headline}>Erweiterte Abfrage</h1>
      <main className={classes.content}>
        <div className={classes.sidebar}>
          <QueryParameterSidebar
            regions={regions}
            measures={measures}
            loadRegionOptions={loadRegionOptions}
            loadMeasureOptions={loadMeasureOptions}
            dispatch={dispatch}
            actions={actions}
          />
        </div>
        <div className={classes.data}>
          <DataTable
            regions={regions}
            measures={measures}
            labels={labels}
            layout={layout}
            dispatch={dispatch}
            actions={actions}
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
    </DefaultLayout>
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
