import { Redirect, Route, RouteProps } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

type Props = RouteProps & {
  children: React.ReactNode;
};

export default function PrivateRoute({ children, ...rest }: Props) {
  const { user, loading } = useAuthContext();

  if (loading) return null;

  return (
    <Route
      {...rest}
      render={() => (user ? children : <Redirect to="/login" />)}
    />
  );
}