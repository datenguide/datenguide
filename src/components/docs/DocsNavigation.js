import { useRouter } from 'next/router'

import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'

import DocsNavigationItem from './DocsNavigationItem'
import docsNavigation from '../../docsNavigation'

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

const DocsNavigation = () => {
  const router = useRouter()

  const renderNavigation = (navigation, depth) => (
    <>
      {navigation.map(({ title, href, children }) => {
        return (
          <DocsNavigationItem
            key={title}
            title={title}
            href={href}
            depth={depth}
            active={href === router.pathname}
          >
            {children ? renderNavigation(children, depth + 1) : null}
          </DocsNavigationItem>
        )
      })}
    </>
  )

  const classes = useStyles()
  return (
    <List className={classes.root}>{renderNavigation(docsNavigation, 0)}</List>
  )
}

export default DocsNavigation
