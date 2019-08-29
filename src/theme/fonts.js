import plexRegularWoff from 'typeface-ibm-plex-sans/files/ibm-plex-sans-latin-400.woff'
import plexRegularWoff2 from 'typeface-ibm-plex-sans/files/ibm-plex-sans-latin-400.woff2'
import plexRegularItalicWoff from 'typeface-ibm-plex-sans/files/ibm-plex-sans-latin-400italic.woff'
import plexRegularItalicWoff2 from 'typeface-ibm-plex-sans/files/ibm-plex-sans-latin-400italic.woff2'
import plexBoldWoff from 'typeface-ibm-plex-sans/files/ibm-plex-sans-latin-700.woff'
import plexBoldWoff2 from 'typeface-ibm-plex-sans/files/ibm-plex-sans-latin-700.woff2'
import plexBoldItalicWoff from 'typeface-ibm-plex-sans/files/ibm-plex-sans-latin-700italic.woff'
import plexBoldItalicWoff2 from 'typeface-ibm-plex-sans/files/ibm-plex-sans-latin-700italic.woff2'

const PLEX_NAME = 'ibm-plex-sans'

export const plex = {
  name: PLEX_NAME,
  fontFace: [
    {
      fontFamily: PLEX_NAME,
      fontStyle: 'normal',
      fontWeight: 400,
      fontDisplay: 'swap',
      src: `
      url(${plexRegularWoff2}) format('woff2'),
      url(${plexRegularWoff}) format('woff')
      `
    },
    {
      fontFamily: PLEX_NAME,
      fontStyle: 'italic',
      fontWeight: 400,
      fontDisplay: 'swap',
      src: `
      url(${plexRegularItalicWoff2}) format('woff2'),
      url(${plexRegularItalicWoff}) format('woff')
      `
    },
    {
      fontFamily: PLEX_NAME,
      fontStyle: 'normal',
      fontWeight: 700,
      fontDisplay: 'swap',
      src: `
      url(${plexBoldWoff2}) format('woff2'),
      url(${plexBoldWoff}) format('woff')
      `
    },
    {
      fontFamily: PLEX_NAME,
      fontStyle: 'italic',
      fontWeight: 700,
      fontDisplay: 'swap',
      src: `
      url(${plexBoldItalicWoff2}) format('woff2'),
      url(${plexBoldItalicWoff}) format('woff')
      `
    }
  ]
}
