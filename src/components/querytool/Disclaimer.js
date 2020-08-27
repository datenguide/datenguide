import { makeStyles } from '@material-ui/styles'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles((theme) => ({
  root: {
    ...theme.typography.body2,
    backgroundColor: '#c3e5f1',
    padding: theme.spacing(2, 0),

    '& p': {
      margin: theme.spacing(0, 0, 1, 0),
      padding: 0,
      hyphens: 'auto',
    },
  },

  title: {
    ...theme.typography.h4,
    color: theme.palette.secondary.dark,
  },
}))

const Disclaimer = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Container>
        <h1 className={classes.title}>
          🚧 Dieses Datenportal ist ein Prototyp! 🚧
        </h1>
        <Grid container spacing={4}>
          <Grid item md={6}>
            <p>
              Datenguide ist ein nicht-kommerzielles Open-Source-Projekt. Wir
              übernehmen keine Gewähr für die Richtigkeit und Vollständigkeit
              der abgerufenen Daten. Wenn ihr diese Daten weiterverwendet oder
              veröffentlicht, gleicht sie bitte mit{' '}
              <a href="https://www.regionalstatistik.de/">regionalstatistik.de</a> ab.
            </p>
          </Grid>
          <Grid item md={6}>
            <p>
              Bei Bugs und Abstürzen schreibt bitte eine E-Mail an{' '}
              <a href="mailto:feedback@datengui.de">feedback@datengui.de</a>{' '}
              oder erstellt ein Issue auf&nbsp;
              <a
                href="https://github.com/datenguide/datenguide"
                target="_blank"
                rel="noopener noreferrer"
              >
                Github
              </a>
              .
            </p>
            <p>
              <b>Ihr wollt Datenguide verbessern?</b> Helft mit bei unserem
              Community-Sprint vom 25. bis 27.09.2020.{' '}
              <a href="/blog/2020/community-sprint">
                Mehr über den Community-Sprint
              </a>
            </p>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

export default Disclaimer
