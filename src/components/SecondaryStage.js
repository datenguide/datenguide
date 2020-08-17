import { makeStyles } from '@material-ui/core/styles'

import background from '../assets/hero_city.svg'

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    backgroundColor: '#c3e5f1',
    borderBottom: '1px solid #44707f',
    display: 'flex',
    minHeight: '200px',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: theme.typography.body1.fontSize,
    backgroundImage: `url(${background})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '180px auto',
    backgroundPosition: '105% 100%',
    [theme.breakpoints.up('sm')]: {
      backgroundSize: '300px auto',
      minHeight: '256px',
      justifyContent: 'flex-start',
    },
    [theme.breakpoints.up('md')]: {
      justifyContent: 'center',
    },
  },

  title: {
    margin: theme.spacing(0),
    fontSize: theme.typography.h3.fontSize,
    width: '70%',
  },
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
