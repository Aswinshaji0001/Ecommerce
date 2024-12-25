import React from 'react'
import '../Email/Email.scss'

const Email = () => {
  return (
    <div>
        <div className="cards">
            <div className="card">
                <div className="image">
                    <img src="email2.jpg" alt="" />
                </div>
                <div className="content">
                <h1>Email Verification</h1>
                    <form action="">
                        <input type="email" name="email" id='email'/>
                        <button className='button-24'>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Email
