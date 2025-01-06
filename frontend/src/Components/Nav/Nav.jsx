import React, { useState, useRef, useEffect } from 'react';
import '../Nav/Nav.scss';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaHeart, FaClipboardList, FaUser } from 'react-icons/fa'; // Importing the FaUser icon

const Nav = ({ user, login }) => {

  return (
    <div className="navbar">
      <nav>
        <div className="left">
          <Link to="/"><h1 className='bebas-neue-regular'>VOGUE.COM</h1></Link>
        </div>
        <div className="right">
          <div className="profile"> 
            <div className='logo'>
            <Link to="/userd">
              <FaUser size={24} color="white" /> {/* Profile Icon with white color */}
            </Link>
            </div>
            <div className="name">
              <h2>{user}</h2>
            </div>
          </div>
          <div className="im">
            <div className="names">
              <Link to="/cart">
                <FaShoppingCart size={24} color="white" /> {/* Cart Icon with white color */}
              </Link>
            </div>
            <div className="names2">
              <Link to="/wishlist">
                <FaHeart size={24} color="white" /> {/* Wishlist Icon with white color */}
              </Link>
            </div>
            <div className="names3">
              <Link to="/myorders">
                <FaClipboardList size={24} color="white" /> {/* My Orders Icon with white color */}
              </Link>
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
