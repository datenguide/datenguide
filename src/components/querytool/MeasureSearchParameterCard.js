import React from 'react'
import PropTypes from 'prop-types'
import useSWR from 'swr'
import clsx from 'clsx'

import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Collapse from '@material-ui/core/Collapse'

import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

import MeasureSearchComboSelection from './MeasureSearchComboSelection'
import fetcher from '../../lib/fetcher'

const useStyles = makeStyles((theme) => ({
  root: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderTop: '1px solid #dadada',
    fontSize: '16px',
    marginBottom: theme.spacing(1),
  },
  header: {
    paddingBottom: 0,
    '@global': {
      '.MuiCardHeader-title': {
        fontWeight: 'normal',
      },
      '.MuiCardHeader-subheader': {
        fontSize: '14px',
      },
    },
  },
  actions: {
    padding: theme.spacing(0, 1, 1, 2),
  },
  actionWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  comboSelection: {
    marginLeft: theme.spacing(4),
  },
  headingAttribute: {
    fontSize: theme.typography.h4.fontSize,
  },
  headingStatistic: {
    fontSize: theme.typography.subtitle1.fontSize,
    fontWeight: theme.typography.subtitle1.fontWeight,
    color: theme.palette.grey[500],
  },
  headingDetails: {
    fontSize: theme.typography.h5.fontSize,
    fontWeight: 'bold',
    margin: theme.spacing(2, 0),
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
  dimension: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
  },
  dimensionName: {
    fontWeight: 'bold',
    width: '72px',
  },
  dimensionDescription: {
    marginLeft: theme.spacing(1),
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  helptext: {
    paddingTop: theme.spacing(2),
    fontSize: '14px',
    color: theme.palette.grey[600],
  },
}))

const MeasureSearchParameterCard = ({
  statistic,
  onClose,
  onDimensionChange,
  onDimensionValuesChange,
}) => {
  const classes = useStyles()
  const [expanded, setExpanded] = React.useState(false)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  const {
    statisticName,
    statisticTitleDe,
    name,
    titleDe,
    definitionDe,
    dimensions,
  } = statistic

  const definitionWithLineBreaks =
    definitionDe && definitionDe.replace(/\n/g, '<br/>')

  const [statisticId, measureId] = statistic.id.split(':')

  const activeCombo = dimensions
    .filter((d) => d.active)
    .map((d) => d.name)
    .sort()

  const { data: inventory } = useSWR(
    `/api/inventory?statistic=${statisticId}&measure=${measureId}`,
    fetcher
  )

  return (
    <Card className={classes.root}>
      <CardHeader
        className={classes.header}
        title={
          <div
            className={classes.headingAttribute}
          >{`${name} - ${titleDe}`}</div>
        }
        subheader={`${statisticName} – ${statisticTitleDe}`}
        action={
          <IconButton aria-label="close" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        }
      />
      <CardActions disableSpacing className={classes.actions}>
        <div className={classes.actionWrapper}>
          <div className={classes.helptext}>
            Wähle hier eine weitere Unterteilung der Daten aus:
          </div>
          {inventory && (
            <MeasureSearchComboSelection
              statistic={statistic}
              inventory={inventory}
              activeCombo={activeCombo}
              className={classes.comboSelection}
              onDimensionChange={onDimensionChange}
              onDimensionValuesChange={onDimensionValuesChange}
            />
          )}
        </div>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <div className={classes.measureDetails}>
            <div className={classes.measureDescription}>
              <div className={classes.headingDetails}>Beschreibung</div>
              <div
                dangerouslySetInnerHTML={{ __html: definitionWithLineBreaks }}
              />
            </div>
            <div className={classes.dimensionSelect}>
              <div className={classes.headingDetails}>Merkmalsausprägungen</div>
              {dimensions.map((dim, i) => (
                <div className={classes.dimension} key={dim.name}>
                  <div className={classes.dimensionName}>{dim.name}</div>
                  <span className={classes.dimensionDescription}>
                    {dim.titleDe}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Collapse>
    </Card>
  )
}

MeasureSearchParameterCard.propTypes = {
  statistic: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onDimensionChange: PropTypes.func.isRequired,
  onDimensionValuesChange: PropTypes.func.isRequired,
}

export default MeasureSearchParameterCard
