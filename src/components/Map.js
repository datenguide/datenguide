import React, { useState } from 'react'
import { StaticMap } from 'react-map-gl'

function Map(options) {
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

  return <StaticMap {...viewport} onViewportChange={setViewport} />
}

export default Map
