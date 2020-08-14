import dynamic from 'next/dynamic'

const RegionKeysNoSSR = dynamic(() => import('./RegionKeys').default, {
  ssr: false,
})

export default (props) => <RegionKeysNoSSR {...props} />
