import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#c3e5f1',
    padding: theme.spacing(8, 0),
    borderBottom: '1px solid',
    borderBottomColor: theme.palette.secondary.main,
  },

  content: {
    ...theme.typography.subtitle2,
    marginRight: theme.spacing(4),

    '& p': {
      margin: theme.spacing(2, 0),
    },
  },

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
    height: '3.75rem',
    boxShadow: theme.shadows[0],
  },

  terms: {
    color: theme.palette.secondary.dark,
    opacity: 0.9,
    fontSize: '0.75em',
    hyphens: 'auto',

    '& a': {
      color: 'inherit',
    },
  },
}))

const Subscribe = ({ children }) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Container>
        <Grid container direction="row" justify="center" spacing={2}>
          <Grid item sm={12} md={6} lg={7}>
            <div className={classes.content}>{children}</div>

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
                  color="secondary"
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
          </Grid>

          <Grid item sm={12} md={6} lg={5}>
            <div className={classes.terms}>
              <p>
                Wir schicken dir die neuesten Infos über das Projekt Datenguide
                – unregelmäßig und nur wenige Male pro Jahr. Deine
                E-Mail-Adresse wird von uns ausschliesslich zur Information über
                den Datenguide genutzt und nicht an Dritte weitergegeben.
              </p>
              <p>
                Für diesen Newsletter verwenden wir Mailchimp,{' '}
                <a href="http://mailchimp.com/">
                  deren Datenschutzerklärung du hier einsehen kannst
                </a>
                . Durch das Eintragen bestätigst du, dass deine Daten zur
                Verarbeitung an Mailchimp übertragen werden.
              </p>
              <p>
                <a href="/info/datenschutz">
                  Mehr zum Datenschutz bei Datenguide
                </a>
              </p>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

export default Subscribe
