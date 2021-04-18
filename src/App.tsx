import { useState, useEffect, FC } from 'react';
import './App.scss';
import { useDispatch } from 'react-redux'
import { auth } from './modules/firebase/config'
import { setUser } from './modules/store/Auth/authSlice'
import Signup from './modules/pages/signup/Signup';
import Login from './modules/pages/login/Login';
import HomePage from './modules/pages/home/Homepage';
import Details from './modules/pages/details/Details';
import PageNotFound from './modules/pages/404/PageNotFound'
import PrivateRoute from './modules/privateRoute/PrivateRoute';
import PublicRoute from './modules/publicRoute/PublicRoute';
import Loader from './modules/loader/Loader'
import { BrowserRouter, Switch, Route } from 'react-router-dom';

const App: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

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
    <div className="App">
      <BrowserRouter>
        <Switch>
          <PrivateRoute exact path="/" component={HomePage} />
          <PrivateRoute exact path="/task/:id" component={Details} />
          <PublicRoute exact path="/login" component={Login} />
          <PublicRoute exact path="/signup" component={Signup} />
          <Route path='*' component={PageNotFound} exact={true} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;

