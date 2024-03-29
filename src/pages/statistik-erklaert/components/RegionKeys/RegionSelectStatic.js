import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/lab/Autocomplete'
import { getAllCommunities } from '@/data/regions'

const RegionSelect = ({ onSelect, className }) => {
  const [options, setOptions] = useState([])
  const [value, setValue] = useState(null)

  useEffect( () => {
    const loadRegions = async () => {
      const result = getAllCommunities()
      setOptions(result)
    }
    loadRegions()
  }, [])

  useEffect(() => {
    const startingValues = [
      '07333046',
      '09575130',
      '09176132',
      '08315051',
      '08425125',
    ]
    const randomIndex = Math.floor(Math.random() * 5)
    const option = options.find((o) => o.value === startingValues[randomIndex])
    onSelect(option)
    setValue(option)
  }, [options])

  const handleChange = (__, value) => {
    setValue(value)
    onSelect(value)
  }

  const clearSelection = () => {
    setValue(null)
    onSelect(null)
  }

  return (
    <Autocomplete
      id="region-select"
      size="small"
      className={className}
      disableClearable
      onChange={handleChange}
      autoHighlight
      value={value}
      getOptionLabel={(option) => option.name}
      options={options}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          onFocus={clearSelection}
          label="Gemeinde auswählen oder suchen"
          InputProps={{
            ...params.InputProps,
          }}
        />
      )}
    />
  )
}

export default RegionSelect
