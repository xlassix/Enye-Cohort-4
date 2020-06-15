import React from 'react';
import SearchComponent from "./components/search"
import Map from "./components/map"
import 'antd/dist/antd.css';
import './css/App.css';
import LoginForm from "./components/accounts/loginForm"
import SignUpForm from "./components/accounts/signUpForm"
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
 

 
import * as ROUTES from './routes/all'


function App() {
  return (
    <div className="App">
      {/* <div className="App__search perfect_scroll">
        <SignUpForm />
        <SearchComponent />  
      </div>
      <div className="App__map">
        <Map />
      </div> */}
        <Router>
        <Route  exact path={ROUTES.LANDING} component={SearchComponent} />
        <Route path={ROUTES.SIGN_UP} component={SignUpForm} />
        <Route path={ROUTES.SIGN_IN} component={LoginForm} />

      <hr />

      <div className="App__map">
        <Map />
      </div>
  </Router>
    </div>
  );
}

export default App;
