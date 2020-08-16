import React, { useState } from 'react'
import PropTypes from 'prop-types'
import chroma from 'chroma-js'
import _ from 'lodash'

import { makeStyles } from '@material-ui/core/styles'
import DropDownCircleIcon from '@material-ui/icons/ArrowDropDownCircle'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Checkbox from '@material-ui/core/Checkbox'

const useStyles = makeStyles((theme) => ({
  codeDimensionChip: {
    width: '80px',
    color: 'white',
    fontWeight: 'bold',
  },
  chip: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: theme.typography.button.fontSize,
    textAlign: 'left',
    border: 0,
    padding: theme.spacing(0.5, 1.5),
    borderRadius: 20,
    cursor: 'pointer',
  },
  icon: {
    verticalAlign: 'text-bottom',
    fontSize: '1.25em',
    margin: theme.spacing(0, 0.5, 0, -1),
  },
  dimensionPlus: {
    margin: theme.spacing(0, 0.5),
  },
  emptyCombo: {
    margin: theme.spacing(1, 1, 1, 0),
  },
  chipContainer: {
    display: 'inline-block',
    margin: theme.spacing(0.25, 0),
  },
}))

const MeasureSearchCombo = ({ dimensions, combo, onFilterChange }) => {
  const classes = useStyles()
  const [filterOpen, setFilterOpen] = useState(null)
  const [filterAnchor, setFilterAnchor] = useState(null)

  const handleFilterClose = (event) => {
    event.stopPropagation()
    setFilterAnchor(null)
    setFilterOpen(null)
  }

  const handleFilter = (event, name) => {
    if (!onFilterChange) return
    event.stopPropagation()
    setFilterAnchor(event.currentTarget)
    setFilterOpen(name)
  }

  const findDimensionIndex = (name) =>
    _.findIndex(dimensions, (d) => d.name === name)

  const dimensionColors = chroma
    .scale(['#9cdf7c', '#2A4858'])
    .mode('lch')
    .colors(dimensions.length)

  const renderChip = (dimensionName, withTitle = true) => {
    const dimensionIndex = findDimensionIndex(dimensionName)
    const label = withTitle ? dimensions[dimensionIndex].titleDe : dimensionName
    const { values = [], selected = [] } = dimensions[dimensionIndex]
    const hasFilter = onFilterChange ? values.length : null

    return (
      <div className={classes.chipContainer} key={dimensionName}>
        <button
          onClick={(event) => handleFilter(event, dimensionName)}
          className={classes.chip}
          style={{
            backgroundColor: dimensionColors[dimensionIndex],
          }}
        >
          {hasFilter && <DropDownCircleIcon className={classes.icon} />}
          {label}
        </button>
        <Menu
          anchorEl={filterAnchor}
          keepMounted
          open={dimensionName === filterOpen}
          onClose={handleFilterClose}
          getContentAnchorEl={null}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          {values.map(({ value, label }) => (
            <MenuItem key={value}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selected.includes(value)}
                    onChange={() => onFilterChange(dimensionIndex, value)}
                  />
                }
                label={label}
              />
            </MenuItem>
          ))}
        </Menu>
      </div>
    )
  }

  if (combo.length === 0) {
    return <div className={classes.emptyCombo}>Ohne Ausprägungen</div>
  }
  const result = [renderChip(combo[0])]
  combo.slice(1).forEach((dimension) => {
    result.push(
      <span key={`${dimension}+`} className={classes.dimensionPlus}>
        +
      </span>
    )
    result.push(renderChip(dimension))
  })
  return result
}

MeasureSearchCombo.propTypes = {
  dimensions: PropTypes.array.isRequired,
  combo: PropTypes.array.isRequired,
  onFilterChange: PropTypes.func,
}

export default MeasureSearchCombo
