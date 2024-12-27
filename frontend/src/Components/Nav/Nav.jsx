import React from 'react'
import '../Nav/Nav.scss'

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
                <h2>{login}</h2>
            </div>
        </div>
      </nav>
    </div>
  )
}

export default Nav
