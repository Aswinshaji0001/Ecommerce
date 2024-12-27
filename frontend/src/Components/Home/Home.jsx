import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';




const Home = () => {
  const navigate = useNavigate();
  const value = localStorage.getItem('Auth');
  const [name,username]=useState("")
  useEffect(()=>{
    getUser();
  },[])
  const getUser=async()=>{
    if(value){
      const res = await axios.get("http://localhost:3000/api/home",{headers:{"Authorization":`Bearer ${value}`}})
    if(res.status==200){
      alert("successs")
      username(res.data.username);
    }
    else{
      alert("failed")
    }
  }
  else{
    navigate("/login")
  }
    
  }
    
  return (
    <div>
      <h1>HAI {name}</h1>
    </div>
  )
}

export default Home
