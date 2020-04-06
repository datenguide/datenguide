import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import { VictoryBar, VictoryChart, VictoryLabel, VictoryAxis } from 'victory'
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from 'react-simple-maps'

const geoUrl = '/geo/landkreise/baden-wuerttemberg.json'

const cities = [
  {
    markerOffset: -15,
    name: 'Stuttgart',
    population: 634000,
    coordinates: [9.1800132, 48.7784485],
  },
  {
    markerOffset: -15,
    name: 'Karlsruhe',
    population: 313000,
    coordinates: [8.4034195, 49.0068705],
  },
  {
    markerOffset: -15,
    name: 'Mannheim',
    population: 309000,
    coordinates: [8.467236, 49.489591],
  },
  {
    markerOffset: -15,
    name: 'Freiburg',
    population: 230000,
    coordinates: [7.8494005, 47.9960901],
  },
  {
    markerOffset: -15,
    name: 'Heidelberg',
    population: 160000,
    coordinates: [8.694724, 49.4093582],
  },
  {
    markerOffset: -15,
    name: 'Ulm',
    population: 126000,
    coordinates: [9.9934336, 48.3974003],
  },
  {
    markerOffset: -15,
    name: 'Heilbronn',
    population: 126000,
    coordinates: [9.218655, 49.142291],
  },
  {
    markerOffset: -15,
    name: 'Pforzheim',
    population: 125000,
    coordinates: [8.7029532, 48.8908846],
  },
  {
    markerOffset: -15,
    name: 'Reutlingen',
    population: 116000,
    coordinates: [9.3461511, 48.4493107],
  },
]

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2, 3),
    margin: theme.spacing(2, 3),
    background: theme.palette.grey[100],

    '& h3': {
      margin: 0,
    },
  },

  chart: {
    padding: theme.spacing(2, 3),
  },
}))

const MapChart = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <h3>Die größten Städte in Baden-Württemberg</h3>
      <Grid container>
        <Grid item xs={6}>
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{
              scale: 4500,
              center: [9.1949534, 48.6296972],
            }}
            width={300}
            height={320}
          >
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="#fff"
                    stroke="#d0d0d0"
                    width={300}
                    height={320}
                  />
                ))
              }
            </Geographies>
            {cities.map(
              ({ name, coordinates, markerOffset, population }, index) => (
                <Marker key={name} coordinates={coordinates}>
                  <circle
                    r={(35 * Math.sqrt((1 / 700000) * population)) / Math.PI}
                    fill="#01627c"
                    stroke="#fff"
                    strokeWidth={2}
                  />
                  <text
                    textAnchor="middle"
                    y={markerOffset}
                    style={{
                      fontWeight: 'bold',
                      fontSize: 12,
                      fill: '#5D5A6D',
                    }}
                  >
                    {index < 3 && name}
                  </text>
                </Marker>
              )
            )}
          </ComposableMap>
        </Grid>
        <Grid item xs={6}>
          <VictoryChart
            // theme={VictoryTheme.material}
            padding={{ top: 20, right: 10, bottom: 30, left: 80 }}
            domainPadding={15}
            className={classes.chart}
            width={300}
            height={300}
          >
            <VictoryBar
              horizontal
              style={{
                data: { fill: '#01627c', paddingBottom: 10 },
                labels: { fill: 'white' },
              }}
              data={cities.sort((a, b) => a.population - b.population)}
              x="name"
              y="population"
              barWidth={20}
              labels={({ datum }) => datum.population}
              labelComponent={
                <VictoryLabel
                  style={{ fontSize: 10, padding: 0, fill: '#fff' }}
                  textAnchor="end"
                  dx={-5}
                />
              }
            />
            <VictoryAxis />
          </VictoryChart>
        </Grid>
      </Grid>
      <small>Daten aus der Bevölkerungsfortschreibung. Stand: 2018</small>
    </div>
  )
}

export default MapChart
