import dynamic from 'next/dynamic'
import { makeStyles } from '@material-ui/core/styles'
import OpenNewIcon from '@material-ui/icons/OpenInNew'

const MapTooltip = dynamic(
  () => import('@datenguide/explorables').then(({ MapTooltip }) => MapTooltip),
  { ssr: false }
)

const useStyles = makeStyles((theme) => ({
  root: {
    width: 240,
    fontSize: 15,
  },

  title: {
    margin: 0,
  },

  hed: {
    marginTop: 0,
    marginBottom: 10,
  },

  image: {
    width: '260px',
    position: 'relative',
    left: '-10px',
  },

  facts: {
    listStyle: 'none',
    margin: 0,
    padding: 0,

    '& li::before': {
      content: "'→'",
      paddingRight: '0.3em',
    },
  },

  highlight: {
    fontSize: '2.4em',
    fontWeight: 'normal',
    display: 'inline-block',
    letterSpacing: '-10',
  },

  highlightUnit: {
    display: 'inline-block',
    lineHeight: 1,
    paddingLeft: 5,

    '& b': {
      display: 'block',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    marginTop: 8,
  },

  icon: {
    width: 15,
    height: 15,
    verticalAlign: 'bottom',
    marginRight: 3,
  },
}))

export default function RegionTooltip({ title, lonLat }) {
  const classes = useStyles()

  return (
    <MapTooltip lonLat={lonLat} offsetTop={-15}>
      <div className={classes.root}>
        <h3 className={classes.title}>{title}</h3>
        <p className={classes.hed}>Gemeinde in Nordrhein-Westfalen</p>
        <img className={classes.image} src="/augustdorf.jpg" width="100%" />
        <b className={classes.highlight}>10.032</b>
        <div className={classes.highlightUnit}>
          <b>Einwohner</b>
          (2019)
        </div>
        <ul className={classes.facts}>
          <li>238 Einwohner je km²</li>
          <li>Altersschnitt: 38,7 Jahre</li>
        </ul>
        <a
          className={classes.link}
          href="/statistiken?region=all&parent=05766&level=4&data=12411%3ABEV519&labels=id&time=&layout=long"
        >
          <OpenNewIcon className={classes.icon} />
          Alle Daten zum Kreis Lippe
        </a>
      </div>
    </MapTooltip>
  )
}
