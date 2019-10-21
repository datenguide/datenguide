import React from 'react'
import Link from 'next/link'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

import chartIcon from '../assets/openmoji/chart.svg'
import codeIcon from '../assets/openmoji/code.svg'
import technologistIcon from '../assets/openmoji/technologist.svg'

const useStyles = makeStyles(theme => ({
  container: {
    paddingTop: theme.spacing(6),

    [theme.breakpoints.up('lg')]: {
      paddingTop: theme.spacing(10),
      paddingBottom: theme.spacing(6)
    }
  },

  main: {
    paddingBottom: theme.spacing(6),

    [theme.breakpoints.up('md')]: {
      fontSize: theme.typography.body1.fontSize,
      paddingRight: theme.spacing(3)
    },

    [theme.breakpoints.up('lg')]: {
      fontSize: theme.typography.h6.fontSize
    }
  },

  features: {
    padding: 0,
    listStyle: 'none',

    [theme.breakpoints.up('lg')]: {
      marginLeft: theme.spacing(6),
      marginBottom: theme.spacing(3)
    },

    '& h3': {
      marginBottom: 0
    },

    '& li': {
      position: 'relative',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'auto 7em',
      paddingLeft: '8em',
      paddingBottom: theme.spacing(6)
    },

    [theme.breakpoints.down('md')]: {
      fontSize: theme.typography.caption.fontSize
    }
  },

  statistics: {
    backgroundImage: `url(${chartIcon})`
  },

  api: {
    backgroundImage: `url(${codeIcon})`
  },

  literacy: {
    backgroundImage: `url(${technologistIcon})`
  },

  featureText: {
    margin: 0,
    paddingTop: theme.spacing(1)
  }
}))

export default function Intro({ children, features }) {
  const classes = useStyles()
  return (
    <Container className={classes.container} fixed>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item md={6} className={classes.main}>
          {children}
          <Link href="/about">
            <Button variant="outlined" color="primary">
              Mehr über Datenguide
            </Button>
          </Link>
        </Grid>
        <Grid item md={6}>
          <ul className={classes.features}>
            {features.map(({ text, title, slug }) => (
              <li className={classes[slug]} key={slug}>
                <h3>{title}</h3>
                <p className={classes.featureText}>{text}</p>
              </li>
            ))}
          </ul>
        </Grid>
      </Grid>
    </Container>
  )
}