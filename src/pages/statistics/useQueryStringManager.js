import qs from 'query-string'

const setQueryStringWithoutPageReload = qsValue => {
  const newurl =
    window.location.protocol +
    '//' +
    window.location.host +
    window.location.pathname +
    qsValue

  window.history.pushState({ path: newurl }, '', newurl)
}

const setQueryStringValue = (
  key,
  value,
  queryString = window.location.search
) => {
  const values = qs.parse(queryString)
  const newQsValue = qs.stringify({ ...values, [key]: value })
  setQueryStringWithoutPageReload(`?${newQsValue}`)
}
