import Container from '@material-ui/core/Container'

import DefaultLayout from '../../layouts/DefaultLayout'
import SecondaryStage from '../../components/SecondaryStage'
import BlogPostListItem from '../../components/BlogPostListItem'

const Blog = ({ meta }) => {
  return (
    <DefaultLayout meta={meta}>
      <SecondaryStage claim="Der Datenguide hilft dir dabei, dich im Dschungel der Statistiken zurecht zu finden." />
      <Container>
        <h1>Aktuelles</h1>
        <BlogPostListItem href="" title="foo" description="bar" />
        <BlogPostListItem href="" title="foo" description="bar" />
        <BlogPostListItem href="" title="foo" description="bar" />
        <BlogPostListItem href="" title="foo" description="bar" />
        <BlogPostListItem href="" title="foo" description="bar" />
        <BlogPostListItem href="" title="foo" description="bar" />
        <BlogPostListItem href="" title="foo" description="bar" />
      </Container>
    </DefaultLayout>
  )
}

export const getStaticProps = () => {
  return {
    props: {
      meta: {
        title: 'Blog'
      }
    }
  }
}

export default Blog
