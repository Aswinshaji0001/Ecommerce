import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../Home/Home.scss';
const Home = ({setUser,setLogin}) => {
  const navigate = useNavigate();
  const [products,setProducts]=useState([]);
  const value = localStorage.getItem('Auth');
  useEffect(()=>{
    getUser();
    getAllProducts();
  },[])
  const getUser=async()=>{
    if(value){
      const res = await axios.get("http://localhost:3000/api/home",{headers:{"Authorization":`Bearer ${value}`}})
    if(res.status==200){
      console.log(res);
      alert("Successfully Login")
      setUser(res.data.username);
      setLogin(res.data.accounttype);
    }
    else{
      alert("failed")
      navigate("/login")
    }
  }
  else{
    navigate("/login")
  }
    
  }
  const getAllProducts = async()=>{
      const res = await axios.get("http://localhost:3000/api/getallproducts",{headers:{"Authorization":`Bearer ${value}`}})
      if(res.status==201){
          console.log(res);
          setProducts(res.data)
      }
      else{
        alert("error")
      }
  }  
  console.log(products);
  
  return (
    <div className='home'>
      <h1 style={{margin:"auto"}}>DATAS</h1>
      <div className="center">
        <div className="acard">
        {products.map((product,index)=>(
          <div className="acards">
            <div className="imxs">
            <img src={product.pimages[0]} alt="" />
            </div>
            <div className="contents">
            <h2>{product.pname}</h2><hr />
            <h2>{product.price}</h2><hr />
            <h2>{product.category}</h2><hr />
            </div>
          </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
