import React, { useEffect, useState } from 'react';
import '../CatProd/CatProd.scss';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const CatProd = ({ setUser, setLogin }) => {
  const { category } = useParams();
  const value = localStorage.getItem('Auth');
  const [products, getProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    getProduct();
    getDetails();
  }, [category]);

  useEffect(() => {
    calculateTotalCost();
  }, [quantities, products]);

  const getProduct = async () => {
    const res = await axios.get(`http://localhost:3000/api/getpcat/${category}`, {
      headers: { Authorization: `Bearer ${value}` },
    });
    if (res.status === 201) {
      getProducts(res.data);
    } else {
      alert('Error fetching products');
    }
  };

  const getDetails = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/seller', {
        headers: { Authorization: `Bearer ${value}` },
      });
      if (res.status === 201) {
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

  const changeQuantity = (productId, increment) => {
    setQuantities((prevQuantities) => {
      const currentQuantity = prevQuantities[productId] || 1;
      const newQuantity = currentQuantity + increment;

      if (newQuantity >= 1) {
        return { ...prevQuantities, [productId]: newQuantity };
      }

      return prevQuantities;
    });
  };

  const calculateTotalCost = () => {
    let total = 0;
    products.forEach((product) => {
      const productQuantity = quantities[product._id] || 1;
      total += product.price * productQuantity;
    });
    setTotalCost(total);
  };

  const deleteProduct = async (id) => {
    const res = await axios.delete(`http://localhost:3000/api/deletep/${id}`);
    if (res.status === 201) {
      alert('Deleted');
      getProduct();
    } else {
      alert('Failed');
    }
  };

  return (
    <div className="catprod">
      <div className="main">
        <div className="header">
          <h1>Category: {category}</h1>
          <h3>Total Cost: ₹{totalCost}</h3>
        </div>
        <div className="cardz">
          {products.map((product) => (
            <div className="cardy" key={product._id}>
              <Link to={`/product/${product._id}`}>
                <div className="imagesd">
                  <img src={product.pimages[0]} alt={product.pname} />
                </div>
              </Link>
              <div className="info">
                <h2>{product.pname}</h2>
                <h3>₹{product.price}</h3>
                <p>{product.brand}</p>
              </div>
              <div className="buttons">
                <Link to={`/editproduct/${product._id}`}>
                  <button className="button-3">Edit</button>
                </Link>
                <button className="button-4" onClick={() => deleteProduct(product._id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CatProd;
