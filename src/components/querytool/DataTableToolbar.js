import copy from 'copy-to-clipboard'
import querystring from 'query-string'

import Toolbar from '@mui/material/Toolbar'
import TextFormatIcon from '@mui/icons-material/TextFormat'
import SaveAltIcon from '@mui/icons-material/SaveAlt'
import AppsIcon from '@mui/icons-material/Apps'
import DateRangeIcon from '@mui/icons-material/DateRange'
import { makeStyles } from '@mui/styles'
import IconButton from '@mui/material/IconButton'
import FileCopyIcon from '@mui/icons-material/FileCopy'

import DataTableRadioButtonMenu from './DataTableRadioButtonMenu'
import DataTableDownloadMenu from './DataTableDownloadMenu'
import DataTableCheckboxMenu from './DataTableCheckboxMenu'
import { useState } from 'react'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}))

const DataTableToolbar = ({
  labels,
  layout,
  dispatch,
  actions,
  queryArgs,
  filename,
}) => {
  const classes = useStyles()

  const labelOptions = [
    { label: 'Texte', value: 'name' },
    { label: 'Codes', value: 'id' },
  ]

  const handleLabelsChange = (value) => {
    dispatch(actions.changeLabels({ labels: value.target.value }))
  }

  const layoutOptions = [
    { label: 'Eine Zeile pro Wert', value: 'long' },
    { label: 'Eine Zeile pro Region', value: 'region' },
    { label: 'Eine Zeile pro Jahr', value: 'time' },
  ]

  const handleLayoutChange = (value) => {
    dispatch(actions.changeLayout({ layout: value.target.value }))
  }

  const [years, setYears] = useState({
    2020: true,
    2019: true,
    2018: true,
    2017: true,
    2016: true,
    2015: true,
    2014: true,
    2013: true,
    2012: true,
    2011: true,
    2010: true,
    2009: true,
    2008: true,
    2007: true,
    2006: true,
    2005: true,
    2004: true,
    2003: true,
    2002: true,
    2001: true,
    2000: true,
  })

  const [copied, setCopied] = useState(false)

  const handleYearChange = (event) => {
    const changedYear = event.target.value
    const newState = { ...years, [changedYear]: !years[changedYear] }
    setYears(newState)
    dispatch(
      actions.changeTime({
        time: Object.keys(newState)
          .filter((year) => newState[year])
          .join(','),
      })
    )
  }

  const handleCopyToClipboard = () => {
    fetch(
      `https://tabular.genesapi.org?${querystring.stringify(
        queryArgs
      )}&format=csv`
    )
      .then((response) => {
        return response.text()
      })
      .then((data) => {
        copy(data, { debug: true })
      })
      .then(() => {
        setCopied(true)
        setTimeout(() => {
          setCopied(false)
        }, 5000)
      })
  }

  return (
    <Toolbar variant="dense" className={classes.root}>
      <DataTableRadioButtonMenu
        label="Layout"
        icon={<AppsIcon />}
        options={layoutOptions}
        value={layout}
        onChange={handleLayoutChange}
      />
      <DataTableCheckboxMenu
        label="Jahre"
        icon={<DateRangeIcon />}
        options={years}
        value={layout}
        onChange={handleYearChange}
      />
      <DataTableRadioButtonMenu
        label="Beschriftung"
        icon={<TextFormatIcon />}
        options={labelOptions}
        value={labels}
        onChange={handleLabelsChange}
      />
      <DataTableDownloadMenu
        label="Download"
        icon={<SaveAltIcon />}
        queryArgs={queryArgs}
        filename={filename}
      />
      <IconButton onClick={handleCopyToClipboard} size="large">
        <FileCopyIcon style={{ color: copied ? '#38a861' : '#000' }} />
      </IconButton>
    </Toolbar>
  );
}

export default DataTableToolbar
