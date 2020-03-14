import { makeStyles } from '@material-ui/core/styles'

import Head from '../components/Head'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column',
    fontSize: theme.typography.body1.fontSize
  },
  toolbarSpacing: theme.mixins.toolbar
}))

export default function Base({ children, meta }) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <div className={classes.toolbarSpacing} />
      <Head
        title={meta.title}
        description={meta.description}
        previewImage={meta.previewImage}
      />
      {children}
    </div>
  )
}
