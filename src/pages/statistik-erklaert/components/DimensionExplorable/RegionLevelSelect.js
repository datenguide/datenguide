import React, { useState } from 'react'

import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: '12px',
    width: '100%',
  },
}))

const RegionLevelSelect = ({ onSelect }) => {
  const classes = useStyles()
  const [value, setValue] = useState(1)

  const handleChange = (event) => {
    setValue(event.target.value)
    onSelect(event.target.value)
  }

  return (
    <Select
      labelId="region-level-select"
      id="region-level-select"
      value={value}
      onChange={handleChange}
      className={classes.root}
    >
      <MenuItem value={1} key={1}>
        NUTS 1 - Bundesländer
      </MenuItem>
      <MenuItem value={2} key={2}>
        NUTS 2 - Regierungsbezirke
      </MenuItem>
      <MenuItem value={3} key={3}>
        NUTS 3 - Kreise und kreisfreie Städte
      </MenuItem>
      <MenuItem value={4} key={4}>
        LAU - Gemeinden
      </MenuItem>
    </Select>
  )
}

export default RegionLevelSelect
