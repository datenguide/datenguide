import dynamic from 'next/dynamic'

const Map = dynamic(
  () => import('@datenguide/explorables').then((module) => module.Map),
  { ssr: false }
)

export default (props) => {
  return <Map {...props} mapboxApiAccessToken={process.env.MAPBOX_TOKEN} />
}
