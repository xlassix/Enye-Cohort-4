import {UserState, UPDATE_USER_STATE, UserActionTypes } from './types'

const initialState = {
    logged_in:false,
    email:""
  }
  
//reducer function
export function userReducer(
  state = initialState,
  action: UserActionTypes
): UserState{
  switch (action.type) {
    case UPDATE_USER_STATE: {
      return {
        logged_in:action.payload.logged_in,
        email:action.payload.email
      }
    }
    default:
      return state
  }
}