import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AutocompleteSearchField from './AutocompleteSearchField'

const useStyles = makeStyles((theme) => ({
  root: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    border: '1px dotted',
    background: theme.palette.common.white,
    padding: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  title: {
    fontSize: '24px',
    fontWeight: '400',
  },
  subtitle: {
    fontSize: '14px',
    fontWeight: '400',
    color: theme.palette.grey[600],
    marginBottom: theme.spacing(1),
  },
}))

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

const RegionEmptyState = ({ dispatch, actions }) => {
  const classes = useStyles()

  const handleSelectionChange = (region) => {
    dispatch(actions.loadRegion(region.value))
  }

  return (
    <div className={classes.root}>
      <div className={classes.title}>
        1. Wähle eine Region für die Abfrage aus
      </div>
      <div className={classes.subtitle}>
        Suche eine Region hier im Suchfeld oder nutze die Baumansicht, die
        gewünschte Region zu finden.
      </div>
      <AutocompleteSearchField
        loadOptions={loadRegionOptions}
        onSelectionChange={handleSelectionChange}
        placeholder="Region suchen oder auswählen"
      />
    </div>
  )
}

export default RegionEmptyState
