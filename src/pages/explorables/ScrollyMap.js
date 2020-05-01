import dynamic from 'next/dynamic'
import React, { PureComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Scrollama, Step } from 'react-scrollama'
// import SimpleMap from './SimpleMap'

const StaticMap = dynamic(
  () => import('@datenguide/explorables').then(({ StaticMap }) => StaticMap),
  { ssr: false }
)

const ShapeLayer = dynamic(
  () => import('@datenguide/explorables').then(({ ShapeLayer }) => ShapeLayer),
  { ssr: false }
)

const styles = {
  main: {
    padding: '2em 0',
    display: 'flex',
    fontFamily: 'Helvetica',
    justifyContent: 'space-between',
  },
  map: {
    position: 'sticky',
    width: '100%',
    padding: '0',
    top: '2em',
    alignSelf: 'flex-start',
    backgroundColor: '#aaa',
  },
  scroller: {
    flexBasis: '35%',
  },
  step: {
    margin: '0 auto 2rem auto',
    paddingTop: 200,
    paddingBottom: 200,
    border: '1px solid #333',
    '& p': {
      textAlign: 'center',
      padding: '1rem',
      fontSize: '1.5rem',
    },
    '&:last-child': {
      marginBottom: 0,
    },
  },
}

class Graphic extends PureComponent {
  state = {
    data: 0,
    steps: [10, 20, 30],
    progress: 0,
  }

  handleStepEnter = ({ element, data }) => {
    element.style.backgroundColor = 'lightgoldenrodyellow'
    this.setState({ data })
  }

  handleStepExit = ({ element }) => {
    element.style.backgroundColor = '#fff'
  }

  handleStepProgress = ({ element, progress }) => {
    this.setState({ progress })
  }

  render() {
    const { data, steps, progress } = this.state
    const { classes } = this.props

    return (
      <div className={classes.main}>
        <div className={classes.scroller}>
          {process.browser && (
            <Scrollama
              onStepEnter={this.handleStepEnter}
              onStepExit={this.handleStepExit}
              progress
              onStepProgress={this.handleStepProgress}
              offset={0.33}
              debug
            >
              {steps.map((value) => (
                <Step data={value} key={value}>
                  <div className={classes.step}>
                    <p>step value: {value}</p>
                    {value === data && <p>{Math.round(progress * 100)}%</p>}
                  </div>
                </Step>
              ))}
            </Scrollama>
          )}
        </div>
        <div className={classes.map}>
          <StaticMap
            latitude={51.427}
            longitude={7.664}
            width="100%"
            height="100vh"
            mapboxApiAccessToken={process.env.MAPBOX_TOKEN}
          >
            <ShapeLayer src="/geo/nrw_gemeinden.json" />
          </StaticMap>
          <p>{data}</p>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(Graphic)
