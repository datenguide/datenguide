import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import DocsNavigationListItem from './DocsNavigationListItem'
import docsNavigation from '../../docsNavigation'
import List from '@material-ui/core/List'
import { useRouter } from 'next/router'

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

const DocsNavigationList = () => {
  const router = useRouter()

  const renderNavigation = (navigation, depth) => (
    <>
      {navigation.map(({ title, href, children }) => {
        return (
          <DocsNavigationListItem
            key={title}
            title={title}
            href={href}
            depth={depth}
            active={href === router.pathname}
          >
            {children ? renderNavigation(children, depth + 1) : null}
          </DocsNavigationListItem>
        )
      })}
    </>
  )

  const classes = useStyles()
  return (
    <List className={classes.root}>{renderNavigation(docsNavigation, 0)}</List>
  )
}

export default DocsNavigationList
