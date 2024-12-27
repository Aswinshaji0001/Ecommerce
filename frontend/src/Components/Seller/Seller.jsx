import React, { useEffect, useState } from 'react'
import '../Seller/Seller.scss'
import axios from 'axios'
import { Link } from 'react-router-dom'
const Seller = ({setUser,setLogin}) => {
    const [data,getData]=useState({})
    const [seller,getSeller]=useState([])
    const value = localStorage.getItem('Auth');
    useEffect(()=>{
        getDetails();
        getSellerD();
    },[])
    const getDetails = async()=>{
        const res = await axios.get("http://localhost:3000/api/seller", { headers: { "Authorization": `Bearer ${value}` } })
        if(res.status==201){
            getData(res.data.seller);
            setUser(res.data.username);
            setLogin(res.data.accounttype);  
        }
        else{
            alert("error")
        }
    }
const getSellerD = async()=>{
    const res = await axios.get("http://localhost:3000/api/getseller",{ headers: { "Authorization": `Bearer ${value}` } })
    console.log(res);
    if(res.status==201){
        getSeller(res.data)
    }
    else{
        alert("error")
    }
    
}
console.log(seller);

  return (
    <div className='seller'>
      <div className="main">
        <div className="left">
            <div className="image">
                <img src="profile.png" alt="" />
            </div>
            <div className="content">
                <h2>{seller.name}</h2>
                <h2>{seller.location}</h2>
                <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit. In ipsam nemo quasi et quod praesentium, blanditiis dolore minus dolores, molestiae, eligendi provident voluptas obcaecati iure aliquid. Ad, quibusdam ex. Enim.</h3>
            </div>
            <div className='buttons'>
                <button className='button-3'>Delete</button>
                <Link to="/editseller"><button className='button-3'>Edit</button></Link>
            </div>
        </div>
        <div className="right">
            <div className="products">
                <h1>All Categories</h1>
                <button className='button-9'>Add Product</button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Seller