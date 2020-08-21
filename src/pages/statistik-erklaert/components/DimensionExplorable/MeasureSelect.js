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
  label: {
    color: theme.palette.grey[500],
    fontSize: '14px',
  },
}))

const MeasureSelect = ({ onSelect, measure, statistic }) => {
  const classes = useStyles()
  const [options, setOptions] = useState([])
  const [disabled, setDisabled] = useState(true)
  const [statisticValue, setStatisticValue] = useState(null)
  const [measureValue, setMeasureValue] = useState(null)

  useEffect(() => {
    if (statistic === null) {
      setOptions([])
      setStatisticValue(null)
      setDisabled(true)
      setMeasureValue(null)
    } else {
      setDisabled(false)
      setStatisticValue(statistic.value)
      const measures = Object.keys(schema[statistic.value].measures)
      setOptions(measures)
      setMeasureValue(measures[0])
    }
  }, [statistic])

  useEffect(() => {
    if (measure == null) {
      setMeasureValue(null)
    } else {
      setMeasureValue(measure)
    }
  }, [measure])

  const handleChange = (event) => {
    const value = event.target.value
    setMeasureValue(value)
    onSelect(value)
  }

  return (
    <>
      <div className={classes.label}>Wertmerkmal</div>
      <Select
        labelId="measure-select"
        id="measure-select"
        onChange={handleChange}
        className={classes.root}
        disabled={disabled}
        variant="outlined"
        value={measureValue}
      >
        {options &&
          options.map((o) => (
            <MenuItem value={o} key={o}>
              {o} - {schema[statisticValue].measures[o].title_de}
            </MenuItem>
          ))}
      </Select>
    </>
  )
}

export default MeasureSelect
