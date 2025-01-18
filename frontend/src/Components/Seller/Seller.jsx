import React, { useEffect, useState } from 'react';
import '../Seller/Seller.scss';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Seller = ({ setUser, setLogin }) => {
  const [data, getData] = useState({});
  const [seller, getSeller] = useState([]);
  const [product, getProduct] = useState([{ _id: "" }]);
  const [categories, setCategories] = useState([]);
  const value = localStorage.getItem('Auth');

  useEffect(() => {
    getDetails();
    getSellerD();
    getCategory();
    getProducts();
    shipping();
  }, []);

  const getDetails = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/seller", { headers: { "Authorization": `Bearer ${value}` } });
      if (res.status === 201) {
        getData(res.data.seller);
        setUser(res.data.username);
        setLogin(res.data.accounttype);
      } else {
        alert("Error fetching seller details");
      }
    } catch (error) {
      console.error("Error fetching seller details", error);
      alert("Error fetching seller details");
    }
  };

  const getSellerD = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/getseller", { headers: { "Authorization": `Bearer ${value}` } });
      if (res.status === 201) {
        getSeller(res.data);
      } else {
        alert("Error fetching seller data");
      }
    } catch (error) {
      console.error("Error fetching seller data", error);
      alert("Error fetching seller data");
    }
  };

  const getCategory = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/getcat", { headers: { "Authorization": `Bearer ${value}` } });
      if (res.status === 201) {
        console.log(res.data);
        setCategories(res.data.category); // Ensure categories are set only if the data exists
      } else {
        setCategories([]); // Explicitly set to an empty array if no categories are returned
      }
    } catch (error) {
      console.error("Error fetching categories", error);
      setCategories([]); // Handle error by resetting categories to empty
      alert("Error fetching categories");
    }
  };

  const getProducts = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/getproducts", { headers: { "Authorization": `Bearer ${value}` } });
      if (res.status === 201) {
        getProduct(res.data);
      } else {
        alert("Error fetching products");
      }
    } catch (error) {
      console.error("Error fetching products", error);
      alert("Error fetching products");
    }
  };

  const deleteSeller = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:3000/api/deleteseller/${id}`);
      if (res.status === 201) {
        alert("Deleted successfully");
        getDetails();
      } else {
        alert("Failed to delete seller");
      }
    } catch (error) {
      console.error("Error deleting seller", error);
      alert("Failed to delete seller");
    }
  };

  const shipping = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/getshipping", { headers: { "Authorization": `Bearer ${value}` } });
      if (res.status === 201) {
        console.log(res.data);
      } else {
        alert("Failed to fetch shipping details");
      }
    } catch (error) {
      console.error("Error fetching shipping details", error);
      alert("Failed to fetch shipping details");
    }
  };

  return (
    <div className='seller'>
      <div className="main">
        <div className="left">
          <div className="edit">
            <div className="card">
              <div className="card__img">
                <svg width="100%" xmlns="http://www.w3.org/2000/svg">
                  <rect height="450" width="540" fill="#ffffff"></rect>
                  <defs>
                    <linearGradient gradientTransform="rotate(222,648,379)" y2="100%" y1="0" x2="0" x1="0" gradientUnits="userSpaceOnUse" id="a">
                      <stop stopColor="#ffffff" offset="0"></stop>
                      <stop stopColor="#002349" offset="1"></stop>
                    </linearGradient>
                    <pattern viewBox="0 0 1080 900" y="0" x="0" height="250" width="300" id="b" patternUnits="userSpaceOnUse">
                      <g fillOpacity="0.5">
                        <polygon points="90 150 0 300 180 300" fill="#444"></polygon>
                        <polygon points="90 150 180 0 0 0"></polygon>
                      </g>
                    </pattern>
                  </defs>
                  <rect height="100%" width="100%" fill="url(#a)" y="0" x="0"></rect>
                  <rect height="100%" width="100%" fill="url(#b)" y="0" x="0"></rect>
                </svg>
              </div>
              <div className="card__avatar">
                <img
                  src={"/profile.png" || "https://via.placeholder.com/128"}
                  alt="Avatar"
                  className="card__avatar-img"
                />
                <input
                  type="file"
                  id="profile"
                  name="profile"
                  style={{ display: "none" }}
                  accept="image/*"
                />
              </div>
              <form className="card__form">
                <div className="card__input-wrapper">
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={seller.name || ""} // Bind to seller name
                    placeholder="Enter username"
                    required
                  />
                </div>
                <div className="card__input-wrapper">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={seller.location || ""} // Bind to seller location
                    placeholder="Enter location"
                    required
                  />
                </div>
              </form>
              <div className="cardg">
                <button type="submit" className="cardsss" onClick={() => deleteSeller(seller.seller?._id)}>DELETE</button>
                <Link to="/editseller"><button className='cardsss'>EDIT</button></Link>
              </div>
            </div>
          </div>
        </div>

        <div className="right">
          <div className="products">
            <h1>All Categories</h1>
            <Link to="/shipping"><button className='cardsss'>SHIPPING</button></Link>
            <div className="add-product-section">
              <Link to="/addproduct"><button className='button-24'>Add Product</button></Link>
              <div className="catm">
                {categories && categories.length > 0 ? (
                  categories.map((cat, index) => (
                    <div key={index} className="cat">
                      <Link to={`/catprod/${cat}`}><h1>{cat}</h1></Link>
                    </div>
                  ))
                ) : (
                  <p>No categories available</p> // Show this if there are no categories
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Seller;
