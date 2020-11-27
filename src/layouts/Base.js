import { makeStyles } from '@material-ui/core/styles'

import Head from '../components/Head'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column',
    fontSize: theme.typography.body1.fontSize,

    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.body2.fontSize,
    },

    '& .footnotes': {
      padding: theme.spacing(3, 0),

      '& hr': {
        border: 0,
        height: 1,
        background: theme.palette.grey[400],
        outline: 0,
      },

      '& a': {
        color: theme.palette.grey[600],
      },

      '& ol': {
        color: theme.palette.grey[600],
        padding: theme.spacing(4, 3),
        fontSize: theme.typography.body2.fontSize,
      },

      '& li': {
        marginBottom: theme.spacing(2),
      },
    },

    '& .footnote-backref': {
      textDecoration: 'none',
      marginLeft: theme.spacing(1),
      verticalAlign: 'sub',
      fontFamily: 'ibm-plex-sans',
    },

    '& .footnote-ref': {
      textDecoration: 'none',
      fontSize: theme.typography.body2.fontSize,
    },
  },

  toolbarSpacing: theme.mixins.toolbar,
}))

export default function BaseLayout({ children, meta = {} }) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <div className={classes.toolbarSpacing} />
      <Head
        title={meta.title || 'Datenguide'}
        description={meta.description}
        previewImage={meta.previewImage}
      />
      {children}
    </div>
  )
}
