import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import IconButton from '@material-ui/core/IconButton'
import CardContent from '@material-ui/core/CardContent'
import CloseIcon from '@material-ui/icons/Close'

import DimensionSelect from './DimensionSelect'

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '8px 0',
  },
}))

const MeasureSearchParameterCard = ({
  statistic,
  onClose,
  onArgumentChange,
}) => {
  const styles = useStyles()

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
    <Card className={styles.root}>
      <CardHeader
        action={
          <IconButton aria-label="settings" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        }
        title={`${name} - ${titleDe}`}
        subheader={`${statisticName} – ${statisticTitleDe}`}
      />
      {/*<CardContent>*/}
      {/*  {dimensions.map((dim) => (*/}
      {/*    <DimensionSelect*/}
      {/*      key={dim.name}*/}
      {/*      name={dim.name}*/}
      {/*      label={dim.titleDe}*/}
      {/*      value={dim.selected}*/}
      {/*      options={dim.values}*/}
      {/*      active={dim.active}*/}
      {/*      onChange={handleDimensionChange(dim.name)}*/}
      {/*      onToggle={handleArgumentToggle}*/}
      {/*    />*/}
      {/*  ))}*/}
      {/*</CardContent>*/}
    </Card>
  )
}

MeasureSearchParameterCard.propTypes = {
  statistic: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onArgumentChange: PropTypes.func.isRequired,
}

export default MeasureSearchParameterCard
