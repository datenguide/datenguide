import React, { useEffect, useState } from 'react'

import schema from '../../../../data/statSchema.json' // TODO use API
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: theme.spacing(6),
    marginBottom: theme.spacing(2),
  },
}))

const MeasureSelect = ({ onSelect, className, statistic }) => {
  const classes = useStyles()
  const [options, setOptions] = useState([])
  const [disabled, setDisabled] = useState(true)

  useEffect(() => {
    if (statistic === null) {
      setOptions([])
      setDisabled(true)
    } else {
      setDisabled(false)
      setOptions(Object.keys(schema[statistic.value].measures))
    }
  }, [statistic])

  const handleChange = (event) => {
    onSelect(event.target.value)
  }

  return (
    <Select
      labelId="measure-select"
      id="measure-select"
      onChange={handleChange}
      className={classes.root}
      disabled={disabled}
      variant="outlined"
    >
      {options &&
        options.map((o) => (
          <MenuItem value={o} key={o}>
            {o} - {schema[statistic.value].measures[o].title_de}
          </MenuItem>
        ))}
    </Select>
  )
}

export default MeasureSelect
