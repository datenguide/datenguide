import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) =>  ({
    root: {
      display: 'block',
      position: 'relative',
      overflow: 'hidden',
      padding: theme.spacing(2),
      minHeight: theme.spacing(56),
      textDecoration: 'none',

      [theme.breakpoints.down('lg')]: {
        hyphens: 'auto'
      }
    },
    image: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      maxHeight: 320,
      minWidth: 400
    },
    title: {
      ...theme.typography.h3,
      position: 'relative',
      margin: theme.spacing(0, 0, 1, 0)
    },
    description: {
      position: 'relative',
      fontSize: theme.typography.body1.fontSize,
      color: 'black'
    }
  }))

const BlogPostListItem = ({
  href,
  title,
  description,
  background = '#c3e5f1',
  image,
}) => {
  const classes = useStyles()

  return (
    <a className={classes.root} href={href} style={{ background }}>
      {image && <img className={classes.image} src={image} />}
      <h3 className={classes.title}>{title}</h3>
      <div className={classes.description}>{description}</div>
    </a>
  )
}

export default BlogPostListItem
