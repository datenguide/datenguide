import { makeStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.secondary.main,
    paddingBottom: theme.spacing(6),
    fontSize: theme.typography.body2.fontSize,
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    alignItems: 'center',
    flexWrap: 'wrap',
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
    },
  },

  avatar: {
    display: 'inline-block',
    background: theme.palette.grey[500],
    width: '200px',
    height: '200px',
  },

  member: {
    textAlign: 'center',
    padding: theme.spacing(4),

    [theme.breakpoints.up('md')]: {
      flexBasis: '50%',
    },

    [theme.breakpoints.up('lg')]: {
      flexBasis: '25%',
    },

    '& a': {
      textDecoration: 'none',
    },

    '& a:hover, & a:focus': {
      textDecoration: 'underline',
    },
  },

  name: {
    marginBottom: 0,
  },

  role: {
    color: theme.palette.grey[700],
  },
}))

const Team = ({ members }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      {members.map(({ name, role, url, image }) => (
        <div key={name} className={classes.member}>
          <Avatar alt="" src={image} className={classes.avatar} />
          <a href={url}>
            <h3 className={classes.name}>{name}</h3>
          </a>
          <span className={classes.role}>{role}</span>
        </div>
      ))}
    </div>
  )
}

export default Team
