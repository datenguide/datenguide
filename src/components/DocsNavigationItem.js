import { useState } from 'react'
import clsx from 'clsx'

import { makeStyles } from '@mui/styles'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Collapse from '@mui/material/Collapse'
import Button from '@mui/material/Button'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    paddingTop: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
  },
  listItem: {
    display: 'flex',
  },
  button: {
    fontWeight: theme.typography.fontWeightRegular,
    textTransform: 'none',
    justifyContent: 'flex-start',
    width: '100%',
    '&.depth0': {
      fontWeight: theme.typography.fontWeightBold,
    },
    '&.active': {
      color: theme.palette.primary.main,
      fontWeight: theme.typography.fontWeightMedium,
    },
  },
}))

const DocsNavigationItem = ({ title, href, depth, children, active }) => {
  const classes = useStyles()
  const [open, setOpen] = useState(true)

  const handleClick = () => {
    setOpen(!open)
  }

  const indentStyle = {
    paddingLeft: 8 * (depth + 1),
  }

  if (href) {
    return (
      <>
        <ListItem className={classes.listItem}>
          <Button
            href={href}
            className={clsx(classes.button, `depth${depth}`, {
              active: active,
            })}
          >
            {title}
          </Button>
        </ListItem>
      </>
    )
  }

  return (
    <>
      <ListItem className={classes.listItem} onClick={handleClick}>
        <Button className={clsx(classes.button, `depth${depth}`)}>
          {title}
        </Button>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" style={indentStyle} disablePadding>
          {children}
        </List>
      </Collapse>
    </>
  )
}

export default DocsNavigationItem
