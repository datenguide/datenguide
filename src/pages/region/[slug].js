import React from 'react'
import fetch from 'isomorphic-unfetch'
import { useQuery } from 'graphql-hooks'
import DefaultLayout from '../../layouts/Default'

export const allPostsQuery = `
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

const Region = ({ slug, id, name }) => {
  const { loading, error, data } = useQuery(allPostsQuery, {
    variables: { id }
  })

  if (error) return <div>Error loading posts.</div>
  if (loading) return <div>Loading</div>

  const { WAHL09 } = data.region

  return (
    <DefaultLayout>
      <h1>
        {name} / {id} / {slug}
      </h1>

      <h3>Election results (2017)</h3>

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
    </DefaultLayout>
  )
}

Region.getInitialProps = async function (context) {
  const { slug } = context.query
  const res = await fetch(`http://localhost:3000/api/region/${slug}`)
  const data = await res.json()

  return data
}

export default Region
