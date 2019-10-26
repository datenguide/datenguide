import React from 'react'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    hyphens: 'auto'
  }
}))

export default function DefaultLayout(props) {
  const classes = useStyles()

  return (
    <Grid container>
      <Grid item xs={7}>
        <div className={classes.root}>{props.children}</div>
      </Grid>
    </Grid>
  )
}
