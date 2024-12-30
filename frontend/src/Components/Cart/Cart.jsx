import React, { useState } from 'react';
import './Cart.scss';
import { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Cart = ({setUser,setLogin}) => {
    const {id} = useParams();
    const value = localStorage.getItem('Auth');
useEffect(() => {
    getDetails();
  }, []);
  const getDetails = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/seller", {
        headers: { "Authorization": `Bearer ${value}` },
      });
      if (res.status === 201) {
        setUser(res.data.username);
        setLogin(res.data.accounttype);
      } else {
        alert("Error fetching seller details");
      }
    } catch (error) {
      console.error("Error fetching seller details", error);
      alert("Failed to fetch seller details");
    }
  };
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      pname: 'Product 1',
      price: 1000,
      image: 'https://via.placeholder.com/150', // Placeholder image
    },
    {
      id: 2,
      pname: 'Product 2',
      price: 2000,
      image: 'https://via.placeholder.com/150', // Placeholder image
    },
  ]);

  // Handle Proceed to Checkout
  const handleProceedToCheckout = () => {
    alert('Proceeding to checkout...');
    // You can navigate to a checkout page or trigger a checkout flow here
  };

  return (
    <div className="cart">
      <div className="cart-container">
        <h1>Your Cart</h1>
        <div className="cart-items">
          {cartItems.map((item) => (
            <div className="cart-item" key={item.id}>
              <img src={item.image} alt={item.pname} className="cart-item-image" />
              <div className="cart-item-info">
                <h2 className="cart-item-name">{item.pname}</h2>
                <p className="cart-item-price">₹{item.price}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="cart-footer">
          <button className="proceed-btn" onClick={handleProceedToCheckout}>
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
