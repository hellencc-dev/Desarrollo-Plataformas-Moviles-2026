import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { isLogged } from "../storage/authStorage";

type Props = RouteProps & { children: React.ReactNode };

export default function PrivateRoute({ children, ...rest }: Props) {
  return (
    <Route {...rest}>
      {isLogged() ? children : <Redirect to="/login" />}
    </Route>
  );
}