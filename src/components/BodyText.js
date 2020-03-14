import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    hyphens: 'auto',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    fontSize: '1.2em', // TODO define theme typography instead of adjusting here

    '& img': {
      maxWidth: '100%',
      padding: theme.spacing(5, 0, 2, 0)
    },
    '& hr': {
      border: `1px solid ${theme.palette.grey[200]}`
    },
    '& small': {
      paddingBottom: theme.spacing(3)
    }
  }
}))

const DefaultLayout = props => {
  const classes = useStyles()

  return <div className={classes.root}>{props.children}</div>
}

export default DefaultLayout
