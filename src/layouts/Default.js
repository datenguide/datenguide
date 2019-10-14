import React from 'react'

import Header from '../components/Header'

export default function DefaultLayout(props) {
  return (
    <>
      <Header />
      {props.children}
    </>
  )
}
