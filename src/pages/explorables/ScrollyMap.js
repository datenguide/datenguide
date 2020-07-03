import React, { PureComponent } from 'react'
import { withStyles, withTheme } from '@material-ui/core/styles'
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
    marginBottom: '66vh',
  },
  stepInner: {
    background: 'white',
    padding: '1rem',
  },
})

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

class ScrollyMapComponent extends PureComponent {
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
      mapboxApiAccessToken: process.env.MAPBOX_TOKEN,
    },
  }

  handleStepEnter = ({ element, data }) => {
    element.style.opacity = 0.9
    this.setState({ currentStep: data })
  }

  handleStepExit = ({ element }) => {
    element.style.opacity = 0.4
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

            <ShapeLayer
              src="/geo/nrw_gemeinden.json"
              options={layerOptions.municipalities}
              hidden={currentStep !== 'lau' && currentStep !== 'lau-local'}
            />

            {currentStep === 'lau-local' && (
              <RegionTooltip lonLat={[7.672, 51.281]} title="Altena" />
            )}

            <ShapeLayer
              src="/geo/nrw_gemeinden.json"
              options={layerOptions.municipalitiesHighlight}
              hidden={currentStep !== 'lau-local'}
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

export const ScrollyMapStep = withStyles(styles)(({ classes, children }) => (
  <div className={classes.stepInner}>{children}</div>
))

export const ScrollyMap = withTheme(withStyles(styles)(ScrollyMapComponent))
