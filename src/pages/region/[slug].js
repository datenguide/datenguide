import fetch from 'isomorphic-unfetch'
import absoluteUrl from 'next-absolute-url'

import DefaultLayout from '../../layouts/DefaultLayout'
import StatisticsList from '../../components/StatisticsList'
import { Container } from '@material-ui/core'

const RegionDetails = ({ region, statistics }) => {
  return (
    <DefaultLayout meta={{ title: region.name }}>
      <Container>
        <h1>{region.name}</h1>

        <h3>Alle Statistiken für {region.name}</h3>

        <StatisticsList regions={[region]} statistics={statistics} />
      </Container>
    </DefaultLayout>
  )
}

const Region = ({ region, statistics }) => {
  if (!region.id) return <div>Region not found: {region.slug}</div>
  return <RegionDetails region={region} statistics={statistics} />
}

Region.getInitialProps = async function ({ req, query }) {
  const { slug } = query
  const { origin } = absoluteUrl(req)
  const fetchRegion = await fetch(`${origin}/api/region/${slug}`)
  const fetchStatistics = await fetch(`${origin}/api/statistics`)
  const region = !fetchRegion.ok ? { slug } : await fetchRegion.json()
  const statistics = await fetchStatistics.json()
  return { region, statistics }
}

export default Region
