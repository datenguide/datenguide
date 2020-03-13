import { makeStyles } from '@material-ui/core/styles'

import Head from '../components/Head'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column',
    paddingTop: theme.spacing(5),
    fontSize: theme.typography.body1.fontSize
  }
}))

export default function Base({ children, meta }) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Head
        title={meta.title}
        description={meta.description}
        previewImage={meta.previewImage}
      />
      {children}
    </div>
  )
}
