import React, { useEffect, useState } from 'react';
import '../Product/Product.scss';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const Product = ({ setUser, setLogin }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const value = localStorage.getItem('Auth');
  const [products, getProducts] = useState({});
  const [mainImage, setMainImage] = useState('');
  const [isInCart, setIsInCart] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isInWishlist, setIsInWishlist] = useState(false); // Track wishlist status

  useEffect(() => {
    getDetails();
    getProduct();
  }, [id]);

  // Fetch seller details
  const getDetails = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/seller', {
        headers: { 'Authorization': `Bearer ${value}` },
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

  // Fetch product details
  const getProduct = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/getproducte/${id}`);
      if (res.status === 201) {
        getProducts(res.data);
        setMainImage(res.data.pimages[0]);
        checkIfProductInCart(res.data._id); // Check if the product is in the cart after fetching product details
        checkIfProductInWishlist(res.data._id); // Check if product is in the wishlist
      } else {
        alert('Error fetching product details');
      }
    } catch (error) {
      console.error('Error fetching product details', error);
      alert('Failed to fetch product details');
    }
  };

  // Check if the product is already in the cart
  const checkIfProductInCart = async (productId) => {
    try {
      const res = await axios.get('http://localhost:3000/api/getcart', {
        headers: { 'Authorization': `Bearer ${value}` },
      });
      if (res.status === 201) {
        const productInCart = res.data.some(item => item.productId === productId);
        setIsInCart(productInCart);
      } else {
        alert('Error fetching cart details');
      }
    } catch (error) {
      console.error('Error checking cart for product', error);
      alert('Failed to check cart for product');
    }
  };

  // Check if the product is in the wishlist
  const checkIfProductInWishlist = async (productId) => {
    try {
      const res = await axios.get('http://localhost:3000/api/getwishlist', {
        headers: { 'Authorization': `Bearer ${value}` },
      });
      if (res.status === 201) {
        const productInWishlist = res.data.some(item => item.productId === productId);
        setIsInWishlist(productInWishlist);
      } else {
        alert('Error fetching wishlist details');
      }
    } catch (error) {
      console.error('Error checking wishlist for product', error);
      alert('Failed to check wishlist for product');
    }
  };

  // Handle image thumbnail click to set the main image
  const handleThumbnailClick = (image) => {
    setMainImage(image);
  };

  // Add the product to the cart
  const AddProduct = async () => {
    try {
      const res = await axios.post(
        'http://localhost:3000/api/addtocart',
        { 
          pname: products.pname, 
          price: products.price, 
          pimages: products.pimages, 
          quantity: quantity,
          productId: products._id // Add productId to cart data
        },
        { headers: { 'Authorization': `Bearer ${value}` } }
      );
      if (res.status === 201) {
        setIsInCart(true);
        alert('Product added to cart');
      } else {
        alert('Failed to add product to cart');
      }
    } catch (error) {
      console.error('Error adding product to cart', error);
      alert('Error adding product to cart');
    }
  };

  // Add or remove product from wishlist
  const toggleWishlist = async () => {
    try {
      if (isInWishlist) {
        // Remove from wishlist
        const res = await axios.delete(
          `http://localhost:3000/api/removefromwishlist/${products._id}`,
          { headers: { 'Authorization': `Bearer ${value}` } }
        );
        if (res.status === 201) {
          setIsInWishlist(false);
          alert('Product removed from wishlist');
        }
      } else {
        // Add to wishlist
        const res = await axios.post(
          'http://localhost:3000/api/addtowishlist',
          { productId: products._id ,pname: products.pname,price: products.price, pimages:products.pimages, brand:products.brand},
          { headers: { 'Authorization': `Bearer ${value}` } }
        );
        if (res.status === 201) {
          setIsInWishlist(true);
          alert('Product added to wishlist');
        }
      }
    } catch (error) {
      console.error('Error adding/removing product from wishlist', error);
      alert('Error managing wishlist');
    }
  };

  // Navigate to the cart page
  const goToCart = () => {
    navigate('/cart'); // Navigate to the cart page
  };

  return (
    <div className="product">
      <div className="product-container">
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

        <div className="right">
          <h1 className="title">{products.pname}</h1>
          <div className="brand">Brand: <span>{products.brand}</span></div>
          <div className="price">₹{products.price}</div>
          <div className="description">
            <p>{products.category}, {products.size}</p>
          </div>

          {/* Heart Icon for Wishlist */}
          <div className="wishlist" onClick={toggleWishlist}>
            {isInWishlist ? (
              <span className="heart-filled">❤️</span>
            ) : (
              <span className="heart-empty">🤍</span>
            )}
          </div>

          {/* Button behavior changes depending on isInCart state */}
          <div className="buttons">
            {isInCart ? (
              <button onClick={goToCart} className="go-to-cart">
                Go to Cart
              </button>
            ) : (
              <button onClick={AddProduct} className="add-to-cart">
                Add to Cart
              </button>
            )}
            <button className="buy-now-btn">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
