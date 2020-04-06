import Link from 'next/link'

import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    marginTop: theme.spacing(3),
  },
  '@global': {
    // this property cannot be accessed through
    // the CSS API 🤯
    '.MuiOutlinedInput-root': {
      background: 'white',
    },
  },
  textInput: {
    marginBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      width: 350,
      marginBottom: theme.spacing(1),
    },
  },

  submitButton: {
    marginLeft: theme.spacing(2),
    marginTop: '1px',
    height: '3.4rem',
    boxShadow: theme.shadows[0],
  },

  terms: {
    display: 'block',
    fontSize: '12px',

    [theme.breakpoints.up('sm')]: {
      maxWidth: '680px',
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(10),
    },

    [theme.breakpoints.up('md')]: {
      marginBottom: theme.spacing(5),
    },
  },
}))

const Subscribe = () => {
  const classes = useStyles()
  return (
    <div>
      <form
        action="https://datengui.us17.list-manage.com/subscribe/post?u=4b79a045e2fce403d887f9147&amp;id=19233695e7"
        method="post"
        id="mc-embedded-subscribe-form"
        name="mc-embedded-subscribe-form"
        noValidate
      >
        <div className={classes.form}>
          <TextField
            className={classes.textInput}
            variant="outlined"
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
          . Durch das Eintragen bestätigst du, dass deine Daten zur Verarbeitung
          an Mailchimp übertragen werden.{' '}
          <Link href="/info/datenschutz">
            <a className={classes.termsLink}>
              Mehr zum Datenschutz bei Datenguide
            </a>
          </Link>
        </p>
      </small>
    </div>
  )
}

export default Subscribe
