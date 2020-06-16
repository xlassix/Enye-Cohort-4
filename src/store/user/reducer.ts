import { UserState, UPDATE_USER_STATE, RESET_USER } from './types'

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
        histories: action.payload.histories
      }
    }
    case RESET_USER: {
      return initialState
    }
    default:
      return state
  }

}