import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'

import { getNutsHierarchy } from '../../../../lib/nutsFormatting'

const renderNutsHierarchy = (n) => {
  const result = []
  for (let i = 0; i < n.length; i++) {
    const part = n[i]
    result.push(
      <Card key={part.id} component="span" m={1}>
        <CardContent>
          <Typography color="textSecondary" gutterBottom>
            {part.id}
          </Typography>
          <Typography variant="h5" component="h2">
            {part.name}
          </Typography>
          <Typography color="textSecondary">NUTS Level {part.nuts}</Typography>
          <Typography variant="body2" component="p">
            {part.nutsDescription}
          </Typography>
        </CardContent>
      </Card>
    )
    if (i < n.length - 1) {
      result.push(<ArrowForwardIosIcon />)
    }
  }
  return result
}

const Component = ({ region }) => {
  const [nutsHierarchy, setNutsHierarchy] = useState([])

  useEffect(() => {
    const nutsHierarchy = getNutsHierarchy(region)
    setNutsHierarchy(nutsHierarchy)
  }, [region])

  return (
    <Box
      style={{
        display: 'flex',
        backgroundColor: '#c3e5f1',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        height: '200px',
      }}
    >
      {renderNutsHierarchy(nutsHierarchy)}
    </Box>
  )
}

Component.propTypes = {
  region: PropTypes.object, // TODO
}

export default Component
