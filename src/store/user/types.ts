export interface LooseState {
  [key: string]: any
}

export interface UserState {
  logged_in?:boolean,
  userId:string,
  histories: Array<object>
}

export const UPDATE_USER_STATE = 'UPDATE_USER_STATE'
export const UPDATE_USER_HISTORY = 'UPDATE_USER_HISTORY'

export interface UpdateUserStateAction {
  type: typeof UPDATE_USER_STATE
  payload: LooseState
}
export interface UpdateUserHistoryAction {
  type: typeof UPDATE_USER_HISTORY
  payload: Array<object>
}

