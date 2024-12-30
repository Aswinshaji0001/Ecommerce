import React, { useEffect, useState } from 'react';
import '../Product/Product.scss';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Product = ({ setUser, setLogin }) => {
  const { id } = useParams();
  const value = localStorage.getItem('Auth');
  const [products, getProducts] = useState({});
  const [mainImage, setMainImage] = useState('');

  })
  useEffect(() => {
    getDetails();
    getProduct();
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

  const getProduct = async () => {
    const res = await axios.get(`http://localhost:3000/api/getproducte/${id}`);
    if (res.status === 201) {
      getProducts(res.data);
      setMainImage(res.data.pimages[0]); // Set the main image initially
    } else {
      alert("Error fetching product details");
    }
  };

  // Handle thumbnail click to update the main image
  const handleThumbnailClick = (image) => {
    setMainImage(image);
  };
  const AddProduct = async () =>{
    const res = await axios.post("http://loaclhost:3000/api/addtocart",{pname:products.pname,price:products.price},{ headers: { "Content-Type": "application/json" } });
  }

  return (
    <div className="product">
      <div className="product-container">
        {/* Left side with images */}
        <div className="left">
          <div className="main-image">
            <img src={mainImage} alt="Main Product" />
          </div>
          <div className="thumbnail-images">
            {products.pimages && products.pimages.map((image, index) => (
              <img 
                key={index} 
                src={image} 
                alt={`Thumbnail ${index + 1}`} 
                onClick={() => handleThumbnailClick(image)} 
                className="thumbnail"
              />
            ))}
          </div>
        </div>

        {/* Right side with product info */}
        <div className="right">
          <h1 className="title">{products.pname}</h1>
          <div className="brand">Brand: <span>{products.brand}</span></div>
          <div className="price">{products.price}</div>
          <div className="description">
            <p>{products.category}, {products.size}</p>
          </div>
          <div className="buttons">
            <Link to={`/cart/${id}`}><button className="add-to-cart">Add to Cart</button></Link>
            <button className="buy-now">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
