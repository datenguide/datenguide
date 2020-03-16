import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    hyphens: 'auto',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    paddingTop: theme.spacing(3),

    '& .contentImage': {
      maxWidth: '70%',
      padding: theme.spacing(5, 0, 2, 0)
    },
    '& hr': {
      border: `1px solid ${theme.palette.grey[200]}`
    },
    '& small': {
      width: '70%',
      paddingBottom: theme.spacing(3)
    },
    '& p, & ul, & ol': {
      [theme.breakpoints.up('lg')]: {
        width: '70%'
      }
    },
    '& pre': {
      [theme.breakpoints.up('lg')]: {
        width: '70%'
      }
    }
  }
}))

const DefaultLayout = props => {
  const classes = useStyles()

  return <div className={classes.root}>{props.children}</div>
}

export default DefaultLayout
