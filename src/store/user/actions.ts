import {UserState, UPDATE_USER_STATE,UPDATE_USER_HISTORY,UpdateUserHistoryAction,UpdateUserStateAction,LooseState} from './types'

export function updateUserState(newObject: UserState): UpdateUserStateAction {
  return {
    type: UPDATE_USER_STATE,
    payload: newObject
  }
}

export function updateUserHistories(newObject: LooseState): UpdateUserHistoryAction {
  return {
    type: UPDATE_USER_HISTORY,
    payload: newObject.histories
  }
}