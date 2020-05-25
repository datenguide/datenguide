import React, { PureComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Scrollama, Step } from 'react-scrollama'
import dynamic from 'next/dynamic'
import { WebMercatorViewport } from 'react-map-gl'
import RegionTooltip from './RegionTooltip'

const Map = dynamic(
  () => import('@datenguide/explorables').then(({ Map }) => Map),
  { ssr: false }
)

const ShapeLayer = dynamic(
  () => import('@datenguide/explorables').then(({ ShapeLayer }) => ShapeLayer),
  { ssr: false }
)

const bounds = [
  [5.8663, 50.3226],
  [9.4617, 52.5315],
]

const layerOptions = {
  municipalities: {
    filter: ['!=', 'GEN', 'Altena'],
    paint: {
      'fill-color': '#004443',
      'fill-opacity': 0.1,
      'fill-outline-color': '#004443',
    },
  },
  municipalitiesHighlight: {
    filter: ['==', 'GEN', 'Altena'],
    paint: {
      'fill-color': '#004443',
      'fill-opacity': 0.8,
      'fill-outline-color': '#ffffff',
    },
  },
}

const styles = {
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
    width: '40%',
  },
  step: {
    opacity: 0.4,
    transition: 'opacity 300ms',
    minHeight: '66vh',
    padding: 20,
  },
  stepInner: {
    background: 'white',
    padding: '1rem',
  },
}

function computeViewport(bounds) {
  if (!process.browser) return {} // In SSR, it is not possible to compute the viewport
  const { clientWidth, clientHeight } = document.documentElement
  const offset = clientWidth / 3
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

class ScrollyMapComponent extends PureComponent {
  state = {
    viewport: computeViewport(bounds),
    settings: {
      dragPan: false,
      dragRotate: false,
      scrollZoom: false,
      touchZoom: false,
      touchRotate: false,
      keyboard: false,
      doubleClickZoom: false,
      mapStyle: 'mapbox://styles/datenguide/cka2hksel3jxf1iobq6rxka0l',
      mapboxApiAccessToken: process.env.MAPBOX_TOKEN,
    },
  }

  handleStepEnter = ({ element, data }) => {
    element.style.opacity = 0.9
    this.setState({ currentStep: data })
  }

  handleStepExit = ({ element }) => {
    element.style.opacity = 0.4
    // console.log('exit', element)
  }

  handleStepProgress = ({ element, progress }) => {
    // console.log('progress', element, progress)
  }

  render() {
    const { currentStep, viewport, settings } = this.state
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

            <ShapeLayer
              src="/geo/nrw_gemeinden.json"
              options={layerOptions.municipalitiesHighlight}
              hidden={currentStep && currentStep !== 'lau'}
            />

            {currentStep === 'lau' && (
              <RegionTooltip lonLat={[7.672, 51.281]} title="Altena" />
            )}

            <ShapeLayer
              src="/geo/nrw_gemeinden.json"
              options={layerOptions.municipalities}
              hidden={currentStep && currentStep !== 'lau'}
            />
            <ShapeLayer
              src="/geo/nrw_landkreise.json"
              hidden={currentStep !== 'nuts3'}
            />
            <ShapeLayer
              src="/geo/nrw_regierungsbezirke.json"
              hidden={currentStep !== 'nuts2'}
            />
            <ShapeLayer
              src="/geo/bundeslaender.json"
              hidden={currentStep !== 'nuts1'}
            />
          </Map>
        </div>
        <div className={classes.scroller}>
          {process.browser && (
            <Scrollama
              onStepEnter={this.handleStepEnter}
              onStepExit={this.handleStepExit}
              progress
              onStepProgress={this.handleStepProgress}
              offset={0.5}
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

export const ScrollyMapStep = withStyles(styles)(({ classes, children }) => (
  <div className={classes.stepInner}>{children}</div>
))

export const ScrollyMap = withStyles(styles)(ScrollyMapComponent)
