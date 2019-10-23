import React from 'react'

import Header from '../components/Header'
import Footer from '../components/Footer'

export default function DefaultLayout(props) {
  return (
    <>
      <Header />
      {props.children}
      <Footer />
    </>
  )
}
