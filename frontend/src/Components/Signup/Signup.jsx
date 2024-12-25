import React from 'react'
import '../Signup/Signup.scss';

const Signup = () => {
  return (
    <div>
       <div className="cards">
            <div className="card">
                <div className="image">
                    <img src="email2.jpg" alt="" />
                </div>
                <div className="content">
                <h1>Signup</h1>
                    <form action="">
                        <input type="email" name="email" id='email' placeholder='Email'/>      
                        <input type="password" name="password" id='password' placeholder='Password'/>
                        <input type="password" name="password" id='cpassword' placeholder='CPassword'/>
                        <button className='button-24'>Sign Up</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Signup
