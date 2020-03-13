import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Input from '@material-ui/core/Input'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import ListItemText from '@material-ui/core/ListItemText'
import Select from '@material-ui/core/Select'
import Checkbox from '@material-ui/core/Checkbox'
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormGroup from '@material-ui/core/FormGroup'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    width: '100%'
  },
  noLabel: {
    marginTop: theme.spacing(3)
  }
}))

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: '250px'
    }
  }
}

const DimensionSelect = ({
  name,
  label,
  value,
  options,
  onChange,
  onToggle,
  active
}) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <FormGroup row>
        <FormControlLabel
          control={
            <Switch
              size="small"
              checked={active}
              onChange={onToggle}
              value={name}
            />
          }
          label={label}
        />
        <FormControl>
          <Select
            multiple
            disabled={!active}
            value={value}
            options={options}
            onChange={onChange}
            input={<Input id="select-multiple-checkbox" />}
            inputProps={{
              id: label
            }}
            renderValue={value => `Ausgewählt: ${value.length}`}
            MenuProps={MenuProps}
          >
            {options.map(option => {
              return (
                <MenuItem key={option.label} value={option.value}>
                  <Checkbox checked={value.includes(option.value)} />
                  <ListItemText primary={option.label} />
                </MenuItem>
              )
            })}
          </Select>
        </FormControl>
      </FormGroup>
    </div>
  )
}

DimensionSelect.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onChange: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired
}

export default DimensionSelect
