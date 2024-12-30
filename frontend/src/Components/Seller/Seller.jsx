import React, { useEffect, useState } from 'react';
import '../Seller/Seller.scss';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Seller = ({ setUser, setLogin }) => {
  const [data, getData] = useState({});
  const [seller, getSeller] = useState([]);
  const [product,getProduct] = useState([{
    _id:""
  }]);
  const [categories, setCategories] = useState([]); 
  const value = localStorage.getItem('Auth');

  useEffect(() => {
    getDetails();
    getSellerD();
    getCategory();
    getProducts();
  }, []);

  const getDetails = async () => {
    const res = await axios.get("http://localhost:3000/api/seller", { headers: { "Authorization": `Bearer ${value}` } });
    if (res.status === 201) {
      getData(res.data.seller);
      setUser(res.data.username);
      setLogin(res.data.accounttype);
 
    } else {
      alert("error");
    }
  };

  const getSellerD = async () => {
    const res = await axios.get("http://localhost:3000/api/getseller", { headers: { "Authorization": `Bearer ${value}` } });
    if (res.status === 201) {
      getSeller(res.data);
    } else {
      alert("error");
    }
  };

  const getCategory = async () => {
    const res = await axios.get("http://localhost:3000/api/getcat", { headers: { "Authorization": `Bearer ${value}` } });
    if (res.status === 201) {
      setCategories(res.data.category); // Assuming this response contains categories
    } else {
      alert("error");
    }
  };
  const getProducts = async () =>{
    const res = await axios.get("http://localhost:3000/api/getproducts", { headers: { "Authorization": `Bearer ${value}` } });
    if(res.status==201){
      getProduct(res.data)
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
            <button className='button-24'>Delete</button>
            <Link to="/editseller"><button className='button-24'>Edit</button></Link>
          </div>
        </div>

        <div className="right">
          <div className="products">
            <h1>All Categories</h1>
            <div className="add-product-section">
              <Link to="/addproduct"><button className='button-24'>Add Product</button></Link>
              <div className="catm">
              {categories.map((cat, index) => (

                <div className="cat">
                    <div key={index}>
                      <Link to={`/catprod/${cat}`}><h1>{cat}</h1></Link>
                    </div>
             
                </div>
                 ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Seller;
