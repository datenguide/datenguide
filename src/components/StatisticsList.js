import React from 'react'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles'
import TreeView from '@material-ui/lab/TreeView'
import TreeItem from '@material-ui/lab/TreeItem'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: '100%',
    padding: theme.spacing(2),
    backgroundColor: '#f5f5f5'
  }
}))

const StatisticsList = ({ statistics }) => {
  const classes = useStyles()
  const [expanded, setExpanded] = React.useState([])

  const handleChange = (event, nodes) => {
    setExpanded(nodes)
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
        <TreeItem key={id} nodeId={id} label={`${id} / ${title}`}>
          {measures.map(({ id, title }) => (
            <TreeItem key={id} nodeId={id} label={title} />
          ))}
        </TreeItem>
      ))}
    </TreeView>
  )
}

StatisticsList.propTypes = {
  statistics: PropTypes.arrayOf(PropTypes.object)
}

export default StatisticsList
