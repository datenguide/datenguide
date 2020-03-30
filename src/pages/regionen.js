import fetch from 'isomorphic-unfetch'
import Link from 'next/link'
import absoluteUrl from 'next-absolute-url'
import { Container } from '@material-ui/core'

import DefaultLayout from '../layouts/DefaultLayout'
import RegionList from '../components/RegionList'

const Home = ({ regions }) => {
  return (
    <DefaultLayout>
      <Container>
        <h2>Alle Regionen</h2>
        {regions.map(({ name, id, slug, districts }) => (
          <section key={id}>
            <h2>
              <Link href={`/region/${slug}`}>
                <a>{name}</a>
              </Link>
            </h2>
            <RegionList regions={districts} />
          </section>
        ))}
      </Container>
    </DefaultLayout>
  )
}

Home.getInitialProps = async function({ req }) {
  const { origin } = absoluteUrl(req)
  const fetchStates = await fetch(`${origin}/api/region?level=1`)
  const fetchDistricts = await fetch(`${origin}/api/region?level=3`)
  const states = await fetchStates.json()
  const districts = await fetchDistricts.json()

  const regions = states
    .sort((a, b) => (a.name > b.name ? 1 : -1))
    .map(state => ({
      ...state,
      districts: districts
        .filter(({ id }) => id.startsWith(state.id))
        .sort((a, b) => (a.name > b.name ? 1 : -1))
    }))

  return { regions }
}

export default Home
