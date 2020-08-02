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
  menuItem: {
    padding: theme.spacing(1, 0.5),
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
  onArgumentChange,
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
    onArgumentChange({ id, combo })
    handleMenuClose()
  }

  const handleFilterChange = (dimensionIndex, value) => {
    const { selected } = dimensions[dimensionIndex]
    const index = selected.indexOf(value)
    if (index >= 0) {
      // eslint-disable-next-line no-console
      console.log('unselect', value)
      // selected.splice(index)
    } else {
      // eslint-disable-next-line no-console
      console.log('select', value)
      // selected.push(value)
    }
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
    <>
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
    </>
  )
}

MeasureSearchComboSelection.propTypes = {
  inventory: PropTypes.object.isRequired,
  statistic: PropTypes.object.isRequired,
  onArgumentChange: PropTypes.func.isRequired,
}

export default MeasureSearchComboSelection
