import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    margin: '0 auto',
    hyphens: 'auto',

    [theme.breakpoints.up('md')]: {
      marginRight: '30%',
    },

    '& h1, h2, h3, h4, h5, h6': {
      marginBottom: theme.spacing(2),
      marginTop: '1em',
    },

    '& p, ol, ul, dl, table, iframe, pre, small': {
      margin: theme.spacing(0, 0, 2, 0),
    },

    '& hr': {
      border: `1px solid ${theme.palette.grey[200]}`,
    },

    '& .contentImage': {
      margin: theme.spacing(2, 0),
      width: '100%',
    },
  },
}))

const BodyText = (props) => {
  const classes = useStyles()
  return <div className={classes.root}>{props.children}</div>
}

export default BodyText
