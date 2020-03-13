import DefaultLayout from '../../layouts/DefaultLayout'

const Blog = ({ meta }) => (
  <DefaultLayout meta={meta}>Hello World</DefaultLayout>
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
