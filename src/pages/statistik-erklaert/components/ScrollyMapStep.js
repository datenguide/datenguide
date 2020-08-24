import React from 'react'
import { withStyles } from '@material-ui/core/styles'

const styles = (theme) => ({
  main: {
    background: 'white',
    padding: theme.spacing(1, 3),

    '& img': {
      width: '100%',
    },

    [theme.breakpoints.down('sm')]: {
      fontSize: '0.8em',
    },
  },
})

export default withStyles(styles)(({ classes, children }) => (
  <div className={classes.main}>{children}</div>
))
