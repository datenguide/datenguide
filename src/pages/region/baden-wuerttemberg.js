import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Container, Grid } from '@material-ui/core'
import { useQuery } from 'graphql-hooks'
import DefaultLayout from '../../layouts/DefaultLayout'
import FigureHighlight from '../../components/regions/FigureHighlight'
import MapCities from '../../components/regions/MapCities'

export const query = `
  query region($id: String!) {
    region(id: $id) {
      id
      name
      WAHL09(year: 2017, PART04: [CDU, SPD, AFD, FDP, DIELINKE, B90_GRUENE]) {
        year
        value
        PART04
      }
    }
  }
`
const id = '08'
const name = 'Baden-Württemberg'

const useStyles = makeStyles(theme => ({
  root: {}
}))

const RegionBadenWuerttemberg = () => {
  const classes = useStyles()
  const { loading, error, data } = useQuery(query, {
    variables: { id }
  })

  if (error) return <div>Error loading posts.</div>
  if (loading) return <div>Loading</div>

  const { WAHL09 } = data.region

  return (
    <DefaultLayout meta={{ title: name }}>
      <Container>
        <Grid container>
          <Grid item xs={4}>
            <h1>{name}</h1>
            <p>
              Baden-Württemberg ist nach Bayern und Nordrhein-Westfalen das
              drittgrößte Bundesland Deutschlands, sowohl bei der Fläche als
              auch bei der Einwohnerzahl. Die größte Stadt in Baden-Württemberg
              ist die Landeshauptstadt Stuttgart, gefolgt von Karlsruhe und
              Heidelberg.
            </p>

            <FigureHighlight />
          </Grid>
          <Grid item xs={8}>
            <div className={classes.primaryVis}>
              <MapCities />
            </div>
          </Grid>
        </Grid>

        <h2>Wahlergebnisse</h2>

        <table>
          <tbody>
            {WAHL09.map(({ PART04: name, value }) => (
              <tr key={name}>
                <th>{name}</th>
                <td>{value} votes</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Container>
    </DefaultLayout>
  )
}

export default RegionBadenWuerttemberg
