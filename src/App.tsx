import React from 'react';
import SearchComponent from "./components/search"
import Map from "./components/map"
import 'antd/dist/antd.css';
import './css/App.css';
import LoginForm from "./components/accounts/loginForm"
import SignUpForm from "./components/accounts/signUpForm"
import {LogOut } from "./components/accounts/logout"
import { ApolloProvider } from '@apollo/react-hooks';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import * as ROUTES from './routes/all'

//initialise Apollo client
const client = new ApolloClient({
  uri: 'https://us-central1-clear-practice-251418.cloudfunctions.net/api/',
});



function App() {
  return (
    <div className="App">
      <Router>
        <ApolloProvider client={client}>
          <Route exact path={ROUTES.LANDING} component={SearchComponent} />
        </ApolloProvider>
        <Route path={ROUTES.SIGN_UP} component={SignUpForm} />
        <Route path={ROUTES.SIGN_IN} component={LoginForm} />
        <Route path={ROUTES.SIGN_OUT} component={ LogOut } />

        <hr />

        <div className="App__map">
          <Map />
        </div>
      </Router>
    </div>
  );
}

export default App;
