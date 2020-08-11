import dynamic from 'next/dynamic'

const SimpleMap = dynamic(
  () => import('@datenguide/explorables').then(({ SimpleMap }) => SimpleMap),
  { ssr: false }
)

export default (props) => (
  <SimpleMap {...props} mapboxApiAccessToken={process.env.MAPBOX_TOKEN} />
)
