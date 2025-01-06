import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import '../Home/Home.scss';

const Home = ({ setUser, setLogin }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const value = localStorage.getItem('Auth');

  useEffect(() => {
    getUser();
    getAllProducts();
  }, [])

  const getUser = async () => {
    if (value) {
      const res = await axios.get("http://localhost:3000/api/home", { headers: { "Authorization": `Bearer ${value}` } })
      if (res.status === 200) {
        alert("Successfully Logged In");
        setUser(res.data.username);
        setLogin(res.data.accounttype);
      } else {
        alert("Login failed");
        navigate("/login");
      }
    }
    else {
      navigate("/login");
    }
  }

  const getAllProducts = async () => {
    const res = await axios.get("http://localhost:3000/api/getallproducts", { headers: { "Authorization": `Bearer ${value}` } })
    if (res.status === 201) {
      console.log(res);
      setProducts(res.data);
    } else {
      alert("Error fetching products");
    }
  }

  return (
    <div className='home'>
      <div className="product-container">
        {products.map((product, index) => (
          <Link key={index} to={`/product/${product._id}`} className="product-card">
            <div className="product-image">
              <img src={product.pimages[0]} alt={product.pname} />
            </div>
            <div className="product-details">
              <h2 className="product-name">{product.pname}</h2>
              <p className="product-price">₹{product.price}</p>
              <p className="product-category">{product.category}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Home;
