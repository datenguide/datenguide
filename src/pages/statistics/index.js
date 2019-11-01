import React from 'react'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles'
import Snackbar from '@material-ui/core/Snackbar'
import DrawerLayout from '../../layouts/Drawer'
import DataTable from '../../components/DataTable'
import QueryParameterSidebar from '../../components/QueryParameterSidebar'
import parseQueryArgs from './parseQueryArgs'
import useSearchManager, { actions } from './useSearchManager'
// import LinearProgress from '@material-ui/core/LinearProgress'

const useStyles = makeStyles(theme => ({
  main: {
    display: 'block',
    padding: theme.spacing(3)
  }
}))

const loadMeasureOptions = async (value = '') => {
  // TODO use server API
  const result = await fetch(`/api/search/measures?filter=${value}`)
  const json = await result.json()
  return json.map(statistic => {
    const split = statistic.label.split('-').map(s => s.trim()) // TODO fetch data in proper format to avoid this
    return {
      value: statistic.value,
      label: split[1],
      description: split[0]
    }
  })
}

const loadRegionOptions = async (value = '') => {
  // TODO use server API
  const result = await fetch(`/api/search/regions?filter=${value}`)
  const json = await result.json()
  return json.map(region => ({
    value: region.value,
    label: region.name,
    description: `Bundesland, id: ${region.value}` // TODO define description, add nuts level description (Bundesland, Kreis etc)
  }))
}

const Detail = ({ parsedArgs }) => {
  const classes = useStyles()

  const [{ measures, regions, error, loading }, dispatch] = useSearchManager(
    parsedArgs
  )

  return (
    <DrawerLayout
      drawerContent={
        // TODO think about loading indicator, this solution
        // is ugly and flickery
        // loading ? (
        //   <LinearProgress variant="query" />
        // ) : (
        <QueryParameterSidebar
          regions={regions}
          measures={measures}
          loadRegionOptions={loadRegionOptions}
          loadMeasureOptions={loadMeasureOptions}
          dispatch={dispatch}
          actions={actions}
        />
        // )
      }
    >
      <main className={classes.content}>
        <DataTable regions={regions} measures={measures} />
      </main>

      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        open={error !== null}
        onClose={() => dispatch(actions.setError(null))}
        autoHideDuration={6000}
        message={<span>{error}</span>}
      />
    </DrawerLayout>
  )
}

Detail.propTypes = {
  parsedArgs: PropTypes.object.isRequired
}

Detail.getInitialProps = async function({ query }) {
  const parsedArgs = parseQueryArgs(query)

  return {
    parsedArgs
  }
}

export default Detail
