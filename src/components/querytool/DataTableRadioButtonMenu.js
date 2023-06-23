import DataTableMenu from './DataTableMenu'
import MenuItem from '@mui/material/MenuItem'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'

const DataTableRadioButtonMenu = ({
  label,
  icon,
  options,
  onChange,
  value,
}) => {
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
