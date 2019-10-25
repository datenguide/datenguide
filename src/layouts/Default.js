import React from 'react'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import BaseLayout from '../layouts/Base'

export default function DefaultLayout(props) {
  return (
    <BaseLayout>
      <Container>
        <Box my={4}>{props.children}</Box>
      </Container>
    </BaseLayout>
  )
}
