const data = require('../../data/ags.json')

export default (req, res) => {    
  res.status(200).json(data)
}