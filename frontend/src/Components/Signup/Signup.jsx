import React, { useState } from 'react'
import '../Signup/Signup.scss';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';


const Signup = () => {
const email = localStorage.getItem('email');
const navigate = useNavigate();
const [data,setData]=useState({
    email:email,
    username:"",
    password:"",
    cpassword:""
})
const handleChange=(e)=>{
    console.log(e.target.value);
    setData((pre)=>({...pre,[e.target.name]:e.target.value}))
  }
  const handleSubmit= async(e)=>{
    e.preventDefault();
    console.log(data);
    const res = await axios.post("http://localhost:3000/api/signup",data,{headers:{"Content-Type":"application/json"}});
    console.log(res);
    if(res.status==201){
        alert("Sucess")
        localStorage.removeItem('email')
        navigate("/login")
    }
    else{
        alert("failed")
    }
  }
  return (
    <div>
       <div className="cards">
            <div className="card">
                <div className="image">
                    <img src="email2.jpg" alt="" />
                </div>
                <div className="content">
                <h1>Signup</h1>
                    <form id="signup" onSubmit={handleSubmit}>
                        <input type="text" name="username" id='username' placeholder='Username' onChange={handleChange}/>      
                        <input type="password" name="password" id='password' placeholder='Password' onChange={handleChange}/>
                        <input type="password" name="cpassword" id='cpassword' placeholder='CPassword' onChange={handleChange}/>
                        <button className='button-24'>Sign Up</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Signup
