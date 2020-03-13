import DefaultLayout from '../../layouts/DefaultLayout'
import Stage from '../../components/Stage'

const Blog = ({ meta }) => (
  <DefaultLayout meta={meta}>
    <Stage />
  </DefaultLayout>
)

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
