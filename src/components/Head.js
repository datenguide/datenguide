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
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/icons/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/icons/favicon-16x16.png"
      />
      <link rel="shortcut icon" href="/icons/favicon.ico" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/icons/apple-touch-icon.png"
      />
    </Head>
  )
}
export default Meta
