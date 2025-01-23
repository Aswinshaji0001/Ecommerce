import React, { useState,useEffect} from 'react';
import axios from 'axios';
import './Sidebar.scss'
import { FaSearch } from 'react-icons/fa';

const Sidebar = ({setProducts}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [maxPrice,setPrice]=useState(10000);

  const[sideProducts,setSideProducts]=useState([])
  const [categories,setCategories] = useState([]);
  const value=localStorage.getItem("Auth");
  useEffect(()=>{
    getDetails();
  },[])
  
  const getDetails=async()=>{
    const res = await axios.get("http://localhost:3000/api/getsdata",{ headers: { "Authorization": `Bearer ${value}` } })
      if (res.status==201) {
        console.log(res);
        setSideProducts(res.data.data)
        setCategories(res.data.data1)
        
        
      }
      else{
        console.log("error");
        
      }
  }
  // Handle search input change
  const handleSearchChange = async(e) => {
    setSearchTerm(e.target.value);
    try {
      setProducts([])
        sideProducts.filter((i)=>i.pname.toLowerCase().includes(e.target.value.toLowerCase())&&i.category.toLowerCase().includes(selectedCategory.toLowerCase())).map((product)=>{
          setProducts((pre)=>[...pre,product])
        })

    } catch (error) {
        console.log(error);
    }
  };

  // Handle category selection change
  const handleCategoryChange = (e) => {
    console.log(e.target.value);
    
    setSelectedCategory(e.target.value);
    try {
      setProducts([])
        sideProducts.filter((i)=>i.category.toLowerCase().includes(e.target.value.toLowerCase())&&i.pname.toLowerCase().includes(searchTerm.toLowerCase())).map((product)=>{
          setProducts((pre)=>[...pre,product])
        })

    } catch (error) {
        console.log(error);
    }
  };
  const handlePriceChange = async(e) => {
    setPrice(parseInt(e.target.value,10));
    try {
      setProducts([])
        sideProducts.filter((i)=>i.price>=maxPrice&&i.category.toLowerCase().includes(selectedCategory.toLowerCase())&&i.pname.toLowerCase().includes(searchTerm.toLowerCase())).map((product)=>{
          setProducts((pre)=>[...pre,product])
        })

    } catch (error) {
        console.log(error);
    }
  };
  return (
    <div className="Sidebar">
  {/* Search Section */}
  <div className="section">
    <h3 className="section-title">Search</h3>
    <div className="group">
      <FaSearch className="icon" />
      <input
        type="search"
        className="input"
        placeholder="Search products..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
    </div>
  </div>

  {/* Category Filter Section */}
  <div className="section">
    <h3 className="section-title">Category</h3>
    <div className="category-filter">
      <select value={selectedCategory} onChange={handleCategoryChange}>
        <option value="">All Categories</option>
        {categories.map((cat, index) => (
          <option key={index} value={cat.category}>
            {cat.category.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  </div>

  {/* Price Filter Section */}
  <div className="section">
    <h3 className="section-title">Price Range</h3>
    <div className="price-filter">
      <p id="rangeValue">Under: ₹{maxPrice}</p>
      <input
        type="range"
        min="0"
        max="10000"
        step="100"
        value={maxPrice}
        onChange={handlePriceChange}
      />
    </div>
  </div>

  {/* Apply Filters Button */}
  <div className="section">
    <button className="apply-btn" onClick={() => getDetails()}>
      Apply Filters
    </button>
  </div>
</div>



  );
};

export default Sidebar;