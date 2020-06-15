import {UserState, UPDATE_USER_STATE, UserActionTypes } from './types'

export function updateUserState(newObject: UserState): UserActionTypes {
  return {
    type: UPDATE_USER_STATE,
    payload: newObject
  }
}