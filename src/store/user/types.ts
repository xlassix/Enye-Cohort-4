interface LooseState {
  [key: string]: any
}

export interface UserState {
  logged_in:boolean,
  email:string
}

export const UPDATE_USER_STATE = 'UPDATE_USER_STATE'

interface UpdateUserStateAction {
  type: typeof UPDATE_USER_STATE
  payload: LooseState
}

export type UserActionTypes = UpdateUserStateAction