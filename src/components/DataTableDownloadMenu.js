import { makeStyles } from '@material-ui/core/styles'
import DataTableMenu from './DataTableMenu'
import MenuItem from '@material-ui/core/MenuItem'

const useStyles = makeStyles((theme) => ({
  root: {
    background: 'red',
  },
  menuItem: {
    display: 'flex',
  },
  columnCode: {
    fontWeight: 'bold',
    width: '100px',
  },
  columnTitle: {
    width: '300px',
  },
}))

const DataTableDownloadMenu = ({ label, icon, options, onChange, value }) => {
  const classes = useStyles()

  return (
    <DataTableMenu label={label} icon={icon}>
      <MenuItem>JSON</MenuItem>
      <MenuItem>CSV</MenuItem>
    </DataTableMenu>
  )
}

DataTableDownloadMenu.propTypes = {}

export default DataTableDownloadMenu
