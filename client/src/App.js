import React, { Fragment, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import Landing from './components/layout/Landing';
// import Navbar from './components/layout/Navbar';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/profile-forms/CreateProfile';
import EditProfile from './components/profile-forms/EditProfile';
import Games from './components/games/Games';
import Game from './components/game/Game';
import Metrics from './components/metrics/Metrics';
import Alert from './components/layout/Alert';
import './App.css';
// Connects Redux
// Provider allows Redux to work with React
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './components/routing/PrivateRoute';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  // Call loadUser Action
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Alert />
          <Switch>
            <Route exact path='/' component={Landing}>
              <Redirect to='/login' component={Login}></Redirect>
            </Route>
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
            <PrivateRoute exact path='/dashboard' component={Dashboard} />
            <PrivateRoute
              exact
              path='/create-profile'
              component={CreateProfile}
            />
            <PrivateRoute exact path='/edit-profile' component={EditProfile} />

            <PrivateRoute exact path='/games' component={Games} />
            <PrivateRoute exact path='/games/:id' component={Game} />
            <PrivateRoute exact path='/metrics' component={Metrics} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
