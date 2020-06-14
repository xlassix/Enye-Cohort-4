import {StoreState, UPDATE_RESULTS,CLEAR_RESULTS, DataActionTypes } from './types'

export function updateResults(newObject: StoreState): DataActionTypes {
  return {
    type: UPDATE_RESULTS,
    payload: newObject
  }
}
export function clearResult(): DataActionTypes {
  return {
    type: CLEAR_RESULTS
  }
}