import dynamic from 'next/dynamic'
import { makeStyles } from '@material-ui/core/styles'

const MapTooltip = dynamic(
  () => import('@datenguide/explorables').then(({ MapTooltip }) => MapTooltip),
  { ssr: false }
)

const useStyles = makeStyles((theme) => ({
  root: {
    width: 240,
  },

  title: {
    margin: 0,
  },

  hed: {
    fontSize: 14,
    marginTop: 0,
    marginBottom: 10,
  },

  image: {
    width: '260px',
    position: 'relative',
    left: '-10px',
  },

  facts: {
    fontSize: 14,
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },

  highlight: {
    fontSize: '1.3em',
  },
}))

export default function RegionTooltip({ title, lonLat }) {
  const classes = useStyles()

  return (
    <MapTooltip lonLat={lonLat} offsetTop={-15}>
      <div className={classes.root}>
        <h3 className={classes.title}>{title}</h3>
        <p className={classes.hed}>Gemeinde in Nordrhein-Westfalen</p>
        <img className={classes.image} src="/altena.jpg" width="100%" />
        <ul className={classes.facts}>
          <li>
            <b className={classes.highlight}>16.922</b>
            <span>Einwohner</span>
            <span>(2018)</span>
          </li>
          <li>
            Bevölkerungsdichte:{' '}
            <b>
              381 Einwohner je km<sup>2</sup>
            </b>
          </li>
          <li>
            Fläche:{' '}
            <b>
              44,42 km<sup>2</sup>
            </b>
          </li>
          <a href="/region/maerkischer-kreis">Alle Daten zu Altena</a>
        </ul>
      </div>
    </MapTooltip>
  )
}
