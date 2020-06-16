import { UserState, UPDATE_USER_STATE, UPDATE_USER_HISTORY } from './types'

const initialState = {
  logged_in: false,
  userId: "",
  histories:[]
}

//reducer function
export function userReducer(
  state = initialState,
  action: any
): UserState {
  switch (action.type) {
    case UPDATE_USER_STATE: {
      return {
        logged_in: action.payload.logged_in,
        userId: action.payload.userId,
        histories: [...state.histories]
      }
    }
    case UPDATE_USER_HISTORY: {
      return {
        logged_in: state.logged_in,
        userId: state.userId,
        histories: action.payload
      }
    }
    default:
      return state
  }

}