import {StoreState, UPDATE_RESULTS,CLEAR_RESULTS, DataActionTypes } from './types'

export interface LooseState {
  [key: string]: any
}

// Initial state
const initialState: StoreState = {
    results_loc:[],
    markers_loc:[]
  }
  
// Reducer Function
export function searchReducer(
  state = initialState,
  action: DataActionTypes
): StoreState {
  switch (action.type) {
    case UPDATE_RESULTS: {
      return {
        results_loc:[...state.results_loc, ...action.payload.results_loc],
        markers_loc: [...state.markers_loc, ...action.payload.markers_loc]
      }
    }
    case CLEAR_RESULTS: {
      return {
        results_loc:[],
        markers_loc: []
      }
    }
    default:
      return state
  }
}