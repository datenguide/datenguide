import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Highlighter from 'react-highlight-words'
import _ from 'lodash'

import { makeStyles } from '@material-ui/core/styles'
import TreeView from '@material-ui/lab/TreeView'
import TreeItem from '@material-ui/lab/TreeItem'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import SearchIcon from '@material-ui/icons/Search'
import EqualizerIcon from '@material-ui/icons/Equalizer'
import ClearIcon from '@material-ui/icons/Clear'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  tree: {
    paddingTop: theme.spacing(2),
  },
  itemLabel: {
    display: 'flex',
    flexDirection: 'row',
  },
  icon: {},
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
  searchIcon: {
    color: theme.palette.grey[500],
  },
  clearSearchIcon: {
    color: theme.palette.grey[300],
    cursor: 'pointer',
    '&:hover': {
      color: theme.palette.grey[500],
    },
  },
  searchField: {},
}))

const RegionsTreeView = ({ nodes, onSelect }) => {
  const classes = useStyles()
  const [expanded, setExpanded] = useState([])
  const [searchValue, setSearchValue] = useState('')

  const [searchResult, setSearchResult] = useState(nodes)

  useEffect(() => {
    if (!searchValue) {
      setExpanded([])
      setSearchResult(nodes)
    } else {
      const result = _.compact(
        nodes.map((region) => {
          if (region.title.toLowerCase().includes(searchValue.toLowerCase())) {
            // return entire region
            return region
          }
          const matchingRegions = region.measures.filter((m) => {
            return m.title.toLowerCase().includes(searchValue.toLowerCase())
          })
          if (matchingRegions.length > 0) {
            // return filtered region
            return {
              ...region,
              measures: matchingRegions,
            }
          }
          return null
        })
      )
      setSearchResult(result)
      setExpanded(result.map((s) => s.id))
    }
  }, [searchValue])

  console.log('searchResult', searchResult)

  const handleNodeToggle = (event, nodes) => {
    setExpanded(nodes)
  }

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value)
  }

  const handleClearSearchValue = () => {
    setSearchValue('')
  }

  const handleSelectMeasure = (event, nodeIds) => {
    if (nodeIds.includes(':')) {
      onSelect(nodeIds.slice(0))
    }
  }

  const renderLabel = (id, title, showregionIcon) => {
    return (
      <div className={classes.itemLabel}>
        {showregionIcon && <EqualizerIcon className={classes.icon} />}
        <span className={classes.itemTitle}>
          <Highlighter searchWords={[searchValue]} textToHighlight={title} />
        </span>
      </div>
    )
  }

  return (
    <div className={classes.root}>
      <TextField
        id="search"
        style={{ margin: 8 }}
        placeholder="Merkmal oder Statistik suchen"
        value={searchValue}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start" className={classes.searchIcon}>
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment
              position="start"
              className={classes.clearSearchIcon}
              onClick={handleClearSearchValue}
            >
              {searchValue && <ClearIcon />}
            </InputAdornment>
          ),
        }}
        className={classes.searchfield}
        onChange={handleSearchChange}
      />
      <TreeView
        className={classes.tree}
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        expanded={expanded}
        onNodeToggle={handleNodeToggle}
        onNodeSelect={handleSelectMeasure}
      >
        {searchResult.map(({ id, name }) => (
          <TreeItem key={id} nodeId={id} label={renderLabel(id, name, true)}>
            {/*<ul>*/}
            {/*  {measures.map((measure) => (*/}
            {/*    <TreeItem*/}
            {/*      key={measure.id}*/}
            {/*      nodeId={`${id}:${measure.id}`}*/}
            {/*      label={renderLabel(measure.id, measure.title)}*/}
            {/*    />*/}
            {/*  ))}*/}
            {/*</ul>*/}
          </TreeItem>
        ))}
      </TreeView>
    </div>
  )
}

RegionsTreeView.propTypes = {
  nodes: PropTypes.arrayOf(PropTypes.object),
}

export default RegionsTreeView
