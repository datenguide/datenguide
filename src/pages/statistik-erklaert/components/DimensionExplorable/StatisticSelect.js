import React, { useEffect, useState } from 'react'

import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'

import inventory from '../../../../data/inventory.json'
import schema from '../../../../data/statSchema.json' // TODO use API

const statOptions = Object.keys(inventory)

const StatisticSelect = ({ onSelect, className }) => {
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
          InputProps={{
            ...params.InputProps,
          }}
        />
      )}
    />
  )
}

export default StatisticSelect
