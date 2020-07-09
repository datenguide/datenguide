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
    fontWeight: theme.typography.subtitle2.fontWeight,
    color: theme.palette.grey[500],
  },
  headingDetails: {
    fontSize: theme.typography.subtitle1.fontSize,
    fontWeight: 'bold',
    marginBottom: theme.spacing(2),
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

  const definitionWithLineBreaks = definitionDe.replace(/\n/g, '<br/>')

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
        <div className={classes.measureDetails}>
          <div className={classes.measureDescription}>
            <div className={classes.headingDetails}>Beschreibung</div>
            <div
              dangerouslySetInnerHTML={{ __html: definitionWithLineBreaks }}
            />
          </div>
          <div className={classes.dimensionSelect}>
            <div className={classes.headingDetails}>Merkmalsausprägungen</div>
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
