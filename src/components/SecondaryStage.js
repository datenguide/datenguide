import { makeStyles } from '@material-ui/core/styles'
import background from '../assets/hero_city.svg'

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    backgroundColor: '#c3e5f1',
    borderBottom: '1px solid #44707f',
    display: 'flex',
    height: theme.spacing(25),
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: theme.typography.body1.fontSize,
    backgroundImage: `url(${background})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '180px auto',
    backgroundPosition: '105% 100%',
    [theme.breakpoints.up('sm')]: {
      backgroundSize: '300px auto',
      height: theme.spacing(32),
      justifyContent: 'flex-start'
    },
    [theme.breakpoints.up('md')]: {
      justifyContent: 'center'
    }
  },

  title: {
    margin: theme.spacing(0),
    marginLeft: theme.spacing(4),
    fontSize: '1rem',
    width: '70%',

    [theme.breakpoints.up('sm')]: {
      fontSize: '2rem',
      width: '50%',
      marginLeft: theme.spacing(4)
    },
    [theme.breakpoints.up('md')]: {
      marginLeft: 0
    }
  }
}))

const SecondaryStage = ({ claim }) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <h1 className={classes.title}>{claim}</h1>
    </div>
  )
}

export default SecondaryStage
