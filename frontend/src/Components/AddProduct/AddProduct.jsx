import React, { useEffect, useState } from 'react';
import './AddProduct.scss';
import axios from 'axios';

const AddProduct = ({ setUser, setLogin }) => {
    const value = localStorage.getItem('Auth');
    const [pimages, setPhotos] = useState([]);
    const [product, setProduct] = useState({
        pname: "",
        category: "",
        price: "",
        size: "",
        brand: "",
        sellerId: ""
    });
    const [categories, setCategories] = useState([]); // State for categories
    const [newCategory, setNewCategory] = useState(""); // State for new category input

    useEffect(() => {
        getDetails();
        fetchCategories(); // Fetch categories on component mount
    }, []);

    const getDetails = async () => {
        const res = await axios.get("http://localhost:3000/api/seller", { headers: { "Authorization": `Bearer ${value}` } });
        console.log(res);
        if (res.status === 201) {
            setProduct({ sellerId: res.data.seller.sellerId, brand: res.data.seller.name });
            setUser(res.data.username);
            setLogin(res.data.accounttype);
        } else {
            alert("error");
        }
    };

    const fetchCategories = async () => {
        // Fetch categories from your API
        const res = await axios.get("http://localhost:3000/api/categories");
        if (res.status === 200) {
            setCategories(res.data); // Assuming the response contains an array of categories
        } else {
            alert("Failed to fetch categories");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await axios.post("http://localhost:3000/api/addproduct", { ...product, pimages }, { headers: { "Content-Type": "application/json" } });
        console.log(res);
        if (res.status === 201) {
            alert("Success");
        } else {
            alert(res.data.msg);
        }
    };

    const handleFile = async (e) => {
        const arr = Object.values(e.target.files);
        console.log(arr);
        arr.map(async (m) => {
            const pimages = await convertToBase64(m);
            setPhotos((pre) => ([...pre, pimages]));
        });
    };

    function convertToBase64(file) {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    }

    const handleChange = (e) => {
        console.log(e.target.value);
        setProduct((pre) => ({
            ...pre, [e.target.name]: e.target.value
        }));
    };

    const handleNewCategoryChange = (e) => {
        setNewCategory(e.target.value);
    };

    const handleAddCategory = () => {
        if (newCategory) {
            setCategories((prev) => [...prev, newCategory]);
            setProduct((prev) => ({ ...prev, category: newCategory })); // Set the new category to the product
            setNewCategory(""); // Clear the input
        }
    };

    return (
        <div className='addp'>
            <div className="mains">
                <div className="main">
                    <h2>Add Product</h2>
                    <form onSubmit={handleSubmit}>
                        <input type="text" placeholder='Name' name='pname' id='pname' onChange={handleChange} />
                        <select name='category' id='category' onChange={handleChange} value={product.category}>
                            <option value="">Select Category</option>
                            {categories.map((cat, index) => (
                                <option key={index} value={cat}>{cat}</option>
                            ))}
                        </select>
                        <input type="text" placeholder='Add new category' value={newCategory} onChange={handleNewCategoryChange} />
                        <button type="button" onClick={handleAddCategory} className='button-24'>Add Category</button>
                        <input type="text" placeholder='Price' name='price' id='price' onChange={handleChange} />
                        <input type="text" placeholder='Size' name='size' id='size' onChange={handleChange} />
                        <input type="file" onChange={handleFile} name="pimages" id='pimages' multiple />
                        <div className="display">
                            {pimages.map((img, index) => (
                                <img key={index} src={img} alt={`Product Preview ${index}`} />
                            ))}
                        </div>
                        <button className='button-24'>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;
