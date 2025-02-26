import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../Orders/Orders.scss'; // Ensure to add appropriate styles in this file
import { FiMinus, FiPlus } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const Orders = ({ setUser, setLogin }) => {
  const value = localStorage.getItem('Auth');
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [addresses, setAddresses] = useState([]); // State for addresses
  const navigate =useNavigate();
  const [selectedAddress, setSelectedAddress] = useState(''); // State for selected address

console.log(selectedAddress);

  useEffect(() => {
    getProductDetails();
    getDetails();
    getAddresses(); // Fetch addresses on component mount
  }, [id, setUser, setLogin, value]);

  const getProductDetails = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/getorder/${id}`);
      setProduct(res.data);
      setQuantity(res.data.quantity); // Initial quantity of the product
    } catch (error) {
      console.error('Error fetching product details:', error);
      alert('Failed to fetch product details');
    }
  };
console.log(product);

  const getDetails = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/seller', {
        headers: { 'Authorization': `Bearer ${value}` },
      });
      if (res.status === 201) { // Fixed status code to 200 for successful fetch
        setUser(res.data.username);
        setLogin(res.data.accounttype);
      } else {
        alert('Error fetching seller details');
      }
    } catch (error) {
      console.error('Error fetching seller details', error);
      alert('Failed to fetch seller details');
    }
  };

  const getAddresses = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/getaddress', {
        headers: { 'Authorization': `Bearer ${value}` },
      });
      console.log('Fetched Addresses:', res.data); // Log the full response to check structure
      if (res.status === 201) { // Fixed status code to 200 for successful fetch
        // Assuming the structure is { address: [{_id, details}, ...] }
        setAddresses(res.data.address || []);
        console.log(res.data.address); // Verify the addresses format
      } else {
        alert('Error fetching addresses');
      }
    } catch (error) {
      console.error('Error fetching addresses', error);
      alert('Failed to fetch addresses');
    }
  };

  const handleQuantityChange = async (id, type) => {
    setQuantity((prevQuantity) => {
      const updatedQuantity = type === 'increase' ? prevQuantity ++ : Math.max(prevQuantity --, 0); // Ensure quantity doesn't go below 0

      // Make the API call to update the quantity
      axios.post(
        'http://localhost:3000/api/editquantity',
        { id, quantity: updatedQuantity, type },
        { headers: { "Authorization": `Bearer ${value}` } }
      ).then(({ status }) => {
        if (status === 201) {  // Fixed status code to 200 for successful update
          getProductDetails(); // Refresh product details
        }
      }).catch(error => {
        console.error('Error updating quantity:', error);
        alert('Failed to update quantity');
      });

      return updatedQuantity; // Return the updated quantity
    });
  };

  // Calculate the price with discount or delivery charge
  const calculatePrice = () => {
    let price = product.price * quantity;
    if (quantity > 2) {
      price = price * 0.8; // Apply 20% discount
    }
    return price;
  };

  // Calculate delivery charge ( if applicable)
  const calculateDeliveryCharge = () => {
    return quantity <= 2 ? 40 : 0; // ₹40 delivery charge if quantity is 2 or less
  };
  
  const buyProduct = async () => {
    try {
      // Add the product to the orders
      const orderResponse = await axios.post(
        'http://localhost:3000/api/addorder', 
        {
          productId: product.productId,
          quantity,
          sizee:product.size,
          housename: selectedAddress,
          totalPrice: calculatePrice() + calculateDeliveryCharge(), 
        },
        { headers: { 'Authorization': `Bearer ${value}` } }
      );
  
      if (orderResponse.status === 201) {
        alert("Success")
  
        console.log('Product added to orders:', orderResponse.data);
        navigate("/final")
      } else {
        alert('Error placing order.');
      }
    } catch (error) {
      alert('Product Out of Stock');
    }
  };

  return (
    <div className="order-page">
      {product ? (
        <div className="product-details">
          <div className="product-left">
            {/* Left side: Product details */}
            <div className="product-image-section">
              <img src={product.pimages[0]} alt="Product" className="product-image" />
            </div>
            <div className="product-info">
              <h2 className="product-name">{product.pname}</h2>
              <p className="product-brand">Brand: {product.brand}</p>
              <div className="quantity-selection">
                <h5>Quantity</h5>
                <div className="quantity">
                  <span
                    className="decrease"
                    onClick={() => handleQuantityChange(product._id, 'decrease')}
                  >
                    <FiMinus size={24} />
                  </span>
                  <span className="quantity-text">{quantity}</span>
                  <span
                    className="increase"
                    onClick={() => handleQuantityChange(product._id, 'increase')}
                  >
                    <FiPlus size={24} />
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="product-right">
            <div className="ms">

            <div className="maindiv">
            <div className='div1'>{quantity <= 2 && (
              <p className="delivery-charge">
                Delivery Charge: 
              </p>
            )}</div>
            <div>{quantity <= 2 && (
            <h3>₹40</h3>
          )}</div>
            </div>
            <div className="maindiv2">

           
            <div className="div2">
              <p>Offer: </p>
              </div>
              <div>
              <h3>20% Applied</h3>
              </div>
              </div>
            
            <div className="maindiv2">
              <div>

              
            <p>Coupons </p>
            </div>
            <div>
            <h3>Applied </h3>
            </div>
            </div>
            <div className="maindiv2">
              <div>
            <p>
            Price:
            </p>
            </div>
            <div>
            <h3>
               ₹{calculatePrice()}
            </h3>
            </div>
            </div>
            </div>


            <div className="address-selection">
              <h3>Select Delivery Address</h3>
              {addresses && addresses.length > 0 ? (
                addresses.map((address) => (
                  <div key={address.housename} className="address-option">
                    <input
                      type="radio"
                      id={address.housename}  // Ensure you use the correct identifier
                      name="address"
                      value={address.housename}
                      checked={selectedAddress === address.housename}
                      onChange={() => setSelectedAddress(address.housename)}
                    />
                    <label htmlFor={address.housename}>{address.housename}</label>  {/* Access the correct property */}

                  </div>
                ))
              ) : (
                <p>No addresses available.</p>
              )}
            </div>

            <button className="add-to-cart-btn" onClick={buyProduct}>
              Proceed to BUY
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
