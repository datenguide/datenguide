import Toolbar from '@material-ui/core/Toolbar'
import ViewColumnIcon from '@material-ui/icons/ViewColumn'
import TextFormatIcon from '@material-ui/icons/TextFormat'
import SaveAltIcon from '@material-ui/icons/SaveAlt'
import AppsIcon from '@material-ui/icons/Apps'
import { makeStyles } from '@material-ui/styles'

import DataTableColumnsMenu from './DataTableColumnsMenu'
import DataTableRadioButtonMenu from './DataTableRadioButtonMenu'
import DataTableDownloadMenu from './DataTableDownloadMenu'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}))

const DataTableToolbar = ({
  measures,
  regions,
  labels,
  layout,
  dispatch,
  actions,
}) => {
  const classes = useStyles()

  const columns =
    (measures &&
      measures[0] &&
      // adding measure id here to identify the owner of the dimension
      measures[0].dimensions.map((dim) => ({ ...dim, id: measures[0].id }))) ||
    []

  const handleColumnToggle = (value) => {
    const { id, name } = JSON.parse(value.target.value)
    dispatch(
      actions.changeDimensionSelection({
        id,
        argCode: name,
        diff: {
          active: value.target.checked,
        },
      })
    )
  }

  const labelOptions = [
    { label: 'Codes', value: 'id' },
    { label: 'Texte', value: 'name' },
    { label: 'Codes und Texte', value: 'both' },
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

  return (
    <Toolbar variant="dense" className={classes.root}>
      <DataTableColumnsMenu
        label="Spalten"
        icon={<ViewColumnIcon />}
        columns={columns}
        onToggle={handleColumnToggle}
      />
      <DataTableRadioButtonMenu
        label="Beschriftung"
        icon={<TextFormatIcon />}
        options={labelOptions}
        value={labels}
        onChange={handleLabelsChange}
      />
      <DataTableRadioButtonMenu
        label="Layout"
        icon={<AppsIcon />}
        options={layoutOptions}
        value={layout}
        onChange={handleLayoutChange}
      />
      <DataTableDownloadMenu label="Download" icon={<SaveAltIcon />} />
    </Toolbar>
  )
}

export default DataTableToolbar
