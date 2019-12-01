const data = require('../../../data/ags.json')
const slugify = require('@sindresorhus/slugify')

const districts = Object.keys(data)
  .filter(id => id.length <= 5)
  .map(id => ({
    name: data[id],
    id,
    slug: slugify(data[id])
  }))

export default (req, res) => {
  const {
    query: { slug }
  } = req
  const result = districts.find(region => region.slug === slug)

  if (result) {
    res.status(200).json(result)
  } else {
    res.status(404).send(`Region not found: ${slug}`)
  }
}
