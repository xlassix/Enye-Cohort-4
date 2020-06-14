interface LooseState {
  [key: string]: any
}

export interface HistoryState {
  data: LooseState
}

export const UPDATE_HISTORY = 'UPDATE_HISTORY'

interface UpdateHistoryAction {
  type: typeof UPDATE_HISTORY
  payload: LooseState
}

export type HistoryActionTypes = UpdateHistoryAction