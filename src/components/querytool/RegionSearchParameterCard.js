import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles'
import Accordion from '@material-ui/core/ExpansionPanel' // TODO rename to accordion after material-ui update
import AccordionSummary from '@material-ui/core/ExpansionPanelSummary' // TODO rename to accordion after material-ui update
import AccordionDetails from '@material-ui/core/ExpansionPanelDetails' // TODO rename to accordion after material-ui update
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

const useStyles = makeStyles((theme) => ({
  root: {},
  summary: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  headingAttribute: {
    fontSize: theme.typography.h6.fontSize,
    fontWeight: theme.typography.h6.fontWeight,
    width: '400px',
  },
  headingStatistic: {
    fontSize: theme.typography.subtitle2.fontSize,
    fontWeight: theme.typography.subtitle2.fontSize,
    color: theme.palette.grey[500],
  },
  regionTitle: {
    fontWeight: 'bold',
  },
  menuItem: {},
}))

const regionLevels = [
  { level: 1, title: 'NUTS 1', description: 'Bundesländer' },
  {
    level: 2,
    title: 'NUTS 2',
    description: 'Regierungsbezirke und statistische Regionen',
  },
  {
    level: 3,
    title: 'NUTS 3',
    description: 'Landkreise und kreisfreie Städte',
  },
]

const RegionSearchParameterCard = ({ region, onClose }) => {
  const classes = useStyles()
  const [menuAnchor, setMenuAnchor] = useState(null)

  const handleMenuOpen = (event) => {
    event.stopPropagation()
    setMenuAnchor(event.currentTarget)
  }

  const handleMenuClose = () => {
    setMenuAnchor(null)
  }

  const handleMenuSelect = (event, level) => {
    event.stopPropagation()
    setMenuAnchor(null)
    console.log('menu select!', level) // eslint-disable-line
  }

  return (
    <Accordion className={classes.root}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <div className={classes.summary}>
          <div className={classes.headingAttribute}>{region.name}</div>
          <div className={classes.headingStatistic}>
            <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleMenuOpen}
            >
              <div className={classes.regionTitle}>
                {region.level && regionLevels[region.level - 1].description}
              </div>
            </Button>
            <Menu
              id="region-menu"
              anchorEl={menuAnchor}
              keepMounted
              open={Boolean(menuAnchor)}
              onClose={handleMenuClose}
            >
              {regionLevels.map(({ level, title, description }) => {
                return (
                  <MenuItem
                    key={level}
                    className={classes.menuItem}
                    selected={region.level === level}
                    onClick={(event) => handleMenuSelect(event, level)}
                  >
                    {title} – {description}
                  </MenuItem>
                )
              })}
            </Menu>
          </div>
        </div>
        <IconButton
          aria-label="settings"
          onClick={onClose}
          className={classes.closeButton}
        >
          <CloseIcon />
        </IconButton>
      </AccordionSummary>
      <AccordionDetails />
    </Accordion>
  )
}

RegionSearchParameterCard.propTypes = {
  onClose: PropTypes.func.isRequired,
  region: PropTypes.object.isRequired,
}

export default RegionSearchParameterCard
