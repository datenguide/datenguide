import { makeStyles } from '@mui/styles'
import { Button } from '@mui/material'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import Menu from '@mui/material/Menu'
import { useState } from 'react'

const useStyles = makeStyles((theme) => ({
  root: {},
  icon: {
    marginRight: theme.spacing(0.5),
    marginTop: theme.spacing(1),
  },
}))

const DataTableMenu = ({ label, icon, children }) => {
  const classes = useStyles()

  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const id = label.toLowerCase()

  return (
    <div className={classes.root}>
      <Button
        className={classes.button}
        aria-controls={id}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <span className={classes.icon}>{icon}</span>
        {label}
        <ArrowDropDownIcon />
      </Button>
      <Menu
        id={id}
        anchorEl={anchorEl}
        keepMounted
        open={anchorEl !== null}
        onClose={handleClose}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        {children}
      </Menu>
    </div>
  )
}

DataTableMenu.propTypes = {}

export default DataTableMenu
