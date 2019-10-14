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
    paddingTop: theme.spacing(5),

    [theme.breakpoints.up('lg')]: {
      padding: theme.spacing(10)
    }
  },

  main: {
    paddingBottom: theme.spacing(5),

    [theme.breakpoints.up('md')]: {
      fontSize: '1.2rem',
      paddingRight: theme.spacing(3)
    },

    [theme.breakpoints.up('lg')]: {
      paddingRight: theme.spacing(5)
    }
  },

  features: {
    padding: 0,
    listStyle: 'none',

    [theme.breakpoints.up('lg')]: {
      marginLeft: theme.spacing(5)
    },

    '& h3': {
      marginBottom: 0
    },

    '& li': {
      position: 'relative',
      marginBottom: theme.spacing(6),
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'auto 7em',
      paddingLeft: '8em'
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
