import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { searchReducer} from './store/data/reducer'
import {userReducer} from './store/user/reducer'
import {Provider} from 'react-redux'
import { createStore,combineReducers } from 'redux'
import {loadState,saveState} from "./localstorage"

const rootReducer = combineReducers({
  search: searchReducer,
  user:userReducer
})
const persistedState =loadState()
const store = createStore(rootReducer,persistedState)

store.subscribe(()=>{
   saveState({
     user: store.getState().user
   })
})

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
