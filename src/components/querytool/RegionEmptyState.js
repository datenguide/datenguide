import React from 'react'
import { makeStyles } from '@mui/styles'
import AutocompleteSearchField from './AutocompleteSearchField'
import Button from '@mui/material/Button'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

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
  treeviewLink: {
    fontWeight: 'bold',
    cursor: 'pointer',
    position: 'relative',
    textTransform: 'none',
    marginTop: '-2px',
    padding: '4px',
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

const RegionEmptyState = ({ dispatch, actions, onToggleDrawer }) => {
  const classes = useStyles()

  const handleSelectionChange = (region) => {
    dispatch(actions.loadRegion(region.value))
  }

  const handleTreeViewClick = () => {
    onToggleDrawer(true)
  }

  return (
    <div className={classes.root}>
      <div className={classes.title}>
        1. Wähle eine Region für die Abfrage aus
      </div>
      <div className={classes.subtitle}>
        Suche eine Region hier im Suchfeld oder nutze die
        <Button
          className={classes.treeviewLink}
          startIcon={<ArrowForwardIcon />}
          onClick={handleTreeViewClick}
        >
          Baumansicht
        </Button>
        , um die gewünschte Region zu finden.
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
