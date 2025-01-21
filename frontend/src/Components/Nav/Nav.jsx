import React from 'react';
import '../Nav/Nav.scss';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaHeart, FaClipboardList, FaUser,FaSearch } from 'react-icons/fa'; // Importing the FaUser icon

const Nav = ({ user, login }) => {

  return (
    <div className="navbar">
      <nav>
        <div className="left">
          <Link to="/"><h1 className='bebas-neue-regular'>VOGUE.COM</h1></Link>
        </div>
        <div className="right">
          <div className="profile"> 
            {/* Conditionally render user profile only if login is 'seller' */}
            
                
                <div className="name">
                <div className='logo'>
                  <Link to="/userd">
                    <FaUser size={24} color="white" /> {/* Profile Icon with white color */}
                  </Link>
                </div>
                  <h2 className='bebas-neue-regular'>{user}</h2> {/* Show the user's name */}
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
            {login === 'Seller' && (
               <>
            <div className="login">
              <Link to="/seller"><h2>{login}</h2></Link>
            </div>
            </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
