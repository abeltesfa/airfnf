import React, { useState, useEffect } from 'react';
import { BrowserRouter, NavLink, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import LoginForm from './components/auth/LoginForm';
// import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { authenticate } from './store/session';
import HomePage from './components/HomePage';
import CreateCar from './components/CreateCar';
import CarDetails from './components/CarDetails';
import CarEdit from './components/CarEdit';
import UserPage from './components/UserPage';
import About from './components/About';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar sessionUser={sessionUser} />
      <Switch>
        <Route path='/about' exact={true}>
          <About />
        </Route>
        <ProtectedRoute path='/cars/new' exact={true} >
          <CreateCar />
        </ProtectedRoute>
        <Route path='/cars/:carId' exact={true} >
          <CarDetails sessionUser={sessionUser} />
        </Route>
        <ProtectedRoute path='/cars/:carId/edit' exact={true} >
          <CarEdit />
        </ProtectedRoute>
        <ProtectedRoute path={`/${sessionUser?.username}`} exact={true} >
          <UserPage sessionUser={sessionUser} />
        </ProtectedRoute>
        <Route path='/' exact={true} >
          <HomePage sessionUser={sessionUser} />
        </Route>
        <Route>
          <div className='error404'>
            <h1>Page not found. Click <NavLink to={'/'}>Here</NavLink> to go home</h1>
          </div>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
