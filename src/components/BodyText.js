import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    hyphens: 'auto',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    paddingTop: theme.spacing(3),

    '& p, ol, ul, iframe, pre': {
      margin: theme.spacing(0, 0, 2, 0),
      [theme.breakpoints.up('lg')]: {
        width: '70%',
      },
    },

    '& h1, h2, h3, h4, h5, h6': {
      margin: theme.spacing(2, 0),
    },

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
  },
}))

const BodyText = (props) => {
  const classes = useStyles()
  return <div className={classes.root}>{props.children}</div>
}

export default BodyText
