import { FC } from 'react';
import { Route, RouteProps, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../store/Auth/authSlice';

interface PublicRouteProps extends RouteProps {
  component: any;
}

const PublicRoute: FC<PublicRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const user = useSelector(selectUser) as any;

  return (
    <Route
      {...rest}
      render={(props) =>
        !user ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

export default PublicRoute;
