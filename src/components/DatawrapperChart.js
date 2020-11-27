import React from 'react'
import DWChart from 'react-datawrapper-chart'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2, 0),
  },
}))

export default function BaseLayout(props) {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <DWChart {...props} />
    </div>
  )
}
