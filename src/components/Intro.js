import Link from 'next/link'

import { makeStyles } from '@mui/styles'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'

import chartIcon from '../assets/openmoji/chart.svg'
import codeIcon from '../assets/openmoji/code.svg'
import technologistIcon from '../assets/openmoji/technologist.svg'

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(6),

    [theme.breakpoints.up('xl')]: {
      paddingTop: theme.spacing(7),
      paddingBottom: theme.spacing(7),
    },
  },

  main: {
    ...theme.typography.body1,
    paddingBottom: theme.spacing(6),

    [theme.breakpoints.up('md')]: {
      paddingRight: theme.spacing(9),
    },

    [theme.breakpoints.up('lg')]: {
      fontSize: theme.typography.subtitle2.fontSize,
    },

    '& h2': {
      marginBottom: 0,
      fontSize: theme.typography.h3.fontSize,
    },
  },

  cta: {
    marginTop: theme.spacing(2),
    fontSize: theme.typography.body2.fontSize,
  },

  features: {
    padding: 0,
    listStyle: 'none',

    [theme.breakpoints.up('lg')]: {
      marginBottom: theme.spacing(3),
    },

    '& h3': {
      marginBottom: 0,
    },

    '& li': {
      position: 'relative',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: '0 22px',
      backgroundSize: 'auto 95px',
      paddingLeft: '105px',
      paddingBottom: theme.spacing(4),
      fontSize: theme.typography.body2.fontSize,
    },
  },

  statistics: {
    backgroundImage: `url(${chartIcon})`,
  },

  api: {
    backgroundImage: `url(${codeIcon})`,
  },

  literacy: {
    backgroundImage: `url(${technologistIcon})`,
  },

  featureText: {
    margin: 0,
    paddingTop: theme.spacing(1),
  },
}))

export default function Intro({ children, features }) {
  const classes = useStyles()
  return (
    <Container className={classes.root}>
      <Grid container direction="row" justifyContent="center" alignItems="center">
        <Grid item md={6} lg={7} className={classes.main}>
          {children}
          <Link legacyBehavior href="/info">
            <Button
              variant="outlined"
              color="secondary"
              size="large"
              className={classes.cta}
            >
              Mehr über Datenguide
            </Button>
          </Link>
        </Grid>
        <Grid item md={6} lg={5}>
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
  );
}
