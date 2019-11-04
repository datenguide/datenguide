import React from 'react'
import Head from 'next/head'

const Meta = ({ title, description, previewImage }) => (
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
    <meta property="og:image" content={previewImage} />
    <meta name="twitter:image" content={previewImage} />
  </Head>
)
export default Meta
