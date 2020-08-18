import React, { useEffect, useState } from 'react'

import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'

import inventory from '../../../../data/inventory.json'
import schema from '../../../../data/statSchema.json'
import { makeStyles } from '@material-ui/core/styles' // TODO use API

const statOptions = Object.keys(inventory)

const useStyles = makeStyles((theme) => ({
  textfield: {
    marginBottom: theme.spacing(2),
  },
}))

const StatisticSelect = ({ onSelect, className }) => {
  const classes = useStyles()
  const [options, setOptions] = useState([])

  useEffect(() => {
    setOptions(
      statOptions.map((v) => {
        return {
          value: v,
          label: `${v} - ${schema[v].title_de}`,
        }
      })
    )
  }, [])

  const handleChange = (__, value) => {
    onSelect(value)
  }

  return (
    <Autocomplete
      id="region-select"
      size="small"
      className={className}
      disableClearable
      onChange={handleChange}
      autoHighlight
      getOptionLabel={(option) => option.label}
      options={options}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Statistik auswählen oder suchen"
          variant="outlined"
          InputProps={{
            ...params.InputProps,
          }}
          className={classes.textfield}
        />
      )}
    />
  )
}

export default StatisticSelect
