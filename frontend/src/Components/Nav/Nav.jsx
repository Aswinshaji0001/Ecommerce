import React, { useState, useRef, useEffect } from 'react';
import '../Nav/Nav.scss';
import { Link } from 'react-router-dom';

const Nav = ({ user, login }) => {

  return (
    <div className="navbar">
      <nav>
        <div className="left">
          <h1 className='bebas-neue-regular'>VOGUE.COM</h1>
        </div>
        <div className="right">
          <div 
            className="profile" 
            
          > 
            <Link to="/userd"><img src="profile.png" alt="Profile"/></Link>
          </div>
          <div className="name">
            <h2>{user}</h2>
          </div>
          <div className="login">
            <Link to="/seller"><h2>{login}</h2></Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
