import React, { useState, useRef, useEffect } from 'react';
import '../Nav/Nav.scss';
import { Link } from 'react-router-dom';

const Nav = ({ user, login }) => {



  return (
    
    <div className="navbar">
      <nav>
        <div className="left">
          <Link to="/"><h1 className='bebas-neue-regular'>VOGUE.COM</h1></Link>
        </div>
        <div className="right">
          <div 
            className="profile" > 
            <Link to="/userd"><img src="/profile.png" alt="Profile"/></Link>
            <div className="name">
            <h2>{user}</h2>
          </div>
          </div>
          <div className="im">
          <div className="names">
          <Link to="/cart"><img src="/shp.png" alt="" /></Link>
          </div>
          <div className="names2">
          <Link to="/wishlist"><img src="/wishlist.png" alt="" /></Link>
          </div>
          <div className="names3">
          <Link to="/myorders"><img src="/checklist.png" alt="" /></Link>
          </div>
          <div className="login">
            <Link to="/seller"><h2>{login}</h2></Link>
          </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
