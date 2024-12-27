import React from 'react'
import '../Nav/Nav.scss'
import { Link } from 'react-router-dom';

const Nav = ({user,login}) => {
    console.log(user);
  return (
    <div className='navbar'>
      <nav>
        <div className="left">
            <h1>VOGUE.COM</h1>
        </div>
        <div className="right">
            <div className="profile">
                <img src="profile.png" alt="" />
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
  )
}

export default Nav
