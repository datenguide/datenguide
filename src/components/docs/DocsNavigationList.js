import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import DocsNavigationListItem from './DocsNavigationListItem'
import docsNavigation from '../../docsNavigation'
import List from '@material-ui/core/List'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    paddingTop: theme.spacing(2),
    backgroundColor: theme.palette.background.paper
  },
  nested: {
    paddingLeft: theme.spacing(4)
  }
}))

const renderNavigation = (navigation, depth) => (
  <>
    {navigation.map(({ title, href, children }) => (
      <DocsNavigationListItem
        key={title}
        title={title}
        href={href}
        depth={depth}
      >
        {children ? renderNavigation(children, depth + 1) : null}
      </DocsNavigationListItem>
    ))}
  </>
)

const DocsNavigationList = () => {
  const classes = useStyles()
  return (
    <List className={classes.root}>{renderNavigation(docsNavigation, 0)}</List>
  )
}

export default DocsNavigationList
