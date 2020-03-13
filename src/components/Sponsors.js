import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    background: '#fff'
  }
}))

export default function Header({ menuButton }) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <a className={classes.homeLink} />
    </div>
  )
}
