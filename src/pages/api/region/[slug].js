const data = require('@datenguide/metadata')
const slugify = require('@sindresorhus/slugify')

const districts = Object.keys(data)
  .filter(id => data[id].level <= 3) // NUTS 1 - 3, no LAU
  .map(id => ({
    name: data[id].name,
    id,
    slug: slugify(data[id].name)
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
