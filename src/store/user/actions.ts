import {UserState, UPDATE_USER_STATE,RESET_USER,UserActionTypes} from './types'

export function updateUserState(newObject: UserState): UserActionTypes {
  return {
    type: UPDATE_USER_STATE,
    payload: newObject
  }
}

export function resetUser(): UserActionTypes{
  return {
    type: RESET_USER
  }
}