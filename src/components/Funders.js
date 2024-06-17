import { makeStyles } from '@material-ui/core/styles'

import LOGO_BMBF from '../assets/funders/bmbf.svg'
import LOGO_PROTOTYPEFUND from '../assets/funders/prototypefund.svg'
import LOGO_MIZ from '../assets/funders/miz.svg'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    paddingTop: theme.spacing(7),
    paddingBottom: theme.spacing(5),
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
  },
  prototypefund: {
    margin: theme.spacing(0, 8, 0, 0),
    height: '70px',
  },
  miz: {
    margin: theme.spacing(3, 8, 0, 0),
    height: '70px',
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(0),
    },
  },
  bmbf: {
    margin: theme.spacing(0, 8, 0, 0),
    position: 'relative',
    height: '90px',
    top: -25,
  },
}))

const Funders = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <a href="https://www.bmbf.de/de/software-sprint-freie-programmierer-unterstuetzen-3512.html">
        <img
          className={classes.bmbf}
          src={LOGO_BMBF}
          alt="Bundesministerium für Bildung und Forschung"
        />
      </a>
      <a href="https://prototypefund.de/">
        <img
          className={classes.prototypefund}
          src={LOGO_PROTOTYPEFUND}
          alt="Prototype Fund"
        />
      </a>
      <a href="https://miz-babelsberg.de">
        <img className={classes.miz} src={LOGO_MIZ} alt="MIZ Babelsberg" />
      </a>
    </div>
  )
}

export default Funders
