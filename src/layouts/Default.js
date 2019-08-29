import React from 'react'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'

import Header from '../components/Header'

export default function DefaultLayout(props) {
  return (
    <>
      <Header />
      <Container fixed>
        <Box my={4}>{props.children}</Box>
      </Container>
    </>
  )
}
