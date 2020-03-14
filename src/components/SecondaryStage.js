import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

import backgroundRight from '../assets/hero_city.svg'
import backgroundLeft from '../assets/hero_village.svg'
import BodyText from './BodyText'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexGrow: 1,
    height: '300px',
    fontSize: theme.typography.body1.fontSize,
    backgroundColor: '#c3e5f1',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(6),

    [theme.breakpoints.up('sm')]: {
      borderBottom: '1px solid #44707f',
      paddingBottom: theme.spacing(9),
      position: 'relative',
      '&::after': {
        content: '""',
        backgroundImage: `url(${backgroundRight})`,
        backgroundRepeat: 'no-repeat',
        position: 'absolute',
        opacity: '0.5',
        width: '350px',
        top: 0,
        bottom: 0,
        right: 0,
        backgroundSize: '350px auto'
      }
    },

    [theme.breakpoints.up('lg')]: {
      paddingBottom: theme.spacing(4)
    },

    [theme.breakpoints.up('xl')]: {
      backgroundSize: '560px auto',
      backgroundPosition: '85% bottom'
    }
  },

  title: {
    marginLeft: theme.spacing(4),
    fontSize: '2rem',
    width: '50%'
  },

  content: {
    h1: {
      marginBottom: theme.spacing(2),
      color: theme.palette.secondary.dark,

      [theme.breakpoints.up('md')]: {
        fontSize: theme.typography.h3.fontSize
      }
    }
  }
}))

const SecondaryStage = ({ children }) => {
  const classes = useStyles()
  return (
    <section className={classes.root}>
      <h1 className={classes.title}>
        Der Datenguide hilft dir dabei, dich im Dschungel der Statistiken
        zurecht zu finden.
      </h1>
    </section>
  )
}

export default SecondaryStage
