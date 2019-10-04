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
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    backgroundImage: `url(${background})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '470px auto',
    backgroundPosition: '105% bottom',
    borderBottom: '1px solid #44707f'
  },

  emailInput: {
    width: 350,

    '& input': {
      borderRadius: '5px 5px 0 0',
      backgroundColor: '#ffffff'
    }
  },

  submitButton: {
    marginLeft: theme.spacing(2),
    paddingLeft: theme.spacing(3),
    height: '3.7rem',
    fontWeight: 'bold',
    boxShadow: 'none'
  },

  terms: {
    display: 'block',
    marginTop: theme.spacing(2)
  }
}))

export default function Subscribe() {
  const classes = useStyles()
  return (
    <section className={classes.root}>
      <Container fixed>
        <Box my={4}>
          <h1>Statistiken für alle!</h1>

          <form
            className="newsletter"
            action="https://datengui.us17.list-manage.com/subscribe/post?u=4b79a045e2fce403d887f9147&amp;id=19233695e7"
            method="post"
            id="mc-embedded-subscribe-form"
            name="mc-embedded-subscribe-form"
            noValidate
          >
            <TextField
              className={classes.emailInput}
              variant="filled"
              label="Deine Email-Adresse"
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
          </form>
        </Box>
      </Container>
    </section>
  )
}
