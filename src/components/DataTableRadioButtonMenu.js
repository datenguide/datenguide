import { makeStyles } from '@material-ui/core/styles'
import DataTableMenu from './DataTableMenu'
import MenuItem from '@material-ui/core/MenuItem'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Radio from '@material-ui/core/Radio'

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

const DataTableRadioButtonMenu = ({
  label,
  icon,
  options,
  onChange,
  value,
}) => {
  const classes = useStyles()

  return (
    <DataTableMenu label={label} icon={icon}>
      <RadioGroup
        aria-label="gender"
        name="gender1"
        value={value}
        onChange={onChange}
      >
        {options.map((option) => (
          <MenuItem key={option.value}>
            <FormControlLabel
              value={option.value}
              control={<Radio />}
              label={option.label}
            />
          </MenuItem>
        ))}
      </RadioGroup>
    </DataTableMenu>
  )
}

DataTableRadioButtonMenu.propTypes = {}

export default DataTableRadioButtonMenu
