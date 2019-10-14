import React, { useState } from 'react'
import CheckboxTree from 'react-checkbox-tree'

import 'react-checkbox-tree/lib/react-checkbox-tree.css'
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined'
import IndeterminateCheckBoxOutlinedIcon from '@material-ui/icons/IndeterminateCheckBoxOutlined'
import CheckBoxOutlineBlankOutlinedIcon from '@material-ui/icons/CheckBoxOutlineBlankOutlined'
import KeyboardArrowRightOutlinedIcon from '@material-ui/icons/KeyboardArrowRightOutlined'
import KeyboardArrowDownOutlinedIcon from '@material-ui/icons/KeyboardArrowDownOutlined'

import names from '../data/ags.json'
import { makeStyles } from '@material-ui/styles'

// TODO move to server
const getNuts = (nuts, prefix = null) => {
  if (nuts < 1 || nuts > 3) {
    return []
  }
  let result = Object.keys(names).filter(
    key => key.length === [null, 2, 3, 5][nuts] && key !== 'DG'
  )

  if (prefix) {
    result = result.filter(id => id.startsWith(prefix))
  }

  return result.map(id => ({ value: id, label: `${id} ${names[id]}` }))
}

const nodes = getNuts(1).map(nuts1Region => {
  const nuts2Regions = getNuts(2, nuts1Region.value)

  if (nuts2Regions.length > 0) {
    return {
      ...nuts1Region,
      children: nuts2Regions.map(nuts2Region => ({
        ...nuts2Region,
        children: getNuts(3, nuts2Region.value)
      }))
    }
  }
  // skip nuts 2
  return {
    ...nuts1Region,
    children: getNuts(3, nuts1Region.value).map(nuts3Region => ({
      ...nuts3Region
    }))
  }
})

const useStyles = makeStyles({
  '@global': {
    '.rct-collapse': {
      width: '30px'
    },
    '.MuiSvgIcon-root': {
      height: '20px',
      margin: 0
    },
  }
})

const RegionSelectTree = () => {
  const [checked, setChecked] = useState([])
  const [expanded, setExpanded] = useState([])
  useStyles()

  return (
    <CheckboxTree
      nodes={nodes}
      checked={checked}
      expanded={expanded}
      onCheck={setChecked}
      onExpand={setExpanded}
      showNodeIcon={false}
      noCascade
      icons={{
        check: <CheckBoxOutlinedIcon />,
        uncheck: <CheckBoxOutlineBlankOutlinedIcon />,
        halfCheck: <IndeterminateCheckBoxOutlinedIcon />,
        expandClose: <KeyboardArrowRightOutlinedIcon />,
        expandOpen: <KeyboardArrowDownOutlinedIcon />
        // expandAll: <EuiIcon type="editorAlignLeft" />,
        // collapseAll: <EuiIcon type="editorAlignLeft" />,
        // parentClose: <EuiIcon type="folderClosed" />,
        // parentOpen: <EuiIcon type="folderOpen" />,
        // leaf: <EuiIcon type="dot" />
      }}
    />
  )
}

export default RegionSelectTree
