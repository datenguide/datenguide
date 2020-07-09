import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles'
import Accordion from '@material-ui/core/ExpansionPanel' // TODO rename to accordion after material-ui update
import AccordionSummary from '@material-ui/core/ExpansionPanelSummary' // TODO rename to accordion after material-ui update
import AccordionDetails from '@material-ui/core/ExpansionPanelDetails' // TODO rename to accordion after material-ui update
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

import DimensionSelect from './DimensionSelect'

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
    fontWeight: theme.typography.subtitle2.fontSize,
    color: theme.palette.grey[500],
  },
  dimensionSelectWrapper: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
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
    dimensions,
  } = statistic

  const handleDimensionChange = (argCode) => (event) => {
    onArgumentChange({
      id,
      argCode,
      diff: {
        selected: event.target.value,
      },
    })
  }

  const handleArgumentToggle = (event) => {
    onArgumentChange({
      id,
      argCode: event.target.value,
      diff: {
        active: event.target.checked,
      },
    })
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
        <div className={classes.dimensionSelectWrapper}>
          {dimensions.map((dim) => (
            <DimensionSelect
              key={dim.name}
              name={dim.name}
              label={dim.titleDe}
              value={dim.selected}
              options={dim.values}
              active={dim.active}
              onChange={handleDimensionChange(dim.name)}
              onToggle={handleArgumentToggle}
            />
          ))}
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
