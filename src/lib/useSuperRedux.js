import { useCallback, useMemo, useRef } from 'react'
import { produce } from 'immer'
import { useState } from 'reinspect'

// datenguide SUPER REDUX
// see https://miro.medium.com/max/2400/1*Sj52Qcwix-_n34ptiLIQag.jpeg

// features:
// - hooks all the way down
// - plain action dispatch (sync actions)
// - thunk dispatch for side effects (async actions)
// - nested async dispatch: thunks can be dispatched inside thunks
// - immer for state changes written in mutating style
// - partial redux dev tools support (state is supported, TODO: support actions)
// - accepts reducer functions object (no switch statement required)
// - auto-generates sync action creators from reducer functions
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

export const useSuperReducer = (reducers, initialState, id) => {
  const reducer = useCallback(
    (state, action) => {
      if (!reducers[action.type]) {
        throw new Error(`unknown action ${action.type}`)
      }
      return reducers[action.type](state, action)
    },
    [reducers]
  )

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

const useSuperRedux = (asyncActions, reducers, initialState, id) => {
  const actions = useSuperActions(Object.keys(reducers), asyncActions)
  const [state, dispatch] = useSuperReducer(reducers, initialState, id)
  return [state, dispatch, actions]
}

export default useSuperRedux
