import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import Layout from '../../layouts/Region'

export default function Post() {
  const { query } = useRouter()

  const component = query.id && import(`../../regions/${query.id}.md`)
  const RegionContent = component && dynamic(() => component)
  component &&
    component.then(response => {
      console.log(response.frontmatter)
    })

  return <Layout>{RegionContent && <RegionContent />}</Layout>
}
