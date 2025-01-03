import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './MyOrders.scss';

const MyOrders = ({ setUser, setLogin }) => {
    const [orders, setOrders] = useState([]);
    const [orderDetails, setOrderDetails] = useState([]);  // Storing the order details (quantity, totalPrice, etc.)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const value = localStorage.getItem('Auth');

    useEffect(() => {
        getData();
        getDetails();
    }, []);

    const getData = async () => {
        try {
            const res = await axios.get('http://localhost:3000/api/getorders', {
                headers: { 'Authorization': `Bearer ${value}` },
            });

            if (res.status === 201) {
                setOrders(res.data.products); // Setting product details in orders
                setOrderDetails(res.data.order); // Setting order details (quantity, totalPrice, etc.)
                setLoading(false);
            } else {
                setError('Failed to fetch orders');
                setLoading(false);
            }
        } catch (err) {
            setError('Error fetching orders');
            setLoading(false);
            console.error(err);
        }
    };

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

    // Function to get order details (quantity, totalPrice) for each product
    const getOrderDetailsForProduct = (orderId) => {
        // Find the corresponding order details from the `orderDetails` array
        return orderDetails.find((od) => od.orderId === orderId);
    };

    return (
        <div className="my-orders">

            {/* Display Loading */}
            {loading && <p className="loading">Loading orders...</p>}

            {/* Display Error */}
            {error && <p className="error">{error}</p>}

            {/* Display Orders if available */}
            {!loading && !error && orders.length > 0 ? (
                <div className="orders-container">
                    {orders.map((order) => {
                        // Get the corresponding details for this order from `orderDetails`
                        const orderDetail = getOrderDetailsForProduct(order.id);
                        return (
                            <div className="order-item" key={order.id}>
                                <div className="order-image">
                                    <img src={order.pimages[0]} alt={order.pname} />
                                </div>
                                <div className="order-info">
                                    <h3>{order.pname}</h3>
                                    <p className="brand">Brand: {order.brand}</p>
                                    <p className="price">Price: ₹{order.price}</p>

                                    {/* Display quantity and totalPrice from `orderDetails` if available */}
                                    {orderDetail ? (
                                        <>
                                            <p className="quantity">Quantity: {orderDetail.quantity}</p>
                                            <p className="total-price">Total: ₹{orderDetail.totalPrice}</p>
                                        </>
                                    ) : (
                                        <p className="error">Details not available</p>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                !loading && <p>No orders found.</p>
            )}
        </div>
    );
};

export default MyOrders;
