import React, { useEffect } from 'react'

import Prism from '../../lib/vendor/prism.js'
import '../../lib/vendor/prism.css'
import '../../lib/vendor/prism-material-dark.css'

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
