import querystring from 'query-string'
export default async (req, res) => {
  const result = await fetch(
    `https://tabular.genesapi.org/?${querystring.stringify(
      req.query
    )}&format=json`
  )
  const json = await result.json()
  res.status(200).json(json)
}
