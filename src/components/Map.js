import React, { useState } from 'react'
import dynamic from 'next/dynamic'
// import { ShapeLayer } from '@datenguide/explorables'

const StaticMap = dynamic(
  () => import('react-map-gl').then(({ StaticMap }) => StaticMap),
  { ssr: false }
)

const ShapeLayer = dynamic(
  () => import('@datenguide/explorables').then(({ ShapeLayer }) => ShapeLayer),
  { ssr: false }
)

function Map({ path, ...options }) {
  const [viewport, setViewport] = useState({
    width: '100%',
    height: 400,
    latitude: 52.52,
    longitude: 13.05,
    zoom: 6,
    options: false,
    mapboxApiAccessToken: process.env.MAPBOX_TOKEN,
    ...options,
  })

  return process.browser ? (
    <StaticMap {...viewport} onViewportChange={setViewport}>
      <ShapeLayer path={path} />
    </StaticMap>
  ) : null
}

export default Map
