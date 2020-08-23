import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import Menu from '@material-ui/core/Menu'
import { useEffect, useRef, useState } from 'react'
import MenuItem from '@material-ui/core/MenuItem'
import querystring from 'query-string'

const useStyles = makeStyles((theme) => ({
  root: {},
  icon: {
    marginRight: theme.spacing(0.5),
    marginTop: theme.spacing(1),
  },
}))

const DataTableDownloadMenu = ({ label, icon, queryArgs, filename }) => {
  const classes = useStyles()

  const [anchorEl, setAnchorEl] = useState(null)
  const [data, setData] = useState(null)
  const [type, setType] = useState('json')
  const downloadLinkRef = useRef()

  useEffect(() => {
    if (data) {
      downloadLinkRef.current.click()
      setAnchorEl(null)
    }
  }, [data])

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleDownload = (type) => () => {
    setAnchorEl(null)
    setType(type)

    fetch(
      `https://tabular.genesapi.org?${querystring.stringify(
        queryArgs
      )}&format=${type}`
    )
      .then((response) => {
        return response.blob()
      })
      .then((blob) => {
        setData(window.URL.createObjectURL(blob))
      })
  }

  const id = label.toLowerCase()

  return (
    <div className={classes.root}>
      <Button aria-controls={id} aria-haspopup="true" onClick={handleClick}>
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
        <MenuItem onClick={handleDownload('json')}>JSON</MenuItem>
        <MenuItem onClick={handleDownload('csv')}>CSV</MenuItem>
      </Menu>
      {data && (
        <a
          ref={downloadLinkRef}
          target="_blank"
          href={data}
          download={`datenguide-export-${filename}.${type}`}
          rel="noopener noreferrer"
          style={{
            height: 0,
            overflow: 'hidden',
            opacity: 0,
          }}
        />
      )}
    </div>
  )
}

DataTableDownloadMenu.propTypes = {}

export default DataTableDownloadMenu
