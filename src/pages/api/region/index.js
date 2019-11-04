const data = require('../../../data/ags.json')

const AGS_TO_NUTS = {
  2: 1,
  3: 2,
  5: 3
}

export const getNuts = id => {
  if (!id) {
    return {
      nuts: null,
      lau: false
    }
  }
  return {
    nuts: AGS_TO_NUTS[id.length],
    lau: id.length > 8
  }
}

export const getRegion = id => ({
  id,
  name: data[id],
  ...getNuts(id)
})
