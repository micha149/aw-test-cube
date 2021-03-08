import { AppActionType } from '../types'

export const updateCurrentAct = (act) => {
  return {
    type: AppActionType.UPDATE_CURRENT_ACT,
    payload: act
  }
}