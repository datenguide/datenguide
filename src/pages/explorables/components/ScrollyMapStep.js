import React from 'react'
import { withStyles } from '@material-ui/core/styles'

const styles = (theme) => ({
  main: {
    background: 'white',
    padding: '1rem',

    '& img': {
      width: '100%',
    },
  },
})

export default withStyles(styles)(({ classes, children }) => (
  <div className={classes.main}>{children}</div>
))
