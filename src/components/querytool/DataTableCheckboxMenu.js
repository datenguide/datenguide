import DataTableMenu from './DataTableMenu'
import MenuItem from '@material-ui/core/MenuItem'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import FormGroup from '@material-ui/core/FormGroup'

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
