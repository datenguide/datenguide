import React from 'react'
import fetch from 'isomorphic-unfetch'
import Link from 'next/link'
import DefaultLayout from '../layouts/Default'

const RegionLink = ({ name, slug }) => (
  <li>
    <Link href="/region/[slug]" as={`/region/${slug}`}>
      <a>{name}</a>
    </Link>
  </li>
)

const Home = ({ regions }) => {
  return (
    <DefaultLayout>
      <h2>Regions</h2>
      {regions.map(({ name, id, slug, districts }) => (
        <ul key={id}>
          <RegionLink name={name} slug={slug} />
          {districts.map(({ name, id, slug }) => (
            <ul key={id}>
              <RegionLink name={name} slug={slug} />
            </ul>
          ))}
        </ul>
      ))}
    </DefaultLayout>
  )
}

Home.getInitialProps = async function(context) {
  const fetchStates = await fetch(`http://localhost:3000/api/region?nuts=1`)
  const fetchDistricts = await fetch(`http://localhost:3000/api/region?nuts=3`)
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
