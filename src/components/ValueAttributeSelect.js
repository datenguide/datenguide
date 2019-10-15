import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import ListItemText from '@material-ui/core/ListItemText'
import Select from '@material-ui/core/Select'
import Checkbox from '@material-ui/core/Checkbox'

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

const ValueAttributeSelect = ({
  label,
  value,
  options,
  onChange
  // onSelectAll,
  // onReset
}) => {
  const classes = useStyles()
  
  return (
    <div className={classes.root}>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="select-multiple-checkbox">{label}</InputLabel>
        <Select
          multiple
          value={value}
          options={options}
          onChange={onChange}
          input={<Input id="select-multiple-checkbox" />}
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
    </div>
  )
}

ValueAttributeSelect.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onChange: PropTypes.func.isRequired,
  // onSelectAll: PropTypes.func.isRequired,
  // onReset: PropTypes.func.isRequired
}

export default ValueAttributeSelect
