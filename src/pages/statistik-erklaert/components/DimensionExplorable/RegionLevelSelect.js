import React, { useState } from 'react'

import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: theme.spacing(6),
    marginBottom: theme.spacing(2),
  },
  label: {
    color: theme.palette.grey[500],
    fontSize: '14px',
  },
}))

const RegionLevelSelect = ({ onSelect, levels = [] }) => {
  const classes = useStyles()
  const [value, setValue] = useState(1)

  const handleChange = (event) => {
    setValue(event.target.value)
    onSelect(event.target.value)
  }

  const getMenuItemLabel = (level) =>
    [
      'DG - Deutschland',
      'NUTS 1 - Bundesländer',
      'NUTS 2 - Regierungsbezirke',
      'NUTS 3 - Kreise und kreisfreie Städte',
      'LAU - Gemeinden',
    ][parseInt(level, 10)]

  return (
    <>
      <div className={classes.label}>Regionale Tiefe</div>
      <Select
        labelId="region-level-select"
        id="region-level-select"
        value={value}
        onChange={handleChange}
        variant="outlined"
        className={classes.root}
        disabled={levels.length === 0}
      >
        {levels.map((level) => (
          <MenuItem value={level} key={level}>
            {getMenuItemLabel(level)}
          </MenuItem>
        ))}
      </Select>
    </>
  )
}

export default RegionLevelSelect
