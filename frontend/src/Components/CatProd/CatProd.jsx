import React, { useEffect, useState } from 'react';
import '../CatProd/CatProd.scss';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const CatProd = ({ setUser, setLogin }) => {
    const { category } = useParams();
    console.log(category);
    const value = localStorage.getItem('Auth');
    const [products, getProducts] = useState([]);
    const [quantities, setQuantities] = useState({});  // State to track product quantities
    const [totalCost, setTotalCost] = useState(0);  // State to track total cost

    useEffect(() => {
        getProduct();
        getDetails();
    }, [category]);

    useEffect(() => {
        calculateTotalCost();  // Recalculate total cost whenever quantities change
    }, [quantities, products]);

    const getProduct = async () => {
        const res = await axios.get(`http://localhost:3000/api/getpcat/${category}`);
        if (res.status === 201) {
            getProducts(res.data);
        } else {
            alert("Error fetching products");
        }
    };

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

    // Function to handle increase/decrease in product quantity
    const changeQuantity = (productId, increment) => {
        setQuantities((prevQuantities) => {
            const currentQuantity = prevQuantities[productId] || 1;  // Default to 1 if no quantity set
            const newQuantity = currentQuantity + increment;

            if (newQuantity >= 1) {  // Prevent quantity from going below 1
                return { ...prevQuantities, [productId]: newQuantity };
            }

            return prevQuantities;  // Return previous state if quantity is less than 1
        });
    };

    // Calculate the total cost of all products in the cart
    const calculateTotalCost = () => {
        let total = 0;
        products.forEach((product) => {
            const productQuantity = quantities[product._id] || 1; // Default to 1 if no quantity set
            total += product.price * productQuantity;
        });
        setTotalCost(total);
    };

    return (
        <div className='catprod'>
            <div className="main">
                <div className="cardz">
                    {products.map((product) => (
                        <div className="cardy" key={product._id}>
                            <h1>Products</h1>
                            <div className="imagesd">
                                <img src={product.pimages[0]} alt={product.pname} />
                            </div>
                            <h2>{product.pname}</h2><hr />
                            <h2>₹{product.price}</h2><hr />
                            <h2>{product.brand}</h2><hr />

                            <div className="quantity-controls">
                                <button
                                    className="quantity-button"
                                    onClick={() => changeQuantity(product._id, -1)}
                                >
                                    -
                                </button>
                                <span>{quantities[product._id] || 1}</span>
                                <button
                                    className="quantity-button"
                                    onClick={() => changeQuantity(product._id, 1)}
                                >
                                    +
                                </button>
                            </div>

                            <div className="buttons">
                                <Link to={`/editproduct/${product._id}`}><button className='button-3'>Edit</button></Link>
                                <button className='button-4'>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="total-cost">
                <h3>Total Cost: ₹{totalCost}</h3>
            </div>
        </div>
    );
};

export default CatProd;
