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

    '& :not(pre) code': {
      background: theme.palette.grey[200],
      padding: theme.spacing(0.25, 0.75),
      borderRadius: 5,
    },

    '& .contentImage': {
      margin: theme.spacing(2, 0),
      width: '100%',
    },
  },
  aside: {
    display: 'block',
    position: 'relative',
    fontSize: theme.typography.body2.fontSize,
  },

  asideInner: {
    [theme.breakpoints.up('md')]: {
      position: 'absolute',
      width: '42%',
      right: '-42%',
      paddingLeft: theme.spacing(4),
    },
  },
}))

export const BodyText = (props) => {
  const classes = useStyles()
  return <div className={classes.root}>{props.children}</div>
}

export const BodyTextAside = (props) => {
  const classes = useStyles()
  return (
    <aside className={classes.aside}>
      <div className={classes.asideInner}>{props.children}</div>
    </aside>
  )
}
