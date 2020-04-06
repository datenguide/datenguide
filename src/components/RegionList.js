import React from 'react'
import Link from 'next/link'
import { makeStyles } from '@material-ui/core/styles'
import CityIcon from 'mdi-material-ui/HomeCityOutline'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'block',
    position: 'relative',
    margin: 0,
    padding: '1.3rem 0',
    borderBottom: `1px solid ${theme.palette.grey[400]}`,
    listStyle: 'none',

    [theme.breakpoints.up('md')]: {
      columnCount: 2,
    },

    [theme.breakpoints.up('lg')]: {
      columnCount: 3,
    },

    [theme.breakpoints.up('xl')]: {
      columnCount: 4,
    },
  },

  item: {
    display: 'inline-block',
    width: '100%',
    margin: 0,
    padding: 0,
    minHeight: 70,

    '& a': {
      display: 'block',
      position: 'relative',
      minHeight: '3.2em',
      padding: '0.6em 1em 0.6em 3.6em',
      marginBottom: '0.5em',
      textDecoration: 'none',
      color: 'black',
    },
  },

  iconBackground: {
    display: 'block',
    left: 0,
    top: 10,
    height: 50,
    width: 50,
    position: 'absolute',
    borderRadius: '50%',
    background: '#c3e5f1',
  },

  icon: {
    position: 'relative',
    fill: theme.palette.secondary.main,
    left: 12,
    top: 12,
  },

  name: {
    width: '100%',
    margin: 0,
    padding: 0,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },

  type: {
    margin: 0,
    padding: 0,
    fontSize: 'smaller',
    color: theme.palette.grey[700],
  },
}))

export default function RegionList({ regions }) {
  const classes = useStyles()

  return (
    <ul className={classes.root}>
      {regions.map(({ slug, displayName, type }) => (
        <li className={classes.item} key={slug}>
          <Link href={`/region/${slug}`}>
            <a className={classes.link}>
              <div className={classes.iconBackground}>
                <CityIcon className={classes.icon} />
              </div>
              <h3 className={classes.name}>{displayName}</h3>
              <span className={classes.type}>{type}</span>
            </a>
          </Link>
        </li>
      ))}
    </ul>
  )
}
