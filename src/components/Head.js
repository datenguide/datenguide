import React from 'react'
import Head from 'next/head'

const BASE_URL = 'https://datengui.de'
const DEFAULT_IMAGE = 'social/default.png'

const Meta = ({ title, description, previewImage }) => {
  const imagePath = `${BASE_URL}/${previewImage || DEFAULT_IMAGE}`
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:type" content="website" />
      <meta name="og:title" property="og:title" content={title} />
      <meta
        name="og:description"
        property="og:description"
        content={description}
      />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta property="og:image" content={imagePath} />
      <meta name="twitter:image" content={imagePath} />
    </Head>
  )
}
export default Meta
