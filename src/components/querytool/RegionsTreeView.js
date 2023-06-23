import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Highlighter from 'react-highlight-words'
import _ from 'lodash'

import { makeStyles } from '@mui/styles'
import TreeView from '@mui/lab/TreeView'
import TreeItem from '@mui/lab/TreeItem'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import ClearIcon from '@mui/icons-material/Clear'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Chip from '@mui/material/Chip'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  searchfield: {
    '@global': {
      '.MuiInputBase-input': {
        fontSize: '16px',
      },
    },
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
  itemTitle: {
    fontSize: '16px',
    flex: '1 1 auto',
    flexWrap: 'wrap',
  },
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
    flex: '1 0 auto',
  },
  addButton: {
    height: '12px',
    width: '12px',
    flex: '0 1 auto',
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
  chip: {
    marginRight: '4px',
    fontWeight: 'normal',
    fontSize: '12px',
  },
}))

const RegionsTreeView = ({ nodes, onSelect }) => {
  const classes = useStyles()
  const [expanded, setExpanded] = useState([])
  const [searchValue, setSearchValue] = useState('')

  const [searchResult, setSearchResult] = useState(nodes)

  useEffect(() => {
    const filterRegionList = (regions, searchValue) =>
      regions.filter((r) =>
        r.name.toLowerCase().includes(searchValue.toLowerCase())
      )

    const findInregionTree = (region, searchValue) => {
      if (region.name.toLowerCase().includes(searchValue.toLowerCase())) {
        // return entire region
        return region
      }
      if (!region.children || region.children.length === 0) {
        return null
      }
      let matchingChildren = []
      const directChildtMatches = filterRegionList(region.children, searchValue)
      matchingChildren = matchingChildren.concat(directChildtMatches)
      const subChildMatches = region.children.filter((c) => {
        return (
          !directChildtMatches.includes(c) &&
          findInregionTree(c, searchValue) !== null
        )
      })
      matchingChildren = matchingChildren.concat(subChildMatches)
      if (matchingChildren.length > 0) {
        setExpanded(matchingChildren.map((c) => c.id))
        return { ...region, children: matchingChildren }
      }
      return null
    }

    if (!searchValue) {
      setExpanded([])
      setSearchResult(nodes)
    } else {
      const result = _.compact(
        nodes.map((region) => findInregionTree(region, searchValue))
      )
      setSearchResult(result)
      setExpanded(result.map((s) => s.id))
    }
  }, [searchValue])

  const handleNodeToggle = (event, nodes) => {
    setExpanded(nodes)
  }

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value)
  }

  const handleClearSearchValue = () => {
    setSearchValue('')
  }

  const handleSelectRegion = (id) => () => {
    onSelect(id)
  }

  const renderLabel = (id, title) => {
    return (
      <div className={classes.itemLabel}>
        <div className={classes.itemTitle}>
          <Chip size="small" label={id} className={classes.chip} color="grey" />
          <Highlighter searchWords={[searchValue]} textToHighlight={title} />
        </div>
        <Tooltip title="Zur Abfrage hinzufügen">
          <IconButton
            className={classes.addButton}
            variant="contained"
            color="secondary"
            onClick={handleSelectRegion(id)}
            size="large">
            <AddCircleIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </div>
    );
  }

  const renderTreeItem = ({ id, name, children }) => (
    <TreeItem key={id} nodeId={id} label={renderLabel(id, name)}>
      {children &&
        children.length > 0 &&
        children.map((child) => renderTreeItem(child))}
    </TreeItem>
  )

  return (
    <div className={classes.root}>
      <TextField
        id="search"
        style={{ margin: 8 }}
        placeholder="Region suchen"
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
        onNodeSelect={handleSelectRegion}
      >
        {searchResult.map((item) => renderTreeItem(item))}
      </TreeView>
    </div>
  )
}

RegionsTreeView.propTypes = {
  nodes: PropTypes.arrayOf(PropTypes.object),
}

export default RegionsTreeView
