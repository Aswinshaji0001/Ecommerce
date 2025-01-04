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
        setCategories(res.data.category);
      } else {
        alert("Error fetching categories");
      }
    } catch (error) {
      console.error("Error fetching categories", error);
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
const deleteSeller = async(id)=>{
  const res =await axios.delete(`http://localhost:3000/api/deleteseller/${id}`)
  if(res.status==201){
    alert("Deleted")
    getDetails();
  }
  else{
    alert("Failed")
  }
  
}

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
          </div>
          <div className='buttons'>
            <button className='button-24' onClick={()=>deleteSeller(seller.sellerId)}>Delete</button>
            <Link to="/editseller"><button className='button-24'>Edit</button></Link>
          </div>
        </div>

        <div className="right">
          <div className="products">
            <h1>All Categories</h1>
            <div className="add-product-section">
              <Link to="/addproduct"><button className='button-24'>Add Product</button></Link>
              <div className="catm">
                {categories.length > 0 ? (
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
