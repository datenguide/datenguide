import React, { useEffect, useState } from 'react'

import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'

import inventory from '../../../../data/inventory.json'
import schema from '../../../../data/statSchema.json'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core' // TODO use API

const statOptions = Object.keys(inventory)

const useStyles = makeStyles((theme) => ({
  textfield: {
    marginBottom: theme.spacing(2),
  },
  label: {
    color: theme.palette.grey[500],
    fontSize: '14px',
  },
}))

const StatisticSelect = ({ onSelect, className, statistic }) => {
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
    <>
      <div className={classes.label}>Statistik</div>
      <Autocomplete
        id="region-select"
        size="small"
        className={className}
        disableClearable
        onChange={handleChange}
        autoHighlight
        getOptionLabel={(option) => option.label}
        options={options}
        value={statistic}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            InputProps={{
              ...params.InputProps,
            }}
            className={classes.textfield}
          />
        )}
      />
    </>
  )
}

export default StatisticSelect
