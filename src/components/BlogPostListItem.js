import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(5),
  },
  metaInfo: {
    color: theme.palette.grey[500],
  },
  title: {
    margin: 0,
    '&:hover': {
      fontWeight: 'bold',
    },
  },
  description: {
    fontSize: theme.typography.body1.fontSize,
  },
  link: {
    textDecoration: 'none',
  },
}))

const BlogPostListItem = ({ href, date, title, description }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <a className={classes.link} href={href}>
        {date && <div className={classes.metaInfo}>{date}</div>}
        <h3 className={classes.title}>{title}</h3>
        <div className={classes.description}>{description}</div>
      </a>
    </div>
  )
}

export default BlogPostListItem
