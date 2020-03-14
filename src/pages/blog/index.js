import DefaultLayout from '../../layouts/DefaultLayout'
import SecondaryStage from '../../components/SecondaryStage'

const Blog = ({ meta }) => (
  <DefaultLayout meta={meta}>
    <SecondaryStage />
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
