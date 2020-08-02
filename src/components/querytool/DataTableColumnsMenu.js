import { makeStyles } from '@material-ui/core/styles'
import DataTableMenu from './DataTableMenu'
import MenuItem from '@material-ui/core/MenuItem'
import Switch from '@material-ui/core/Switch'

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

const DataTableColumnsMenu = ({ label, icon, columns, onToggle }) => {
  const classes = useStyles()

  return (
    <DataTableMenu label={label} icon={icon}>
      {columns.map((column) => {
        return (
          <MenuItem className={classes.menuItem} key={column.name}>
            <div className={classes.columnCode}>{column.name}</div>
            <div className={classes.columnTitle}>{column.titleDe}</div>
            <div>
              <Switch
                size="small"
                checked={column.active}
                onChange={onToggle}
                value={JSON.stringify({ id: column.id, name: column.name })}
              />
            </div>
          </MenuItem>
        )
      })}
    </DataTableMenu>
  )
}

DataTableColumnsMenu.propTypes = {}

export default DataTableColumnsMenu
