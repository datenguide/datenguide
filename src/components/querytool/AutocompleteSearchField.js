import PropTypes from 'prop-types'
import AsyncSelect from 'react-select/async'
import Highlighter from 'react-highlight-words'

import { emphasize, makeStyles, useTheme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import NoSsr from '@material-ui/core/NoSsr'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import MenuItem from '@material-ui/core/MenuItem'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  input: {
    display: 'flex',
    padding: 0,
    height: 'auto',
  },
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
    overflow: 'hidden',
  },
  chip: {
    margin: theme.spacing(0.5, 0.25),
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.type === 'light'
        ? theme.palette.grey[300]
        : theme.palette.grey[700],
      0.08
    ),
  },
  noOptionsMessage: {
    padding: theme.spacing(1, 2),
  },
  singleValue: {
    fontSize: 16,
  },
  placeholder: {
    position: 'absolute',
    left: 2,
    bottom: 6,
    fontSize: 16,
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0,
  },
  divider: {
    height: theme.spacing(2),
  },
  option: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  optionLabel: {
    fontSize: theme.typography.body1.fontSize,
  },
  optionDescription: {
    fontSize: theme.typography.caption.fontSize,
    color: '#9e9e9e',
  },
}))

const NoOptionsMessage = ({
  selectProps: {
    classes: { noOptionsMessage },
  },
  innerProps,
  children,
}) => (
  <Typography
    color="textSecondary"
    className={noOptionsMessage}
    {...innerProps}
  >
    {children}
  </Typography>
)

NoOptionsMessage.propTypes = {
  children: PropTypes.node,
  innerProps: PropTypes.object.isRequired,
  selectProps: PropTypes.object.isRequired,
}

const inputComponent = ({ inputRef, ...props }) => {
  return <div ref={inputRef} {...props} />
}

inputComponent.propTypes = {
  inputRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({
      current: PropTypes.any.isRequired,
    }),
  ]),
}

const Control = ({
  children,
  innerProps,
  innerRef,
  selectProps: {
    classes: { input },
    TextFieldProps,
  },
}) => {
  return (
    <TextField
      fullWidth
      InputProps={{
        inputComponent,
        inputProps: {
          autocomplete: 'off',
          className: input,
          ref: innerRef,
          children,
          ...innerProps,
        },
      }}
      {...TextFieldProps}
    />
  )
}

Control.propTypes = {
  children: PropTypes.node,
  innerProps: PropTypes.shape({
    onMouseDown: PropTypes.func.isRequired,
  }).isRequired,
  innerRef: PropTypes.oneOfType([
    PropTypes.oneOf([null]),
    PropTypes.func,
    PropTypes.shape({
      current: PropTypes.any.isRequired,
    }),
  ]).isRequired,
  selectProps: PropTypes.object.isRequired,
}

const Option = ({
  isFocused,
  innerProps,
  data: { label, description },
  selectProps: {
    inputValue,
    classes: { option, optionLabel, optionDescription },
  },
}) => {
  const searchWords = inputValue.split(' ')
  return (
    <MenuItem
      selected={isFocused}
      {...innerProps}
      component="div"
      className={option}
    >
      <div className={optionLabel}>
        <Highlighter searchWords={searchWords} textToHighlight={label} />
      </div>
      <div className={optionDescription}>
        <Highlighter searchWords={searchWords} textToHighlight={description} />
      </div>
    </MenuItem>
  )
}

Option.propTypes = {
  children: PropTypes.node,
  innerProps: PropTypes.shape({
    id: PropTypes.string,
    key: PropTypes.string,
    onClick: PropTypes.func,
    onMouseMove: PropTypes.func,
    onMouseOver: PropTypes.func,
    tabIndex: PropTypes.number,
  }),
  isFocused: PropTypes.bool.isRequired,
  isSelected: PropTypes.bool.isRequired,
}

const Placeholder = ({
  selectProps: {
    classes: { placeholder },
  },
  children,
}) => {
  return (
    <Typography color="textSecondary" className={placeholder}>
      {children}
    </Typography>
  )
}

Placeholder.propTypes = {
  children: PropTypes.node,
  selectProps: PropTypes.shape({
    classes: PropTypes.shape({ placeholder: PropTypes.string.isRequired }),
  }).isRequired,
}

const ValueContainer = ({
  selectProps: {
    classes: { valueContainer },
  },
  children,
}) => {
  return <div className={valueContainer}>{children}</div>
}

ValueContainer.propTypes = {
  children: PropTypes.node,
  selectProps: PropTypes.shape({
    classes: PropTypes.shape({ valueContainer: PropTypes.string.isRequired }),
  }).isRequired,
}

const Menu = ({
  selectProps: {
    classes: { paper },
  },
  innerProps,
  children,
}) => {
  return (
    <Paper square className={paper} {...innerProps}>
      {children}
    </Paper>
  )
}

Menu.propTypes = {
  children: PropTypes.element.isRequired,
  innerProps: PropTypes.object.isRequired,
  selectProps: PropTypes.shape({
    classes: PropTypes.shape({ paper: PropTypes.string.isRequired }),
  }).isRequired,
}

const components = {
  Control,
  Menu,
  NoOptionsMessage,
  Option,
  Placeholder,
  ValueContainer,
}

const AutocompleteSearchField = ({
  onSelectionChange,
  loadOptions,
  label,
  placeholder,
}) => {
  const classes = useStyles()
  const theme = useTheme()

  const selectStyles = {
    input: (base) => ({
      ...base,
      color: theme.palette.text.primary,
      '& input': {
        font: 'inherit',
      },
    }),
  }

  return (
    <div className={classes.root}>
      <NoSsr>
        <AsyncSelect
          classes={classes}
          styles={selectStyles}
          inputId="react-select-single"
          TextFieldProps={{
            label,
            InputLabelProps: {
              htmlFor: 'react-select-single',
              shrink: true,
            },
          }}
          placeholder={placeholder}
          components={components}
          loadOptions={loadOptions}
          defaultOptions
          isSearchable
          onChange={onSelectionChange}
          value={null} // never set a value, use this as a search field only
        />
      </NoSsr>
    </div>
  )
}

AutocompleteSearchField.propTypes = {
  onSelectionChange: PropTypes.func.isRequired,
  loadOptions: PropTypes.func.isRequired,
}

export default AutocompleteSearchField
