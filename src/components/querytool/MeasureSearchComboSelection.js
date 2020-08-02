import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import DropDownCircleIcon from '@material-ui/icons/ArrowDropDownCircle'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

import MeasureSearchCombo from './MeasureSearchCombo'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(1),
  },
  menuItem: {
    padding: theme.spacing(1, 2),
  },
  menuButton: {
    color: theme.palette.grey[600],
  },
  activeCombo: {
    display: 'inline-block',
    paddingRight: theme.spacing(1),
  },
}))

const MeasureSearchComboSelection = ({
  statistic,
  inventory,
  activeCombo,
  onDimensionChange,
  onDimensionValuesChange,
}) => {
  const classes = useStyles()

  const { id, dimensions } = statistic

  const [menuOpen, setMenuOpen] = useState(false)
  const menuAnchor = useRef(null)

  const handleMenuOpen = (event) => {
    event.stopPropagation()
    setMenuOpen(true)
  }

  const handleMenuClose = () => {
    setMenuOpen(false)
  }

  const handleComboClick = (event, combo) => {
    event.stopPropagation()
    onDimensionChange({ id, combo })
    handleMenuClose()
  }

  const handleFilterChange = (dimensionIndex, changedValue) => {
    const { name, values, selected } = dimensions[dimensionIndex]
    const newSelection = values
      .map((v) => v.value)
      .filter((v) => {
        if (v === changedValue) {
          return !selected.includes(v)
        }
        return selected.includes(v)
      })
    onDimensionValuesChange({ id, dimension: name, values: newSelection })
  }

  const renderActiveCombo = (combo) => {
    return (
      <div ref={menuAnchor}>
        <div className={classes.activeCombo}>
          <MeasureSearchCombo
            combo={combo}
            dimensions={dimensions}
            onFilterChange={handleFilterChange}
          />
        </div>
        {inventory && inventory[0].length > 1 && (
          <Button
            onClick={handleMenuOpen}
            startIcon={<DropDownCircleIcon />}
            className={classes.menuButton}
            size="small"
            aria-controls="combo-menu"
            aria-haspopup="true"
          >
            Auswähl ändern
          </Button>
        )}
      </div>
    )
  }

  return (
    <div className={classes.root}>
      {renderActiveCombo(activeCombo)}
      <Menu
        id="combo-menu"
        anchorEl={menuAnchor.current}
        keepMounted
        open={menuOpen}
        onClose={handleMenuClose}
      >
        {inventory &&
          _.sortBy(inventory[0], (combo) => combo.length) // TODO should already be sorted before, not here
            .map((combo) => combo.sort())
            .map((combo) => {
              return (
                <MenuItem
                  key={combo}
                  className={classes.menuItem}
                  selected={activeCombo === combo.join(',')}
                  onClick={(event) => handleComboClick(event, combo)}
                >
                  <div className={classes.combo}>
                    <MeasureSearchCombo combo={combo} dimensions={dimensions} />
                  </div>
                </MenuItem>
              )
            })}
      </Menu>
    </div>
  )
}

MeasureSearchComboSelection.propTypes = {
  inventory: PropTypes.object.isRequired,
  statistic: PropTypes.object.isRequired,
  onArgumentChange: PropTypes.func.isRequired,
}

export default MeasureSearchComboSelection
