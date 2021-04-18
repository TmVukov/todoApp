import { FC } from 'react';
import './App.scss';
import Signup from './modules/pages/signup/Signup';
import Login from './modules/pages/login/Login';
import HomePage from './modules/pages/home/Homepage';
import Details from './modules/pages/details/Details';
import PrivateRoute from './modules/privateRoute/PrivateRoute';
import PublicRoute from './modules/publicRoute/PublicRoute';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

const App: FC = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <PrivateRoute exact path="/" component={HomePage} />
          <PrivateRoute exact path="/task/:id" component={Details} />
          <PublicRoute exact path="/login" component={Login} />
          <PublicRoute exact path="/signup" component={Signup} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;

