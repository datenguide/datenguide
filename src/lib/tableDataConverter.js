// TODO should transformations to tabular data be moved to the server?
// -> also required for csv exports anyway

// convert result set to tabular long format
export const convertToLongFormat = (data, attribute) => {
  if (!data || Object.keys(data).length === 0 || !attribute) {
    return []
  }

  const regions = Object.keys(data)

  console.log('data', data);

  let reduce = regions.reduce((acc, curr) => {
    const regionData = data[curr]
    const regionId = regionData.id
    const regionName = regionData.name
    return acc.concat(
      regionData[attribute] && regionData[attribute].map(row => ({
        regionId,
        regionName,
        ...row
      }))
    )
  }, [])
  console.log('reduce', reduce);


  return reduce
}

export default convertToLongFormat
