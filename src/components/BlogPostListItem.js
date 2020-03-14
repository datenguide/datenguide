import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(5)
  },
  date: {
    color: theme.palette.grey[400],
    fontWeight: 'bold'
  },
  title: {
    margin: 0,
    '&:hover': {
      fontWeight: 'bold'
    }
  },
  description: {
    fontSize: theme.typography.subtitle1.fontSize
  },
  link: {
    textDecoration: 'none'
  }
}))

const BlogPostListItem = ({ href, date, title, description }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <a className={classes.link} href={href}>
        <div className={classes.date}>{date}</div>
        <h2 className={classes.title}>{title}</h2>
        <div className={classes.description}>{description}</div>
      </a>
    </div>
  )
}

export default BlogPostListItem
