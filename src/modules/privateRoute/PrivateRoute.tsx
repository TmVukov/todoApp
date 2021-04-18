import { FC } from 'react';
import { Route, RouteProps, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../store/Auth/authSlice';

interface PrivateRouteProps extends RouteProps {
  component: any;
}

const PrivateRoute: FC<PrivateRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const user = useSelector(selectUser) as any;

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <Component {...props} /> : <Redirect to="/signup" />
      }
    />
  );
};

export default PrivateRoute;
