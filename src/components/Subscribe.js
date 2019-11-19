import React from 'react'
import Link from 'next/link'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'

import background from '../assets/hero_city.svg'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    fontSize: theme.typography.body1.fontSize,
    backgroundColor: '#c3e5f1',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(6),

    [theme.breakpoints.up('sm')]: {
      backgroundImage: `url(${background})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: '560px auto',
      backgroundPosition: '110% bottom',
      borderBottom: '1px solid #44707f',
      paddingBottom: theme.spacing(9)
    },

    [theme.breakpoints.up('lg')]: {
      paddingBottom: theme.spacing(4)
    },

    [theme.breakpoints.up('xl')]: {
      backgroundSize: '560px auto',
      backgroundPosition: '85% bottom'
    }
  },

  intro: {
    '& p': {
      marginTop: '0',
      marginBottom: theme.spacing(2)
    },

    '& h1': {
      marginBottom: theme.spacing(2),
      color: theme.palette.secondary.dark,

      [theme.breakpoints.up('md')]: {
        fontSize: theme.typography.h3.fontSize
      }
    },

    '& strong': {
      color: theme.palette.secondary.dark
    },

    [theme.breakpoints.up('sm')]: {
      maxWidth: '620px'
    },

    [theme.breakpoints.up('md')]: {
      maxWidth: '740px',
      fontSize: theme.typography.h5.fontSize
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

    [theme.breakpoints.up('md')]: {
      '& input, label': {
        fontSize: '1.3rem'
      }
    },

    '& input': {
      borderRadius: '5px 5px 0 0',
      backgroundColor: 'white'
    }
  },

  submitButton: {
    marginLeft: theme.spacing(2),
    paddingLeft: theme.spacing(3),
    boxShadow: 'none',

    [theme.breakpoints.up('md')]: {
      height: '3.8rem'
    }
  },

  terms: {
    display: 'block',
    fontSize: '12px',

    [theme.breakpoints.up('sm')]: {
      maxWidth: '620px',
      marginBottom: theme.spacing(10)
    },

    [theme.breakpoints.up('md')]: {
      maxWidth: '60%',
      marginBottom: theme.spacing(5)
    }
  },

  checkboxLabel: {
    display: 'block',
    fontSize: '1.5rem',
    margin: theme.spacing(0.75, -1.5)
  },

  icon: {
    borderRadius: 5,
    width: 18,
    height: 18,
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: theme.palette.secondary.main,
    margin: 3,
    backgroundColor: 'white',

    'input:hover ~ &': {
      opacity: 0.8
    }
  }
}))

export default function Subscribe({ children }) {
  const classes = useStyles()
  return (
    <section className={classes.root}>
      <Container>
        <div className={classes.intro}>{children}</div>

        <form
          action="https://datengui.us17.list-manage.com/subscribe/post?u=4b79a045e2fce403d887f9147&amp;id=19233695e7"
          method="post"
          id="mc-embedded-subscribe-form"
          name="mc-embedded-subscribe-form"
          noValidate
        >
          <div className={classes.form}>
            <TextField
              className={classes.emailInput}
              variant="filled"
              label="E-Mail-Adresse"
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
          </div>

          <FormControlLabel
            control={
              <Checkbox
                value="checked"
                name="gdpr[42365]"
                icon={<span className={classes.icon} />}
                className={classes.checkbox}
              />
            }
            label="Ja, schickt mir Infos per E-Mail."
            className={classes.checkboxLabel}
          />
        </form>
        <small className={classes.terms}>
          <p>
            Wir schicken dir die neuesten Infos über das Projekt Datenguide –
            unregelmäßig und nur wenige Male pro Jahr. Deine E-Mail-Adresse wird
            von uns ausschliesslich zur Information über den Datenguide genutzt
            und nicht an Dritte weitergegeben.
          </p>

          <p>
            Für diesen Newsletter verwenden wir Mailchimp,{' '}
            <a href="http://mailchimp.com/">
              deren Datenschutzerklärung du hier einsehen kannst
            </a>
            . Durch das Eintragen bestätigst du, dass deine Daten zur
            Verarbeitung an Mailchimp übertragen werden.{' '}
            <Link href="/info/datenschutz">
              <a className={classes.termsLink}>
                Mehr zum Datenschutz bei Datenguide
              </a>
            </Link>
          </p>
        </small>
      </Container>
    </section>
  )
}
