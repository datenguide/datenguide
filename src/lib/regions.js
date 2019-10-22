import { getRegions } from '../lib/regions'

export default (req, res) => {
  const {
    query: { nuts }
  } = req
  res.status(200).json(getRegions(nuts))
}
