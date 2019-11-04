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

const RegionSearchParameterCard = ({ region, onClose }) => {
  const styles = useStyles()

  return (
    <Card className={styles.root}>
      <CardHeader
        action={
          <IconButton aria-label="settings" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        }
        title={region.name}
      />
      <CardContent>
      </CardContent>
    </Card>
  )
}

RegionSearchParameterCard.propTypes = {
  onClose: PropTypes.func.isRequired,
  region: PropTypes.object.isRequired
}

export default RegionSearchParameterCard
