import DataTableMenu from './DataTableMenu'
import MenuItem from '@material-ui/core/MenuItem'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'

const DataTableCheckboxMenu = ({ label, icon, options, onChange, value }) => {
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
              control={
                <Checkbox
                  checked={option.checked}
                  onChange={onChange}
                  name="option.value"
                />
              }
              label={option.label}
            />
          </MenuItem>
        ))}
      </RadioGroup>
    </DataTableMenu>
  )
}

DataTableCheckboxMenu.propTypes = {}

export default DataTableCheckboxMenu
