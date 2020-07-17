import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import chroma from 'chroma-js'
import _ from 'lodash'

import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import DropDownCircleIcon from '@material-ui/icons/ArrowDropDownCircle'
import Chip from '@material-ui/core/Chip'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

const useStyles = makeStyles((theme) => ({
  codeDimensionChip: {
    width: '80px',
    color: 'white',
    fontWeight: 'bold',
  },
  titleDimensionChip: {
    color: 'white',
    fontWeight: 'bold',
  },
  dimensionPlus: {
    margin: theme.spacing(0, 0.5),
  },
  combo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing(1, 0.5),
  },
  emptyCombo: {
    margin: theme.spacing(1, 1, 1, 0),
  },
  menuItem: {
    padding: theme.spacing(0, 1, 0, 0),
  },
  menuButton: {
    marginLeft: theme.spacing(1),
    color: theme.palette.grey[600],
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

  const dimensionColors = chroma
    .scale(['#9cdf7c', '#2A4858'])
    .mode('lch')
    .colors(dimensions.length)

  const handleComboClick = (event, combo) => {
    event.stopPropagation()
    onArgumentChange({ id, combo })
    handleMenuClose()
  }

  const renderChip = (dimensionName, withTitle = false) => {
    const dimensionIndex = _.findIndex(
      dimensions,
      (d) => d.name === dimensionName
    )
    const label = withTitle ? dimensions[dimensionIndex].titleDe : dimensionName
    const values = dimensions[dimensionIndex].values || []

    return (
      <Chip
        key={dimensionName}
        label={label}
        icon={values.length && <DropDownCircleIcon />}
        size="small"
        color="default"
        className={
          withTitle ? classes.titleDimensionChip : classes.codeDimensionChip
        }
        style={{
          backgroundColor: dimensionColors[dimensionIndex],
        }}
      />
    )
  }

  const renderCombo = (combo) => {
    if (combo.length === 0) {
      return <div className={classes.emptyCombo}>Ohne Ausprägungen</div>
    }
    const result = [renderChip(combo[0], true)]
    combo.slice(1).forEach((dimension) => {
      result.push(<span className={classes.dimensionPlus}>+</span>)
      result.push(renderChip(dimension, true))
    })
    return result
  }

  const renderActiveCombo = (combo) => {
    let result
    if (!combo) {
      result = <span className={classes.emptyCombo}>Ohne Ausprägungen</span>
    } else {
      const comboArray = combo.split(',')
      result = [renderChip(comboArray[0], true)]
      comboArray.slice(1).forEach((dimension) => {
        result.push(<span className={classes.dimensionPlus}>+</span>)
        result.push(renderChip(dimension, true))
      })
    }

    return (
      <div ref={menuAnchor}>
        {result}
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
            .map((combo) => (
              <MenuItem
                key={combo}
                className={classes.menuItem}
                selected={activeCombo === combo.join(',')}
                onClick={(event) => handleComboClick(event, combo)}
              >
                <div className={classes.combo}>{renderCombo(combo)}</div>
              </MenuItem>
            ))}
      </Menu>
    </>
  )
}

MeasureSearchComboSelection.propTypes = {
  inventory: PropTypes.array.isRequired,
  statistic: PropTypes.object.isRequired,
  onArgumentChange: PropTypes.func.isRequired,
}

export default MeasureSearchComboSelection
