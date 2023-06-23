import Container from '@mui/material/Container'

import DefaultLayout from '../DefaultLayout'
import { BodyText } from '@/components/BodyText'

const ContentPage = (frontMatter) => ({ children }) => {
  return (
    <DefaultLayout meta={frontMatter}>
      <Container>
        <BodyText>{children}</BodyText>
      </Container>
    </DefaultLayout>
  )
}

export default ContentPage
