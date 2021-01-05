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
import PrivateRoute from "./auth/PrivateRoute";
export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <MainPage />
        </Route>
        <PrivateRoute exact path="/admin">
          <Admin />
        </PrivateRoute>
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