import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Avatar from '@material-ui/core/Avatar'

const useStyles = makeStyles(theme => ({
  root: {
    color: theme.palette.secondary.main,
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(6),
    fontSize: theme.typography.body1.fontSize,

    [theme.breakpoints.up('xl')]: {
      paddingTop: theme.spacing(9),
      paddingBottom: theme.spacing(9)
    }
  },

  avatar: {
    display: 'inline-block',
    background: theme.palette.grey[500],
    width: '200px',
    height: '200px'
  },

  member: {
    textAlign: 'center',

    '& a': {
      textDecoration: 'none'
    },

    '& a:hover, & a:focus': {
      textDecoration: 'underline'
    }
  },

  name: {
    marginBottom: 0
  },

  role: {
    color: theme.palette.grey[700]
  }
}))

export default function Team({ children, members }) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Grid container justify="flex-start" spacing={4}>
        {members.map(({ name, role, url, image }) => (
          <Grid key={name} item md={3} className={classes.member}>
            <Avatar alt="" src={image} className={classes.avatar} />
            <a href={url}>
              <h3 className={classes.name}>{name}</h3>
            </a>
            <span className={classes.role}>{role}</span>
          </Grid>
        ))}
      </Grid>
    </div>
  )
}
