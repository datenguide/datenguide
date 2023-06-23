import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    background: '#fff',
  },
}))

export default function Header({ menuButton }) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <a className={classes.homeLink} />
    </div>
  )
}
