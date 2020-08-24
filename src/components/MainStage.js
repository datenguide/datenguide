import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'

import background from '../assets/hero_city.svg'

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '480px',
    backgroundColor: '#c3e5f1',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(6),
    borderBottom: '1px solid',
    fontSize: theme.typography.body1.fontSize,

    [theme.breakpoints.up('sm')]: {
      fontSize: theme.typography.subtitle2.fontSize,
      backgroundImage: `url(${background})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: '480px auto',
      backgroundPosition: '120% bottom',
      paddingBottom: theme.spacing(20),
    },

    [theme.breakpoints.up('md')]: {
      fontSize: theme.typography.subtitle1.fontSize,
      backgroundPosition: '110% bottom',
    },

    [theme.breakpoints.up('lg')]: {
      backgroundSize: '560px auto',
      backgroundPosition: '95% bottom',
    },

    [theme.breakpoints.up('xl')]: {
      backgroundPosition: '80% bottom',
    },
  },

  content: {
    '& p': {
      marginTop: '0',
      marginBottom: theme.spacing(2),
    },

    '& h1': {
      marginBottom: theme.spacing(2),
      color: theme.palette.secondary.dark,

      [theme.breakpoints.up('md')]: {
        fontSize: theme.typography.h1.fontSize,
      },
    },

    '& strong': {
      color: theme.palette.secondary.dark,
    },

    [theme.breakpoints.up('md')]: {
      maxWidth: '620px',
    },

    [theme.breakpoints.up('md')]: {
      maxWidth: '780px',
    },
  },

  cta: {
    margin: theme.spacing(2, 2, 0, 0),
    fontSize: theme.typography.body2.fontSize,
  },
}))

const MainStage = ({ children }) => {
  const classes = useStyles()
  return (
    <section className={classes.root}>
      <Container>
        <div className={classes.content}>{children}</div>
        <Button
          variant="contained"
          size="large"
          color="secondary"
          className={classes.cta}
          disableElevation
          href="/statistiken"
        >
          Datenportal
        </Button>
        <Button
          variant="outlined"
          size="large"
          color="secondary"
          className={classes.cta}
          href="/statistik-erklaert"
        >
          Statistik erklärt
        </Button>
      </Container>
    </section>
  )
}

export default MainStage
