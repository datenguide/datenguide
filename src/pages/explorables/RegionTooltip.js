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
}))

export default function RegionTooltip({ title, lonLat }) {
  const classes = useStyles()

  return (
    <MapTooltip lonLat={lonLat} offsetTop={-15}>
      <div className={classes.root}>
        <h3>{title}</h3>
      </div>
    </MapTooltip>
  )
}
