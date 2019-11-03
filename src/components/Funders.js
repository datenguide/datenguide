import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import LOGO_BMBF from '../assets/funders/bmbf.svg'
import LOGO_PROTOTYPEFUND from '../assets/funders/prototypefund.svg'
import LOGO_MIZ from '../assets/funders/miz.svg'

const useStyles = makeStyles(theme => ({
  root: {
    '& img': {
      height: 80,
      margin: theme.spacing(5, 5, 5, 0)
    }
  },

  bmbf: {
    position: 'relative',
    top: -10,

    '& img': {
      height: 100
    }
  }
}))

export default function Header ({ menuButton }) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <a
        className={classes.bmbf}
        href="https://www.bmbf.de/de/software-sprint-freie-programmierer-unterstuetzen-3512.html"
      >
        <img
          src={LOGO_BMBF}
          alt="Bundesministerium für Bildung und Forschung"
        />
      </a>
      <a href="https://prototypefund.de/">
        <img src={LOGO_PROTOTYPEFUND} alt="Prototype Fund" />
      </a>
      <a href="https://miz-babelsberg.de">
        <img src={LOGO_MIZ} alt="MIZ Babelsberg" />
      </a>
    </div>
  )
}
