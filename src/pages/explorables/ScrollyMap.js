import dynamic from 'next/dynamic'
import React, { PureComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Scrollama, Step } from 'react-scrollama'

const Map = dynamic(
  () => import('@datenguide/explorables').then(({ Map }) => Map),
  { ssr: false }
)

const ShapeLayer = dynamic(
  () => import('@datenguide/explorables').then(({ ShapeLayer }) => ShapeLayer),
  { ssr: false }
)

const styles = {
  main: {
    padding: '2em 0',
    position: 'relative',
  },
  map: {
    position: 'sticky',
    width: '100%',
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
    width: '33%',
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
    fontSize: '1.5rem',
  },
}

class Graphic extends PureComponent {
  state = {
    viewport: {
      latitude: 51.427,
      longitude: 7.664,
      width: '100%',
      height: '100vh',
      zoom: 6,
    },
    settings: {
      dragPan: false,
      dragRotate: false,
      scrollZoom: false,
      touchZoom: false,
      touchRotate: false,
      keyboard: false,
      doubleClickZoom: false,
      mapboxApiAccessToken: process.env.MAPBOX_TOKEN,
    },
    currentStep: 'lau',
    steps: [
      {
        id: 'lau',
        title: 'Gemeinden',
      },
      {
        id: 'nuts3',
        title: 'Landkreise',
      },
      {
        id: 'nuts2',
        title: 'Statistische Regionen',
      },
      {
        id: 'nuts1',
        title: 'Bundesländer',
      },
    ],
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
    const { currentStep, steps, viewport, settings } = this.state
    const { classes } = this.props
    // console.log('currentStep', currentStep)

    return (
      <div className={classes.main}>
        <div className={classes.map}>
          <Map
            viewport={viewport}
            settings={settings}
            onViewportChange={(viewport) => this.setState({ viewport })}
          >
            <h1>{currentStep}</h1>
            <ShapeLayer
              key="lau"
              src="/geo/nrw_gemeinden.json"
              hidden={currentStep !== 'lau'}
            />
            <ShapeLayer
              key="nuts1"
              src="/geo/nrw_landkreise.json"
              hidden={currentStep !== 'nuts3'}
            />
            <ShapeLayer
              key="nuts2"
              src="/geo/nrw_regierungsbezirke.json"
              hidden={currentStep !== 'nuts2'}
            />
            <ShapeLayer
              key="nuts3"
              src="/geo/bundesländer.json"
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
              debug
            >
              {steps.map(({ id, title }) => (
                <Step data={id} key={id}>
                  <div className={classes.step}>
                    <div className={classes.stepInner}>
                      <p>{title}</p>
                    </div>
                  </div>
                </Step>
              ))}
            </Scrollama>
          )}
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(Graphic)
