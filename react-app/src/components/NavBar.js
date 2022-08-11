import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import airfnflogo from '../images/airbnb-logo.png'
import "./NavBar.css"

const NavBar = ({ sessionUser }) => {
  return (
    <div className='navbar-container'>
      <div className='navbar-left'>
        <NavLink to='/' exact={true} activeClassName='active'>
          <img className='navbar-logo' src={airfnflogo}></img>
        </NavLink>
      </div>
      <div className='navbar-center'></div>
      <nav className='navbar-right'>

        <NavLink to='/login' exact={true} activeClassName='active'>
          Login
        </NavLink>
        <NavLink to='/sign-up' exact={true} activeClassName='active'>
          Sign Up
        </NavLink>
        <NavLink to='/cars/new' exact={true} activeClassName='active'>
          Create a Car
        </NavLink>
        <NavLink to={`/${sessionUser?.username}`} exact={true} activeClassName='active'>
          User Profile
        </NavLink>
        <LogoutButton />
      </nav>
    </div>
  );
}

export default NavBar;
