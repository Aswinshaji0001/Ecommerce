import React, { useState, useEffect } from 'react';
import './Cart.scss';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const Cart = ({ setUser, setLogin }) => {
  const { id } = useParams();
  const navigate = useNavigate();  // Use navigate hook for redirection
  const value = localStorage.getItem('Auth');
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    getDetails();
    getAllProducts();
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

  const getAllProducts = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/getcart", {
        headers: { "Authorization": `Bearer ${value}` },
      });
      if (res.status === 201) {
        setCartItems(res.data);
      } else {
        alert("Failed to fetch cart");
      }
    } catch (error) {
      console.error("Error fetching cart items", error);
      alert("Failed to fetch cart");
    }
  };

  // Handle Proceed to Checkout
  const handleProceedToCheckout = () => {
    alert('Proceeding to checkout...');
    // Navigate to checkout page, e.g. '/checkout'
    navigate('/checkout');
  };

  // Handle Buy Now for a single item
  const handleBuyNow = (productId) => {
    // Here you would typically add the product to a checkout session or proceed to checkout directly
    alert(`Proceeding to buy product ${productId} now...`);
    // Redirect to checkout page with the selected product
    navigate(`/checkout/${productId}`);
  };

  return (
    <div className="cart">
      <div className="cart-container">
        <h1>Your Cart</h1>
        <div className="cart-items">
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>  // Show empty cart message if no items
          ) : (
            cartItems.map((item) => (
              <div className="cart-item" key={item._id}>
                {/* Check if pimages is available and has at least one image */}
                <img
                  src={item.pimages && item.pimages.length > 0 ? item.pimages[0] : 'https://via.placeholder.com/150'}
                  alt={item.pname}
                  className="cart-item-image"
                />
                <div className="cart-item-info">
                  <h2 className="cart-item-name">{item.pname}</h2>
                  <p className="cart-item-price">₹{item.price}</p>
                  {/* "Buy Now" Button */}
                  <button className="buy-now-btn" onClick={() => handleBuyNow(item._id)}>
                    Buy Now
                  </button>
                </div>
              </div>
            ))
          )}
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
