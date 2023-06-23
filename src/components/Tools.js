import GithubIcon from 'mdi-material-ui/ArrowRightBold'

import { makeStyles } from '@mui/styles'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Button from '@mui/material/Button'
import Image from 'next/image'

import logoPython from '../assets/python.svg'
import logoDatenguide from '../assets/logo.svg'
import logoRlang from '../assets/rlang.svg'

const logos = {
  datenguide: logoDatenguide,
  python: logoPython,
  rlang: logoRlang,
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.grey[50],
    color: theme.palette.secondary.main,
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(6),
    fontSize: theme.typography.body2.fontSize,

    [theme.breakpoints.up('xl')]: {
      paddingTop: theme.spacing(9),
      paddingBottom: theme.spacing(9),
    },
  },

  content: {
    color: theme.palette.text.primary,
    hyphens: 'auto',
    paddingBottom: theme.spacing(5),

    [theme.breakpoints.up('md')]: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',

      '& h2': {
        width: '100%',
      },

      '& p': {
        width: 'calc(50% - 1.5rem)',
      },
    },
  },

  title: {
    margin: '0',
  },

  card: {
    boxShadow: '0 4px 20px 0 rgba(130, 130, 130,0.15)',
    [theme.breakpoints.up('lg')]: {
      marginBottom: theme.spacing(3),
    },
  },

  avatar: {
    marginTop: '0.3rem',
    width: '3rem',
    height: '3rem',
  },

  beta: {
    float: 'right',
    display: 'inline-block',
    marginLeft: '0.5rem',
    padding: '0.25em 0.5em',
    borderRadius: '0.25em',
    color: 'white',
    background: theme.palette.grey[500],
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },

  cardHeader: {
    paddingBottom: 0,
  },

  cardActions: {
    justifyContent: 'space-between',
  },

  action: {
    paddingLeft: '0.5rem',
    paddingRight: '0.5rem',
  },
}))

export default function Tools({ children, features }) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Container>
        <div className={classes.content}>{children}</div>

        <Grid container justifyContent="center" spacing={3}>
          {features.map(({ slug, title, desc, url, author, action }) => (
            <Grid key={slug} item md={4}>
              <Card className={classes.card}>
                <CardHeader
                  className={classes.cardHeader}
                  avatar={<Image className={classes.avatar} src={logos[slug]} />}
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

                <CardContent>{desc}</CardContent>

                <CardActions className={classes.cardActions}>
                  <Button
                    color="secondary"
                    size="small"
                    href={url}
                    target="_blank"
                    className={classes.action}
                    startIcon={<GithubIcon />}
                  >
                    {action}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}
