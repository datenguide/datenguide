import React from 'react'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import IconButton from '@material-ui/core/IconButton'
import CardContent from '@material-ui/core/CardContent'
import CloseIcon from '@material-ui/icons/Close'
import ValueAttributeSelect from './ValueAttributeSelect'

const useStyles = makeStyles(theme => ({
  root: {
    margin: '8px 0'
  }
}))

const StatisticSearchParameterCard = ({
  statistic,
  onClose,
  onArgumentChange
}) => {
  const styles = useStyles()

  const {
    statisticAndAttribute,
    attributeCode,
    attributeName,
    statisticCode,
    statisticName,
    args
  } = statistic

  const handleArgumentChange = argCode => event => {
    onArgumentChange({
      statisticAndAttribute,
      argCode,
      change: {
        selected: event.target.value
      }
    })
  }

  const handleArgumentToggle = event => {
    onArgumentChange({
      statisticAndAttribute,
      argCode: event.target.value,
      change: {
        active: event.target.checked
      }
    })
  }

  return (
    <Card className={styles.root}>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <CloseIcon onClick={onClose} />
          </IconButton>
        }
        title={`${attributeCode} - ${attributeName}`}
        subheader={`${statisticCode} ${statisticName}`}
      />
      <CardContent>
        {args.map(arg => {
          return (
            <ValueAttributeSelect
              key={arg.label}
              name={arg.value}
              label={arg.label}
              value={arg.selected}
              options={arg.values}
              active={arg.active}
              onChange={handleArgumentChange(arg.value)}
              onToggle={handleArgumentToggle}
            />
          )
        })}
      </CardContent>
    </Card>
  )
}

StatisticSearchParameterCard.propTypes = {
  statistic: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onArgumentChange: PropTypes.func.isRequired
}

export default StatisticSearchParameterCard
