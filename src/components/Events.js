import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'

import background from '../assets/background_events.jpg'

const useStyles = makeStyles(theme => {
  console.log(theme)
  return {
    container: {
      position: 'relative',
      backgroundColor: '#c3e5f1',
      color: theme.palette.secondary.main,

      '&::before': {
        [theme.breakpoints.up('md')]: {
          content: "''",
          position: 'absolute',
          right: 0,
          left: '50%',
          top: 0,
          bottom: 0,
          opacity: 0.6,
          backgroundImage: `url(${background})`,
          backgroundSize: 'cover',
          backgroundPosition: `right 0`,
          backgroundRepeat: 'no-repeat'
        }
      }
    },

    content: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6)
    },

    video: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
      position: 'relative',
      color: theme.palette.text.primary,

      [theme.breakpoints.up('md')]: {
        paddingLeft: theme.spacing(10),
        color: 'white',
        textShadow: `0 0 15px ${theme.palette.secondary.dark}`,

        '& a': {
          color: 'white'
        }
      }
    },

    dates: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
      color: theme.palette.text.secondary,

      '& li': {
        margin: 0,
        padding: 0,
        paddingBottom: theme.spacing(2)
      },

      '& h4': {
        margin: 0,
        lineHeight: 1.2,
        color: theme.palette.text.primary
      }
    },

    eventLink: {
      textDecoration: 'none'
    },

    attachments: {
      display: 'inline',
      margin: 0,
      padding: 0,

      '& li': {
        display: 'inline-block',
        margin: 0,
        padding: 0
      },

      '& li::before': {
        content: "' | '",
        display: 'inline-block',
        textDecoration: 'none',
        paddingLeft: '0.3em',
        paddingRight: '0.3em'
      }
    }
  }
})

function Attachments({ items }) {
  const classes = useStyles()
  return (
    <ul className={classes.attachments}>
      {items.map(({ type, url }, key) => (
        <li key={key}>
          <a href={url} target="_blank" rel="noopener noreferrer">
            {type}
          </a>
        </li>
      ))}
    </ul>
  )
}

function Dates({ items }) {
  const classes = useStyles()
  return (
    <ul className={classes.dates}>
      {items.map(({ title, date, url, attachments }, key) => (
        <li key={key}>
          <a
            href={url}
            className={classes.eventLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h4>{title}</h4>
          </a>
          <time>{date}</time>
          {attachments && <Attachments items={attachments} />}
        </li>
      ))}
    </ul>
  )
}

export default function Events({ children, dates: { past, upcoming } }) {
  const classes = useStyles()
  return (
    <div className={classes.container}>
      <Container fixed>
        <Grid container direction="row" justify="center" alignItems="top">
          <Grid item md={6}>
            <section className={classes.content}>
              <h3>Termine</h3>
              {upcoming && <Dates items={upcoming} />}

              <h3>Vergangene Termine</h3>
              {past && <Dates items={past} />}
            </section>
          </Grid>
          <Grid item md={6}>
            <section className={classes.video}>{children}</section>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}
