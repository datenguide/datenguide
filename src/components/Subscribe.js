import React from 'react'
import Link from 'next/link'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import background from '../assets/hero_city.svg'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#c3e5f1',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(6),

    [theme.breakpoints.up('md')]: {
      backgroundImage: `url(${background})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: '560px auto',
      backgroundPosition: '110% bottom',
      borderBottom: '1px solid #44707f'
    },

    [theme.breakpoints.up('lg')]: {
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(5)
    },

    [theme.breakpoints.up('xl')]: {
      backgroundSize: '560px auto',
      backgroundPosition: '85% bottom',
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(10)
    }
  },

  title: {
    marginBottom: theme.spacing(2),
    color: theme.palette.secondary.dark,

    [theme.breakpoints.up('md')]: {
      fontSize: theme.typography.h4.fontSize
    }
  },

  intro: {
    marginTop: '0',
    marginBottom: theme.spacing(2),

    '& b': {
      color: theme.palette.secondary.dark
    },

    [theme.breakpoints.up('md')]: {
      maxWidth: '720px',
      fontSize: theme.typography.h6.fontSize
    }
  },

  form: {
    display: 'flex',
    marginTop: theme.spacing(3)
  },

  emailInput: {
    [theme.breakpoints.up('sm')]: {
      width: 350
    },

    '& input': {
      borderRadius: '5px 5px 0 0',
      backgroundColor: '#ffffff'
    }
  },

  submitButton: {
    marginLeft: theme.spacing(2),
    paddingLeft: theme.spacing(3),
    height: '3.7rem',
    boxShadow: 'none'
  },

  terms: {
    display: 'block',
    marginTop: theme.spacing(2),

    [theme.breakpoints.up('md')]: {
      maxWidth: '60%'
    }
  }
}))

export default function Subscribe() {
  const classes = useStyles()
  return (
    <section className={classes.root}>
      <Container fixed>
        <Box my={4}>
          <h1 className={classes.title}>Statistiken für alle</h1>

          <p className={classes.intro}>
            Der Datenguide macht die amtliche Statistik zugänglicher für alle.
            Wir arbeiten an einer digitalen Plattform, die regionale Statiken
            klar und prägnant darstellt, vergleichbar macht und erklärt.
          </p>

          <p className={classes.intro}>
            <b>🚧 Der Datenguide ist noch in Arbeit.</b> Wenn du zu den ersten
            Nutzer:innen gehören willst, melde dich für unseren Newsletter an.
          </p>

          <form
            className={classes.form}
            action="https://datengui.us17.list-manage.com/subscribe/post?u=4b79a045e2fce403d887f9147&amp;id=19233695e7"
            method="post"
            id="mc-embedded-subscribe-form"
            name="mc-embedded-subscribe-form"
            noValidate
          >
            <TextField
              className={classes.emailInput}
              variant="filled"
              label="Email-Adresse"
              type="email"
              id="email"
              name="EMAIL"
              autoComplete="email"
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              color="secondary"
              className={classes.submitButton}
            >
              Eintragen
            </Button>
          </form>
          <small className={classes.terms}>
            Deine Email-Adressen wird von uns ausschliesslich zur Information
            über den Datenguide genutzt und nicht an Dritte weitergegeben. Für
            diesen Verteiler verwenden wir{' '}
            <a href="http://mailchimp.com/">Mailchimp</a>.{' '}
            <Link href="/info/datenschutz">
              <a className={classes.termsLink}>
                Mehr zum Datenschutz bei Datenguide
              </a>
            </Link>
          </small>
        </Box>
      </Container>
    </section>
  )
}
