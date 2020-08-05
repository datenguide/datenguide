import React, { useState } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'

import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import DropDownCircleIcon from '@material-ui/icons/ArrowDropDownCircle'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

const useStyles = makeStyles((theme) => ({
  root: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  summary: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  chip: {
    color: 'white',
    display: 'inline-block',
    width: 80,
    background: theme.palette.grey[600],
    fontWeight: 'bold',
    fontSize: theme.typography.button.fontSize,
    textAlign: 'center',
    border: 0,
    padding: theme.spacing(0.5, 1.5),
    borderRadius: 20,
    marginRight: theme.spacing(1),

    '&.hasIcon': {
      width: 'auto',
    },
  },
  icon: {
    verticalAlign: 'text-bottom',
    fontSize: '1.25em',
    margin: theme.spacing(0, 0.5, 0, -1),
  },
  headingAttribute: {
    fontSize: theme.typography.h6.fontSize,
    fontWeight: theme.typography.h6.fontWeight,
    width: '400px',
  },
  regionLevel: {
    fontSize: theme.typography.body1.fontSize,
    color: theme.palette.grey[600],
  },
  menuButton: {
    margin: 0,
    padding: theme.spacing(1, 0, 0),
    border: 0,
    background: 'transparent',
    cursor: 'pointer',
  },
}))

const regionLevels = [
  {
    id: 1,
    abbr: 'NUTS 1',
    title: 'Bundesländer',
  },
  {
    id: 2,
    title: 'Regierungsbezirke und statistische Regionen',
    abbr: 'NUTS 2',
  },
  {
    id: 3,
    title: 'Landkreise und kreisfreie Städte',
    abbr: 'NUTS 3',
  },
  {
    id: 4,
    title: 'Gemeinden',
    abbr: 'LAU',
  },
]

const RegionSearchParameterCard = ({ region, onClose }) => {
  const classes = useStyles()
  const [menuAnchor, setMenuAnchor] = useState(null)

  const handleMenuOpen = (event) => {
    setMenuAnchor(event.currentTarget)
  }

  const handleMenuClose = () => {
    setMenuAnchor(null)
  }

  const handleMenuSelect = (level) => {
    setMenuAnchor(null)
    console.log('menu select!', level) // eslint-disable-line
  }

  const renderRegionLevel = ({ level, showIcon = true }) => {
    const { abbr, title } = regionLevels.find(({ id }) => level === id)
    return (
      <div className={classes.regionLevel}>
        <span className={clsx(classes.chip, { hasIcon: showIcon })}>
          {showIcon && <DropDownCircleIcon className={classes.icon} />}
          {abbr}
        </span>
        {title}
      </div>
    )
  }

  const renderMenu = () => {
    return (
      <>
        <button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleMenuOpen}
          className={classes.menuButton}
        >
          {renderRegionLevel({ level: region.level })}
        </button>
        <Menu
          id="region-menu"
          anchorEl={menuAnchor}
          keepMounted
          open={Boolean(menuAnchor)}
          onClose={handleMenuClose}
        >
          {regionLevels.map(({ id }) => {
            return (
              <MenuItem
                key={id}
                className={classes.menuItem}
                selected={region.level === id}
                onClick={(event) => handleMenuSelect(id)}
              >
                {renderRegionLevel({ level: id, showIcon: false })}
              </MenuItem>
            )
          })}
        </Menu>
      </>
    )
  }

  return (
    <Card className={classes.root}>
      <CardHeader
        title={<div className={classes.headingAttribute}>{region.name}</div>}
        subheader={renderMenu()}
        action={
          <IconButton aria-label="close" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        }
      />
    </Card>
  )
}

RegionSearchParameterCard.propTypes = {
  onClose: PropTypes.func.isRequired,
  region: PropTypes.object.isRequired,
}

export default RegionSearchParameterCard
