import DataTableMenu from './DataTableMenu'
import MenuItem from '@mui/material/MenuItem'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import FormGroup from '@mui/material/FormGroup'

const DataTableCheckboxMenu = ({ label, icon, options, onChange, value }) => {
  return (
    <DataTableMenu label={label} icon={icon}>
      <FormGroup
        aria-label="checkboxes"
        name="checkbox"
        value={value}
        onChange={onChange}
      >
        {Object.keys(options)
          .reverse()
          .map((option) => (
            <MenuItem key={option}>
              <FormControlLabel
                value={option}
                control={
                  <Checkbox
                    checked={options[option]}
                    onChange={onChange}
                    name="option.value"
                  />
                }
                label={option}
              />
            </MenuItem>
          ))}
      </FormGroup>
    </DataTableMenu>
  )
}

DataTableCheckboxMenu.propTypes = {}

export default DataTableCheckboxMenu
