import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles'
import Accordion from '@material-ui/core/ExpansionPanel' // TODO rename to accordion after material-ui update
import AccordionSummary from '@material-ui/core/ExpansionPanelSummary' // TODO rename to accordion after material-ui update
import AccordionDetails from '@material-ui/core/ExpansionPanelDetails' // TODO rename to accordion after material-ui update
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

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
}))

const nutsToText = {
  1: 'NUTS 1 – Bundesland',
  2: 'NUTS 2 – Regierungsbezirk',
  3: 'NUTS 3 – Landkreis, Kreis, kreisfreie Stadt',
}

const RegionSearchParameterCard = ({ region, onClose }) => {
  const classes = useStyles()

  return (
    <Accordion className={classes.root}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <div className={classes.summary}>
          <div className={classes.headingAttribute}>{region.name}</div>
          <div className={classes.headingStatistic}>
            {nutsToText[region.level]}
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
      <AccordionDetails></AccordionDetails>
    </Accordion>
  )
}

RegionSearchParameterCard.propTypes = {
  onClose: PropTypes.func.isRequired,
  region: PropTypes.object.isRequired,
}

export default RegionSearchParameterCard
