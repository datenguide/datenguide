import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import PopulationIcon from 'mdi-material-ui/AccountMultiple'
import DataIcon from 'mdi-material-ui/TableLarge'

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(3)
  },

  container: {
    color: theme.palette.secondary.main
  },

  icon: {
    position: 'relative',
    top: 20,
    width: 80,
    height: 80,
    marginRight: '.5em'
  },

  number: {
    fontSize: 50,
    lineHeight: 1,
    fontWeight: 'bold'
  },

  title: {
    margin: 0,
    color: theme.palette.secondary.main,
    fontWeight: 'bold'
  },

  download: {
    display: 'flex'
  },

  downloadIcon: {
    position: 'relative',
    top: '.1em',
    width: '.6em',
    height: '.6em',
    marginRight: '.2em'
  }
}))

const FigureHighlight = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <PopulationIcon className={classes.icon} />
        <div className={classes.number}>10,9 Millionen</div>
      </div>
      <p className={classes.title}>Menschen leben in Baden-Württemberg</p>
      <small>Daten aus der Bevölkerungsfortschreibung. Stand: 2018</small>
      <a className={classes.download}>
        <small>
          <DataIcon className={classes.downloadIcon} />
          Mehr Daten anzeigen und herunterladen
        </small>
      </a>
    </div>
  )
}

export default FigureHighlight
