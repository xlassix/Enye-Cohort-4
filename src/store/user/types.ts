export interface LooseState {
  [key: string]: any
}

export interface UserState {
  logged_in?:boolean,
  userId:string,
  histories: Array<object>
}

export const UPDATE_USER_STATE = 'UPDATE_USER_STATE'
export const RESET_USER = 'RESET'

 interface UpdateUserStateAction {
  type: typeof UPDATE_USER_STATE
  payload: LooseState
}
 interface RestAction {
  type: typeof RESET_USER
}
export type UserActionTypes = UpdateUserStateAction|RestAction
