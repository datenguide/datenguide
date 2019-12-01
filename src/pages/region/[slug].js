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

const RegionDetails = ({ slug, id, name }) => {
  const { loading, error, data } = useQuery(allPostsQuery, {
    variables: { id }
  })

  if (error) return <div>Error loading statistics.</div>
  if (loading) return <div>Loading</div>

  const { WAHL09 } = data.region

  return (
    <DefaultLayout meta={{ title: name }}>
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

const Region = ({ slug, id, name }) => {
  if (!id) return <div>Region not found: {slug}</div>
  return <RegionDetails slug={slug} id={id} name={name} />
}

Region.getInitialProps = async function(context) {
  const { slug } = context.query
  const res = await fetch(`http://localhost:3000/api/region/${slug}`)
  const data = !res.ok ? { slug } : await res.json()
  return { ...data, res }
}

export default Region
