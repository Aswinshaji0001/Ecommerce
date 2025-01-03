import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../Orders/Orders.scss'; // Ensure to add appropriate styles in this file

const Orders = ({ setUser , setLogin }) => {
  const value = localStorage.getItem('Auth');
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [order, setOrder] = useState({
    XS: 0,
    S: 0,
    M: 0,
    L: 0,
    XL: 0,
    XXL: 0,
    XXXL: 0,
  });

  const { selectedSize } = useParams();  // Size from URL param

  useEffect(() => {
    const getProductDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/getorder/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
        alert('Failed to fetch product details');
      }
    };

    const getDetails = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/seller', {
          headers: { 'Authorization': `Bearer ${value}` },
        });
        if (res.status === 201) {
          setUser (res.data.username);
          setLogin(res.data.accounttype);
        } else {
          alert('Error fetching seller details');
        }
      } catch (error) {
        console.error('Error fetching seller details', error);
        alert('Failed to fetch seller details');
      }
    };

    getProductDetails();
    getDetails();
  }, [id, setUser , setLogin, value]);

  const decrementQuantity = (size) => {
    setOrder((prevOrder) => {
      const newOrder = { ...prevOrder };
      if (newOrder[size] > 0) {
        newOrder[size] -= 1;
      }
      return newOrder;
    });
  };

  const incrementQuantity = (size) => {
    setOrder((prevOrder) => {
      const newOrder = { ...prevOrder };
      // Ensure the quantity does not exceed available stock
      if (newOrder[size] < product.size[size]) {
        newOrder[size] += 1;
      }
      return newOrder;
    });
  };

  return (
    <div className="order-page">
      {product ? (
        <div className="product-details">
          <div className="product-image-section">
            <img src={product.pimages[0]} alt="Product" className="product-image" />
          </div>

          <div className="product-info">
            <h2 className="product-name">{product.pname}</h2>
            <p className="product-brand">Brand: {product.brand}</p>
            <p className="product-price">Price: ₹{product.price}</p>

            <div className="size-selection">
              <h3>Select Size and Quantity</h3>
              <div className="sizes">
                {selectedSize && product.size[selectedSize] !== undefined ? (
                  <div key={selectedSize} className="size-option">
                    <div className="size-details">
                      <span className="size-label">{selectedSize}</span>
                      <p className="size-available">Available: {product.size[selectedSize]}</p>
                    </div>

                    <div className="quantity-control">
                      <button 
                        className="quantity-btn" 
                        onClick={() => decrementQuantity(selectedSize)} 
                        disabled={order[selectedSize] === 0}
                      >
                        -
                      </button>
                      <span className="quantity-display">{order[selectedSize]}</span>
                      <button 
                        className="quantity-btn" 
                        onClick={() => incrementQuantity(selectedSize)} 
                        disabled={order[selectedSize] >= product.size[selectedSize]}
                      >
                        +
                      </button>
                    </div>
                  </div>
                ) : (
                  <p>No size selected or invalid size.</p>
                )}
              </div>
            </div>

            <button className="add-to-cart-btn" onClick={() => alert('Product added to cart!')}>
              Add to Cart
            </button>
          </div>
        </div>
      ) : (
        <p>Loading product details...</p>
      )}
    </div>
  );
};

export default Orders;
