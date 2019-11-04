import React from 'react'
import PropTypes from 'prop-types'
import fetch from 'isomorphic-unfetch'

import { makeStyles } from '@material-ui/core/styles'
import Snackbar from '@material-ui/core/Snackbar'

import DrawerLayout from '../../layouts/Drawer'
import DataTable from '../../components/DataTable'
import QueryParameterSidebar from '../../components/QueryParameterSidebar'
import { queryArgsToState } from '../../lib/queryString'
import useSearchManager from './useSearchManager'

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
    description: region.value // TODO define description, add nuts level description (Bundesland, Kreis etc)
  }))
}

const Detail = ({ initialMeasures, initialRegions }) => {
  const classes = useStyles()

  const [state, dispatch, actions] = useSearchManager(
    initialMeasures,
    initialRegions
  )

  const { measures, regions, error } = state

  return (
    <DrawerLayout
      drawerContent={
        <QueryParameterSidebar
          regions={regions}
          measures={measures}
          loadRegionOptions={loadRegionOptions}
          loadMeasureOptions={loadMeasureOptions}
          dispatch={dispatch}
          actions={actions}
        />
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
  initialMeasures: PropTypes.array.isRequired,
  initialRegions: PropTypes.array.isRequired
}

Detail.getInitialProps = async ({ query }) => {
  const { measures, regions } = queryArgsToState(query)

  return {
    initialMeasures: measures,
    initialRegions: regions
  }
}

export default Detail
