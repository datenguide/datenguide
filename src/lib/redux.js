export const createActions = actions =>
  actions.reduce(
    (acc, curr) => ({
      ...acc,
      [curr]: payload => ({
        type: curr,
        payload
      })
    }),
    {}
  )
