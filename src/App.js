import React, { Component } from "react";
import { BrowserRouter as Router,  NavLink } from "react-router-dom";
import Route from "react-router-dom/Route";
import SignUpForm from "./pages/SignUp";
import SignInForm from "./pages/SignIn";
import Home from './pages/Home'
import Profile from './pages/Profile'
import "./App.css";
import { Switch } from "@material-ui/core";
import ProductView from "./pages/ProductView";
import Products from "./pages/Products";
class App extends Component {
  render() {
    return (
      <Router basename="/">
        <div className="App">

          <Route exact path='/' component={() => <Home style={{border:"solid red 5px"}}/>} />

          <Route  exact path="/login/" component={SignUpForm}/>
          
          <Route exact path="/login/sign-in" component={SignInForm} />

          <Route  exact path="/profile" component={Profile} />

          <Route exact path="/product" component={ProductView}/>  

          <Route exact path="/personal/products" component={Products}/>
        </div>
      </Router>
      
      
    );
  }
}

export default App;