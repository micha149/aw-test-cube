/* eslint-disable import/no-anonymous-default-export */
import { AppActionType } from './../types'

const defaultState = {
  successMessage: null,
  errorMessage: null,
  loading: false,
  currentAct: null
}

export default (state = defaultState, action) => {
  switch (action.type) {

    case AppActionType.UPDATE_CURRENT_ACT:
      return {
        ...state,
        currentAct: action.payload
      }

    default: return { ...state }
  }
}
