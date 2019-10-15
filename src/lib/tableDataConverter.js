// TODO should transformations to tabular data be moved to the server?
// -> also required for csv exports

// convert result set to tabular long format
export const convertToLongFormat = (data, attribute) => {
  if (!data || !data.region || !attribute || !data.region[attribute]) {
    return []
  }
  const { id, name } = data.region

  return data.region[attribute].map(row => ({
    regionId: id,
    regionName: name,
    ...row
  }))
}

export default convertToLongFormat
