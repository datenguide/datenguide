import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    padding: theme.spacing(4, 2),
  },
  screenshot: {
    maxWidth: '400px',
  },
}))

const RegionKeyScreenshot = ({ url1, alt1, url2, alt2 }) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <img src={url1} alt={alt1} className={classes.screenshot} />
      {url2 && <img src={url2} alt={alt2} className={classes.screenshot} />}
    </div>
  )
}

export default RegionKeyScreenshot
