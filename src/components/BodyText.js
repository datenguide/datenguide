import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    hyphens: 'auto',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    paddingTop: theme.spacing(3),

    '& .contentImage': {
      padding: theme.spacing(5, 0, 2, 0),
      [theme.breakpoints.up('lg')]: {
        width: '70%',
      },
    },
    '& hr': {
      border: `1px solid ${theme.palette.grey[200]}`,
    },
    '& small': {
      paddingBottom: theme.spacing(3),
      [theme.breakpoints.up('lg')]: {
        width: '70%',
      },
    },
    '& p, & ul, & ol': {
      [theme.breakpoints.up('lg')]: {
        width: '70%',
      },
    },
    '& pre': {
      [theme.breakpoints.up('lg')]: {
        width: '70%',
      },
    },
  },
}))

const DefaultLayout = (props) => {
  const classes = useStyles()

  return <div className={classes.root}>{props.children}</div>
}

export default DefaultLayout
