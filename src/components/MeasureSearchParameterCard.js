import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import useSWR from 'swr'
import chroma from 'chroma-js'
import _ from 'lodash'

import { makeStyles } from '@material-ui/core/styles'
import Accordion from '@material-ui/core/ExpansionPanel' // TODO rename to accordion after material-ui update
import AccordionSummary from '@material-ui/core/ExpansionPanelSummary' // TODO rename to accordion after material-ui update
import AccordionDetails from '@material-ui/core/ExpansionPanelDetails' // TODO rename to accordion after material-ui update
import Button from '@material-ui/core/Button'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import IconButton from '@material-ui/core/IconButton'
import DropDownIcon from '@material-ui/icons/ArrowDropDownCircle'
import CloseIcon from '@material-ui/icons/Close'
import Chip from '@material-ui/core/Chip'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Radio from '@material-ui/core/Radio'

import fetcher from '../lib/fetcher'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.grey[500],
  },
  summary: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  headingAttribute: {
    fontSize: theme.typography.h6.fontSize,
    fontWeight: theme.typography.h6.fontWeight,
  },
  headingStatistic: {
    fontSize: theme.typography.subtitle2.fontSize,
    fontWeight: theme.typography.subtitle2.fontWeight,
    color: theme.palette.grey[500],
  },
  headingDetails: {
    fontSize: theme.typography.subtitle1.fontSize,
    fontWeight: 'bold',
    margin: theme.spacing(2, 0),
  },
  headingLegend: {
    fontSize: theme.typography.subtitle1.fontSize,
    fontWeight: 'bold',
    margin: theme.spacing(2, 0),
    color: theme.palette.grey[500],
  },
  measureDetails: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
  },
  measureDescription: {
    flex: '1 0 50%',
  },
  dimensionSelect: {
    flex: '1 0 50%',
    display: 'flex',
    flexDirection: 'column',
  },
  codeDimensionChip: {
    width: '80px',
    color: 'white',
    fontWeight: 'bold',
  },
  titleDimensionChip: {
    color: 'white',
    fontWeight: 'bold',
  },
  dimensionDescription: {
    marginLeft: theme.spacing(1),
  },
  activeCombo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: theme.spacing(1),
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
  radio: {
    padding: theme.spacing(0, 1, 0, 0),
  },
  menuButton: {
    marginLeft: theme.spacing(1),
    color: theme.palette.grey[600],
  },
}))

const MeasureSearchParameterCard = ({
  statistic,
  onClose,
  onArgumentChange,
}) => {
  const classes = useStyles()

  const {
    id,
    statisticName,
    statisticTitleDe,
    name,
    titleDe,
    definitionDe,
    dimensions,
  } = statistic

  const [menuOpen, setMenuOpen] = useState(false)

  const menuAnchor = useRef(null)

  const handleMenuOpen = (event) => {
    event.stopPropagation()
    setMenuOpen(true)
  }

  const handleMenuClose = () => {
    setMenuOpen(false)
  }

  const definitionWithLineBreaks = definitionDe.replace(/\n/g, '<br/>')

  const [statisticId, measureId] = statistic.id.split(':')

  const activeCombo = dimensions
    .filter((d) => d.active)
    .map((d) => d.name)
    .sort()
    .join(',')

  const dimensionColors = chroma
    .scale(['#9cdf7c', '#2A4858'])
    .mode('lch')
    .colors(dimensions.length)

  const { data: inventory } = useSWR(
    `/api/inventory?statistic=${statisticId}&measure=${measureId}`,
    fetcher
  )

  const handleComboChange = (event) => {
    onArgumentChange({ id, combo: JSON.parse(event.target.value) })
  }

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
    return (
      <Chip
        key={dimensionName}
        label={label}
        className={
          withTitle ? classes.titleDimensionChip : classes.codeDimensionChip
        }
        style={{
          backgroundColor: dimensionColors[dimensionIndex],
        }}
      />
    )
  }

  const renderSummaryCombo = (combo) => {
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
        <Button
          onClick={handleMenuOpen}
          startIcon={<DropDownIcon />}
          className={classes.menuButton}
          size="small"
          aria-controls="simple-menu"
          aria-haspopup="true"
        >
          Auswähl ändern
        </Button>
      </div>
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

  return (
    <Accordion elevation={1}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <div className={classes.summary}>
          <div className={classes.headingAttribute}>
            {`${name} - ${titleDe}`}
          </div>
          <div className={classes.headingStatistic}>
            {`${statisticName} – ${statisticTitleDe}`}
          </div>
          <div className={classes.activeCombo}>
            {renderSummaryCombo(activeCombo)}
            <Menu
              id="simple-menu"
              anchorEl={menuAnchor.current}
              keepMounted
              open={menuOpen}
              onClose={handleMenuClose}
            >
              {inventory &&
                _.sortBy(inventory[0], (combo) => combo.length) // TODO should already be sorted before, not here
                  .map((combo) => combo.sort())
                  .map((combo, i) => (
                    <MenuItem
                      key={combo}
                      className={classes.radio}
                      selected={activeCombo === combo.join(',')}
                      onClick={(event) => handleComboClick(event, combo)}
                    >
                      <div className={classes.combo}>{renderCombo(combo)}</div>
                    </MenuItem>
                  ))}
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
      <AccordionDetails>
        <div className={classes.measureDetails}>
          <div className={classes.measureDescription}>
            <div className={classes.headingDetails}>Beschreibung</div>
            <div
              dangerouslySetInnerHTML={{ __html: definitionWithLineBreaks }}
            />
          </div>
          <div className={classes.dimensionSelect}>
            <div className={classes.headingDetails}>Merkmalsausprägungen</div>
            {inventory &&
              _.sortBy(inventory[0], (combo) => combo.length) // TODO should already be sorted before, not here
                .map((combo) => combo.sort())
                .map((combo, i) => (
                  <div key={combo} className={classes.combo}>
                    <Radio
                      className={classes.radio}
                      checked={activeCombo === combo.join(',')}
                      onChange={handleComboChange}
                      value={JSON.stringify(combo)}
                    />
                    {renderCombo(combo)}
                  </div>
                ))}

            {/* <div className={classes.headingLegend}>Beschreibung</div> */}
            {/* {dimensions.map((dim, i) => ( */}
            {/*  <div className={classes.combo} key={dim.name}> */}
            {/*    {renderChip(dim.name)} */}
            {/*    <span className={classes.dimensionDescription}> */}
            {/*      {dim.titleDe} */}
            {/*    </span> */}
            {/*  </div> */}
            {/* ))} */}
          </div>
        </div>
      </AccordionDetails>
    </Accordion>
  )
}

MeasureSearchParameterCard.propTypes = {
  statistic: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onArgumentChange: PropTypes.func.isRequired,
}

export default MeasureSearchParameterCard
