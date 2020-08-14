import React, { PureComponent } from 'react'
import Fade from '@material-ui/core/Fade'
import { withStyles, withTheme } from '@material-ui/core/styles'
import { Scrollama, Step } from 'react-scrollama'
import dynamic from 'next/dynamic'
import { WebMercatorViewport } from 'react-map-gl'
import RegionTooltip from './RegionTooltip'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

const Map = dynamic(
  () => import('@datenguide/explorables').then(({ Map }) => Map),
  { ssr: false }
)

const ShapeLayer = dynamic(
  () => import('@datenguide/explorables').then(({ ShapeLayer }) => ShapeLayer),
  { ssr: false }
)

const TextMarker = dynamic(
  () => import('@datenguide/explorables').then(({ TextMarker }) => TextMarker),
  { ssr: false }
)

const bounds = [
  [5.8663, 50.3226],
  [9.4617, 52.5315],
]

const choroplethColors = ['#B0D3E1', '#024258']

const layerOptions = {
  choropleth: [
    {
      type: 'fill',
      paint: {
        'fill-color': [
          'interpolate',
          ['linear'],
          ['get', 'alter'],
          43,
          choroplethColors[0],
          45,
          choroplethColors[1],
        ],
        'fill-opacity': 0.6,
      },
    },
    {
      type: 'line',
      paint: {
        'line-color': '#004443',
        'line-opacity': 0.4,
        'line-width': 2,
      },
    },
  ],
  choroplethMunicipalities: [
    {
      type: 'fill',
      paint: {
        'fill-color': [
          'interpolate',
          ['linear'],
          ['get', 'alter'],
          42,
          choroplethColors[0],
          48,
          choroplethColors[1],
        ],
        'fill-opacity': 0.6,
      },
    },
    {
      type: 'line',
      paint: {
        'line-color': '#004443',
        'line-opacity': 0.4,
        'line-width': 1,
      },
    },
  ],
  municipalities: [
    {
      paint: {
        'fill-color': '#004443',
        'fill-opacity': 0.1,
        'fill-outline-color': '#004443',
      },
    },
    {
      type: 'line',
      paint: {
        'line-color': '#004443',
        'line-opacity': 1,
        'line-width': 1,
      },
    },
    {
      filter: ['==', 'GEN', 'Köln'],
      paint: {
        'fill-color': '#004443',
        'fill-opacity': 0.8,
      },
    },
    {
      filter: ['==', 'GEN', 'Dahlem'],
      paint: {
        'fill-color': '#004443',
        'fill-opacity': 0.8,
      },
    },
  ],
  municipalitiesHighlight: {
    filter: ['==', 'GEN', 'Altena'],
    paint: {
      'fill-color': '#004443',
      'fill-opacity': 0.8,
    },
  },
}

const styles = (theme) => ({
  main: {
    padding: '2em 0',
    position: 'relative',
  },
  map: {
    position: 'sticky',
    width: '100%',
    height: '100vh',
    padding: '0',
    top: '3em',
    left: 0,
    alignSelf: 'flex-start',
    backgroundColor: '#aaa',
  },
  scroller: {
    position: 'relative',
    top: '-100vh',
    marginBottom: '-100vh',

    [theme.breakpoints.up('md')]: {
      width: '50%',
    },

    [theme.breakpoints.up('lg')]: {
      width: '40%',
    },
  },
  step: {
    opacity: 0.4,
    transition: 'opacity 300ms',
    padding: 20,
    marginBottom: '60vh',
  },
  mapText: {
    marginTop: -40,
    color: 'white',
    lineHeight: 1.2,
    textShadow: '1px 1px 15px #4D7D7E',

    [theme.breakpoints.down('xs')]: {
      fontSize: 12,
    },
  },

  mapTextValue: {
    fontSize: '2.6em',
    fontWeight: 'regular',
    display: 'block',
    lineHeight: 1,
  },

  mapTextName: {
    whiteSpace: 'pre-line',
  },
})

const districts = [
  { name: 'Regierungsbezirk\nDüsseldorf', lonLat: [6.6, 51.5], value: '44,5' },
  { name: 'Regierungsbezirk\nKöln', lonLat: [6.65, 50.67], value: '43,5' },
  { name: 'Regierungsbezirk\nMünster', lonLat: [7.45, 52.04], value: '43,9' },
  { name: 'Regierungsbezirk\nDetmold', lonLat: [8.77, 51.92], value: '43,8' },
  { name: 'Regierungsbezirk\nArnsberg', lonLat: [8.02, 51.31], value: '44,6' },
]

function getOffset(width, { values }) {
  if (width > values.md) return width / 2
  if (width > values.lg) return width / 3
  return 0
}

function computeViewport(bounds, breakpoints) {
  if (!process.browser) return {} // In SSR, it is not possible to compute the viewport
  const { clientWidth, clientHeight } = document.documentElement
  const offset = getOffset(clientWidth, breakpoints)
  return new WebMercatorViewport({
    width: clientWidth,
    height: clientHeight,
  }).fitBounds(bounds, {
    padding: {
      top: 20,
      left: offset,
      right: -offset,
      bottom: 20,
    },
  })
}

class ScrollyMap extends PureComponent {
  state = {
    viewport: computeViewport(bounds, this.props.theme.breakpoints),
    settings: {
      dragPan: false,
      dragRotate: false,
      scrollZoom: false,
      touchZoom: false,
      touchRotate: false,
      keyboard: false,
      doubleClickZoom: false,
      mapStyle: 'mapbox://styles/datenguide/cka2hksel3jxf1iobq6rxka0l',
      mapboxApiAccessToken: publicRuntimeConfig.mapboxToken,
    },
  }

  handleStepEnter = ({ element, data }) => {
    element.style.opacity = 0.9
    this.setState({ currentStep: data })
  }

  updateDimensions = () => {
    const { breakpoints } = this.props.theme
    this.setState({ viewport: computeViewport(bounds, breakpoints) })
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions)
  }

  render() {
    const { currentStep = '', viewport, settings } = this.state
    const { children, classes } = this.props

    return (
      <div className={classes.main}>
        <div className={classes.map}>
          <Map
            viewport={viewport}
            settings={settings}
            onViewportChange={(viewport) => this.setState({ viewport })}
          >
            <h1 style={{ textAlign: 'right' }}>{currentStep}</h1>

            {currentStep === 'nuts1' && (
              <Fade>
                <TextMarker className={classes.mapText} lonLat={[7.65, 51.61]}>
                  <b>Nordrhein-Westfalen</b>
                  <span className={classes.mapTextValue}>44,1 Jahre</span>
                  Durchschnittsalter (2018)
                </TextMarker>
              </Fade>
            )}

            {currentStep === 'nuts2' &&
              districts.map(({ name, lonLat, value }, i) => (
                <Fade key={i}>
                  <TextMarker className={classes.mapText} lonLat={lonLat}>
                    <span className={classes.mapTextValue}>{value}</span>
                    <b className={classes.mapTextName}>{name}</b>
                  </TextMarker>
                </Fade>
              ))}

            <ShapeLayer
              src="/geo/bundeslaender.json"
              options={layerOptions.choropleth}
              hidden={currentStep !== 'nuts1'}
            />

            <ShapeLayer
              src="/geo/nrw_regierungsbezirke.json"
              options={layerOptions.choropleth}
              hidden={currentStep !== 'nuts2'}
            />

            <ShapeLayer
              src="/geo/nrw_landkreise.json"
              options={layerOptions.choroplethMunicipalities}
              hidden={currentStep !== 'nuts3'}
            />

            <ShapeLayer
              src="/geo/nrw_gemeinden.json"
              options={layerOptions.choroplethMunicipalities}
              hidden={currentStep !== 'lau'}
            />

            {currentStep === 'lau-local' && (
              <RegionTooltip lonLat={[7.672, 51.281]} title="Altena" />
            )}

            <ShapeLayer
              src="/geo/nrw_gemeinden.json"
              options={layerOptions.municipalitiesHighlight}
              hidden={currentStep !== 'lau-local'}
            />
          </Map>
        </div>
        <div className={classes.scroller}>
          {process.browser && (
            <Scrollama
              onStepEnter={this.handleStepEnter}
              onStepExit={this.handleStepExit}
              offset={0.7}
            >
              {React.Children.map(children, (child, i) => (
                <Step data={child.props.id} key={i}>
                  <div className={classes.step}>{child}</div>
                </Step>
              ))}
            </Scrollama>
          )}
        </div>
      </div>
    )
  }
}

export default withTheme(withStyles(styles)(ScrollyMap))
