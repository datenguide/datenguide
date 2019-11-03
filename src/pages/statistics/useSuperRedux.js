import { useCallback, useMemo, useRef } from 'react'
import { produce } from 'immer'
import { useState } from 'reinspect'

// datenguide SUPER REDUX
// see https://miro.medium.com/max/2400/1*Sj52Qcwix-_n34ptiLIQag.jpeg

// features:
// - hooks all the way down
// - plain action dispatch
// - thunk dispatch for side effects
// - nested async dispatch: thunks can be dispatched from inside thunks
// - immer for state changes written in mutating style
// - redux dev tools
// - conveniently define sync and async action creators
//

export const createSyncActionCreators = actions =>
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

export const useSuperActions = (syncActions, asyncActions) => {
  return useMemo(
    () => Object.assign(createSyncActionCreators(syncActions), asyncActions),
    []
  )
}

export const useSuperReducer = (reducer, initialState, id) => {
  const cachedImmerReducer = useCallback(produce(reducer), [reducer])

  const [reducerState, setReducerState] = useState(initialState, id)

  const state = useRef(reducerState)
  const getState = () => state.current
  const setState = newState => {
    state.current = newState
    setReducerState(newState)
  }

  const reduce = action => cachedImmerReducer(getState(), action)
  const dispatchWithSideEffects = action =>
    typeof action === 'function'
      ? action(dispatchWithSideEffects, getState)
      : setState(reduce(action))

  return [reducerState, dispatchWithSideEffects]
}

const useSuperRedux = (
  syncActions,
  asyncActions,
  reducer,
  initialState,
  id
) => {
  const actions = useSuperActions(syncActions, asyncActions)
  const [state, dispatch] = useSuperReducer(reducer, initialState, id)
  return [state, dispatch, actions]
}

export default useSuperRedux
