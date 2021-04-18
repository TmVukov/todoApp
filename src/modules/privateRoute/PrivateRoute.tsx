import { FC, useState, useEffect } from 'react';
import { auth } from '../firebase/config';
import { Route, RouteProps, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, selectUser } from '../store/Auth/authSlice';
import Loader from '../loader/Loader';

interface PrivateRouteProps extends RouteProps {
  component: any; 
}

const PrivateRoute: FC<PrivateRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const [loading, setLoading] = useState<boolean>(true);

  const dispatch = useDispatch();
  const user = useSelector(selectUser) as any;
  //console.log(user);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
          }),
        );
      }
      setLoading(false); 
    });

    return unsubscribe;
  }, [dispatch]);

  if (loading) return <Loader />;

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
