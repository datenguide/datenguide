import React, { useEffect, useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { getAllCommunities } from '../../../../data/regions'

const RegionSelect = ({ onSelect, className }) => {
  const [options, setOptions] = useState([])

  useEffect(async () => {
    const loadRegions = async () => {
      const result = getAllCommunities()
      setOptions(result)
    }
    await loadRegions()
  }, [])

  // useEffect(() => {
  //   // pre-select value for testing TODO move to storybook?
  //   onSelect({ value: '00000000' })
  // }, [])

  const handleChange = (__, value) => {
    onSelect(value)
  }

  return (
    <Autocomplete
      id="region-select"
      size="small"
      className={className}
      disableClearable
      onChange={handleChange}
      autoHighlight
      getOptionLabel={(option) => option.name}
      options={options}
      renderInput={(params) => (
        <TextField
          {...params}
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
