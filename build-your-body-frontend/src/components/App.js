import '../App.css';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { withAuth0 } from '@auth0/auth0-react';
import LogoutButton from './LogoutButton'
import Login from "./Login.js";
import Profile from './Profile.js';
// import Header from './Header.js';

class App extends React.Component {
  render() {
    return (
      <div>
        <Router>

          {/* <Header /> */}
          <Switch>
            <Route exact path="/">
              {!this.props.auth0.isAuthenticated &&
                <Login />}
              {this.props.auth0.isAuthenticated &&
                <LogoutButton />}
            </Route>

            <Route exact path='/profile'>
              {this.props.auth0.isAuthenticated &&
                <Profile />}
            </Route>
          </Switch>
          {/* <Footer /> */}
        </Router>
      </div>
    )
  }
}

export default withAuth0(App);
