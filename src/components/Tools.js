import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Avatar from '@material-ui/core/Avatar'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
  container: {
    backgroundColor: theme.palette.grey[50],
    color: theme.palette.secondary.main,
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(6),

    [theme.breakpoints.up('lg')]: {
      paddingTop: theme.spacing(10),
      paddingBottom: theme.spacing(10)
    }
  },

  content: {
    color: theme.palette.text.primary,
    hyphens: 'auto',
    paddingBottom: theme.spacing(3),

    [theme.breakpoints.up('md')]: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',

      '& h2': {
        width: '100%'
      },

      '& p': {
        width: 'calc(50% - 1rem)'
      }
    }
  },

  card: {
    '& h3': {
      margin: 0
    }
  },

  avatar: {
    marginLeft: '-1rem'
  }
}))

export default function Tools({ children, features }) {
  const classes = useStyles()
  return (
    <div className={classes.container}>
      <Container fixed>
        <div className={classes.content}>{children}</div>

        <Grid container justify="center" spacing={3}>
          {features.map(({ slug, title, desc, url, author, action }) => (
            <Grid key={slug} item md={4} spacing={2}>
              <Card className={classes.card}>
                <CardContent>
                  <CardHeader
                    avatar={<Avatar className={classes.avatar}>R</Avatar>}
                    action={<div className={classes.beta}>beta</div>}
                    title={<h3 className={classes.title}>{title}</h3>}
                    subheader={
                      <a
                        href={author.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {author.name}
                      </a>
                    }
                  />
                  <Typography variant="body2" component="p">
                    {desc}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">{action}</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  )
}
