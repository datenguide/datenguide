import React, { useEffect } from 'react'
// import Prism from 'prismjs'

import Prism from './prism.js'
import './prism.css'
import './prism-material-dark.css'

const Code = ({ children, language }) => {
  useEffect(() => {
    Prism.highlightAll()
  }, [])

  return (
    <pre>
      <code className={`language-${language}`}>{children}</code>
    </pre>
  )
}

export default Code
