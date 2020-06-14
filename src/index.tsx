import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { historyReducer } from './store/history/reducer'
import { searchReducer} from './store/data/reducer'
import {Provider} from 'react-redux'
import { createStore,combineReducers } from 'redux'

const rootReducer = combineReducers({
  history: historyReducer,
  search: searchReducer
})

const store = createStore(rootReducer)

export type RootState = ReturnType<typeof rootReducer>

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
