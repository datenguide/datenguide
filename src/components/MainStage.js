import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

import background from '../assets/hero_city.svg'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '600px',
    fontSize: theme.typography.subtitle2.fontSize,
    backgroundColor: '#c3e5f1',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(6),
    borderBottom: '1px solid',

    [theme.breakpoints.up('sm')]: {
      backgroundImage: `url(${background})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: '560px auto',
      backgroundPosition: '110% bottom',
      paddingBottom: theme.spacing(9),
    },

    [theme.breakpoints.up('lg')]: {
      paddingBottom: theme.spacing(4),
    },

    [theme.breakpoints.up('xl')]: {
      backgroundSize: '560px auto',
      backgroundPosition: '85% bottom',
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
        fontSize: theme.typography.h2.fontSize,
      },
    },

    '& strong': {
      color: theme.palette.secondary.dark,
    },

    [theme.breakpoints.up('sm')]: {
      maxWidth: '620px',
    },

    [theme.breakpoints.up('md')]: {
      maxWidth: '740px',
    },
  },
}))

const MainStage = ({ children }) => {
  const classes = useStyles()
  return (
    <section className={classes.root}>
      <Container>
        <div className={classes.content}>{children}</div>
      </Container>
    </section>
  )
}

export default MainStage
