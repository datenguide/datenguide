import React, { useEffect, useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import CircularProgress from '@material-ui/core/CircularProgress'
import searchRegion from '../../../../data/regions'

const RegionSelect = ({ onSelect, className }) => {
  const [open, setOpen] = useState(false)
  const [searchValue, setSearchValue] = useState(null)
  const [options, setOptions] = useState([])
  const loading = open // && options.length === 0

  useEffect(() => {
    let active = true

    if (!loading) {
      return undefined
    }

    const loadRegions = async () => {
      const result = searchRegion(searchValue)
      if (active) {
        setOptions(result)
      }
    }
    loadRegions()

    return () => {
      active = false
    }
  }, [loading])

  useEffect(() => {
    if (!open) {
      setOptions([])
    }
  }, [open])

  useEffect(() => {
    // pre-select value for testing TODO move to storybook?
    onSelect({ value: '15083323', name: '15083323 - Ingersleben' })
  }, [])

  const handleInputChange = (event) => {
    setSearchValue(event.target.value)
  }

  const handleChange = (__, value) => {
    onSelect(value)
    setSearchValue(null)
  }

  return (
    <Autocomplete
      id="region-select"
      size="small"
      open={open}
      onOpen={() => {
        setOpen(true)
      }}
      onClose={() => {
        setOpen(false)
      }}
      className={className}
      onChange={handleChange}
      onInputChange={handleInputChange}
      getOptionSelected={(option, value) => option.name === value.name}
      getOptionLabel={(option) => option.name}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Gemeinde suchen"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  )
}

export default RegionSelect
