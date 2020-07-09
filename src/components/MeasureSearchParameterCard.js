import PropTypes from 'prop-types'
import useSWR from 'swr'
import chroma from 'chroma-js'
import _ from 'lodash'

import { makeStyles } from '@material-ui/core/styles'
import Accordion from '@material-ui/core/ExpansionPanel' // TODO rename to accordion after material-ui update
import AccordionSummary from '@material-ui/core/ExpansionPanelSummary' // TODO rename to accordion after material-ui update
import AccordionDetails from '@material-ui/core/ExpansionPanelDetails' // TODO rename to accordion after material-ui update
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Chip from '@material-ui/core/Chip'

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
  dimensionChip: {
    margin: theme.spacing(0.5),
    width: '80px',
    color: 'white',
    fontWeight: 'bold',
  },
  dimensionDescription: {
    marginLeft: theme.spacing(1),
  },
  combo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  emptyCombo: {
    margin: theme.spacing(1),
  },
}))

const fetcher = (url) => fetch(url).then((r) => r.json())

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

  const [statisticId, measureId] = statistic.id.split(':')

  const dimensionColors = chroma
    .scale(['#9cdf7c', '#2A4858'])
    .mode('lch')
    .colors(dimensions.length)

  const { data: inventory, error } = useSWR(
    `/api/inventory?statistic=${statisticId}&measure=${measureId}`,
    fetcher
  )

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

  const renderChip = (dimensionName) => (
    <Chip
      key={dimensionName}
      label={dimensionName}
      className={classes.dimensionChip}
      style={{
        backgroundColor:
          dimensionColors[
            _.findIndex(dimensions, (d) => d.name === dimensionName)
          ],
      }}
    />
  )

  const renderCombo = (combo) => {
    if (combo.length === 0) {
      return <div className={classes.emptyCombo}>Ohne Ausprägungen</div>
    }
    const result = [renderChip(combo[0])]
    combo.slice(1).forEach((dimension) => {
      result.push(<span>+</span>)
      result.push(renderChip(dimension))
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
              _.sortBy(inventory[0], (combo) => combo.length).map(
                (combo, i) => (
                  <div key={i} className={classes.combo}>
                    {renderCombo(combo)}
                  </div>
                )
              )}
            <div className={classes.headingLegend}>Beschreibung</div>
            {dimensions.map((dim, i) => (
              // <DimensionSelect
              //   key={dim.name}
              //   name={dim.name}
              //   label={dim.titleDe}
              //   value={dim.selected}
              //   options={dim.values}
              //   active={dim.active}
              //   onChange={handleDimensionChange(dim.name)}
              //   onToggle={handleArgumentToggle}
              // />
              <div key={dim.name}>
                {renderChip(dim.name)}
                <span className={classes.dimensionDescription}>
                  {dim.titleDe}
                </span>
              </div>
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
