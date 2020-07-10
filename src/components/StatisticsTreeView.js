import { useState } from 'react'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles'
import TreeView from '@material-ui/lab/TreeView'
import TreeItem from '@material-ui/lab/TreeItem'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
    paddingTop: theme.spacing(2),
  },
  itemLabel: {
    display: 'flex',
    flexDirection: 'column',
    // margin: '2px 0',
    // padding: '2px',
    // border: `1px solid ${theme.palette.grey[200]}`,
    // background: `${theme.palette.grey[200]}`
  },
  itemId: {
    color: theme.palette.grey[500],
    fontSize: '12px',
  },
  itemTitle: {},
  '@global': {
    '.MuiCollapse-wrapperInner > ul': {
      paddingLeft: 0,
    },
    '.MuiTreeItem-content': {
      alignItems: 'flex-start',
    },
    '.MuiTreeItem-iconContainer': {
      marginTop: '3px',
    },
  },
}))

const StatisticsTreeView = ({ statistics, regions }) => {
  const classes = useStyles()
  const [expanded, setExpanded] = useState([])

  const handleChange = (event, nodes) => {
    setExpanded(nodes)
  }

  const renderLabel = (id, title) => {
    return (
      <div className={classes.itemLabel}>
        <span className={classes.itemTitle}>{title}</span>
        {/* <span className={classes.itemId}>{id}</span> */}
      </div>
    )
  }

  return (
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      expanded={expanded}
      onNodeToggle={handleChange}
    >
      {statistics.map(({ id, title, measures }) => (
        <TreeItem key={id} nodeId={id} label={renderLabel(id, title)}>
          <ul>
            {measures.map((measure) => (
              <TreeItem
                key={measure.id}
                nodeId={measure.id}
                label={renderLabel(measure.id, measure.title)}
              />
            ))}
          </ul>
        </TreeItem>
      ))}
    </TreeView>
  )
}

StatisticsTreeView.propTypes = {
  statistics: PropTypes.arrayOf(PropTypes.object),
}

export default StatisticsTreeView
