//Import
import React from "react";
import { Route, Redirect } from "react-router-dom";
import Auth from "./auth";

//Private Route
export default function PrivateRoute({ children }) {
  //Je nach dem ob der User sich eingeloggt hat kann wird entweder zu der Page weitergeleitet oder zu Login falls nicht
  return (
    <Route
      render={({ location }) =>
        Auth.isAuthenticated ? (
          children
        ) : (
            <Redirect
              to={{
                pathname: "/Login",
                state: { from: location },
              }}
            />
          )
      }
    />
  );
}
