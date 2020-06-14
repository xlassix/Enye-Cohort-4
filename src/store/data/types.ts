export interface LooseState {
    [key: string]: any
  }
export interface StoreState {
  results_loc: LooseState[],
  markers_loc: LooseState[]

}
export const UPDATE_RESULTS = 'UPDATE_RESULTS'
export const CLEAR_RESULTS = 'CLEAR_RESULTS'

interface UpdateStoreActions {
  type: typeof UPDATE_RESULTS
  payload: StoreState
}

interface ClearStoreActions {
  type: typeof CLEAR_RESULTS
}

export type DataActionTypes = UpdateStoreActions|ClearStoreActions