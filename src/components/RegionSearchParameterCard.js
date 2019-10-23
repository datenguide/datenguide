import React from 'react'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import IconButton from '@material-ui/core/IconButton'
import CardContent from '@material-ui/core/CardContent'
import CloseIcon from '@material-ui/icons/Close'

const useStyles = makeStyles(theme => ({
  root: {
    margin: '8px 0'
  }
}))

const RegionSearchParameterCard = ({ title, text, onClose }) => {
  const styles = useStyles()

  return (
    <Card className={styles.root}>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <CloseIcon onClick={onClose} />
          </IconButton>
        }
        title={title}
      />
      <CardContent>{text}</CardContent>
    </Card>
  )
}

RegionSearchParameterCard.propTypes = {
  onCLose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
}

export default RegionSearchParameterCard
