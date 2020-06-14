import {HistoryState, UPDATE_HISTORY, HistoryActionTypes } from './types'

export function updateHistory(newObject: HistoryState): HistoryActionTypes {
  return {
    type: UPDATE_HISTORY,
    payload: newObject
  }
}