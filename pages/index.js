import React from 'react'
import fetch from 'isomorphic-unfetch'
import Link from 'next/link'

const RegionLink = ({ name, slug }) => (
  <li>
    <Link href='/region/[slug]' as={`/region/${slug}`}>
      <a>{name}</a>
    </Link>
  </li>
)

const Home = ({ regions }) => {
  return (
    <div>
      <h1>Regions</h1>
      {regions.map(({ name, id, slug }) => (
        <ul key={id}>
          <RegionLink name={name} slug={slug} />
        </ul>
      ))}
    </div>
  )
}

Home.getInitialProps = async function(context) {
  const res = await fetch(`http://localhost:3000/api/region?nuts=3`)
  const regions = await res.json()

  return { regions }
}

export default Home
