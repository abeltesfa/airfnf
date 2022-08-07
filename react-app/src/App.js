import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { authenticate } from './store/session';
import HomePage from './components/HomePage';
import CreateCar from './components/CreateCar';
import CarDetails from './components/CarDetails';
import CarEdit from './components/CarEdit';
import UserPage from './components/UserPage';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar sessionUser={sessionUser}/>
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/cars/new' exact={true} >
          <CreateCar />
        </ProtectedRoute>
        <ProtectedRoute path='/cars/:carId' exact={true} >
          <CarDetails />
        </ProtectedRoute>
        <ProtectedRoute path='/cars/:carId/edit' exact={true} >
          <CarEdit />
        </ProtectedRoute>
        <ProtectedRoute path='/:username' exact={true} >
          <UserPage sessionUser={sessionUser} />
        </ProtectedRoute>
        <ProtectedRoute path='/' exact={true} >
          <HomePage />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
