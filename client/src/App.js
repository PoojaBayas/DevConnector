import React from "react";
import { Provider } from "react-redux";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Footer from "./components/layout/Footer";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

import { Component } from "react";
import setAuthToken from "./utils/setAuthToken";
import jwt_decode from 'jwt-decode';
import { SET_CURRENT_USER } from "./action/types";
import store from "./store";

if (localStorage.jwtToken) {
  //decode the token
  const decoded = jwt_decode(localStorage.jwtToken)

  //check for expiry of token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    //LogOut the user 
    store.dispatch(logoutUser());
    //Redirect the user to login page
    window.location.href = '/login';
  }

   //set auth header
  setAuthToken(localStorage.jwtToken)
  
  //set dispatch call
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: decoded
  })
}



class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />\
          <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
