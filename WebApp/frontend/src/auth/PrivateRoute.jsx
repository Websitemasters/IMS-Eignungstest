import React from "react";
import { Route, Redirect } from "react-router-dom";
import Auth from "./auth";

function PrivateRoute({ children }) {
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

export default PrivateRoute;
