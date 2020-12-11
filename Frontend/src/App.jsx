//React Imports
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import MainPage from "./Mainpage";
import Admin from "./admin/Admin";
import NotFoundPage from "./error/404"
import Login from "./auth/LoginPage";
export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <MainPage />
        </Route>
        <Route exact path="/admin">
          <Admin />
        </Route>
        <Route path="/Login">
          <Login />
        </Route>
        <Route exact path="/404">
          <NotFoundPage />
        </Route>
        <Redirect to="/404" />
      </Switch>
    </Router>
  );
}