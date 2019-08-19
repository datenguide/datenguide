const data = require('../../../data/ags.json')

export default (req, res) => {
    const { query: { ags } } = req
    res.status(200).json({ id: ags, name: data[ags] })
}
