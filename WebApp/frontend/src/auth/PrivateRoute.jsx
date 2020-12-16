import React from "react";
import { Route, Redirect } from "react-router-dom";
import Auth from "./auth";

function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
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
