import inventory from '../../../data/inventory.json'

export default (req, res) => {
  const {
    query: { statistic, measure },
  } = req

  if (statistic && statistic) {
    return res
      .status(200)
      .json(
        (inventory[statistic] && inventory[statistic].measures[measure]) || []
      )
  } else {
    return res.status(200).json([])
  }
}
