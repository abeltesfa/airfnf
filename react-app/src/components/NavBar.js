import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import airfnflogo from '../images/airbnb-logo.png'
import "./NavBar.css"
import { login } from '../store/session';
import { useDispatch } from 'react-redux';

const NavBar = ({ sessionUser }) => {
  const email = 'demo@email.com';
  const password = 'password';
  const dispatch = useDispatch();

  const demoLogin = async (e) => {
    await dispatch(login(email, password))
  }
  return (
    <div className='navbar-container'>
      <div className='navbar-left'>
        <NavLink to='/' exact={true} activeClassName='active'>
          <img className='navbar-logo' src={airfnflogo} alt=''></img>
        </NavLink>
      </div>
      <div className='navbar-center'></div>
      <nav className='navbar-right'>
        {!sessionUser ?
          <>
            <button className="navbar-logout" onClick={demoLogin}>Demo Log In</button>
          </>
          :
          <>
            <NavLink to='/cars/new' exact={true} activeClassName='active'>
              Create a Car
            </NavLink>
            <NavLink to={`/${sessionUser?.username}`} exact={true} activeClassName='active'>
              User Profile
            </NavLink>
            <LogoutButton />
          </>
        }
      </nav>
    </div>
  );
}

export default NavBar;
