import React, { useEffect, useState } from 'react'
import './AddProduct.scss';
import axios from 'axios';
const AddProduct = ({setUser,setLogin}) => {

    const value = localStorage.getItem('Auth');
    const [pimages,setPhotos]=useState([])
    const [product,setProduct]=useState({
        sellerId:"",
        pname:"",
        category:"",
        price:"",
        size:"",
        brand:""
    })
    useEffect(()=>{
        getDetails();
    },[])
    const getDetails = async()=>{
        const res = await axios.get("http://localhost:3000/api/seller", { headers: { "Authorization": `Bearer ${value}` } })
        console.log(res);
        if(res.status==201){
           
            setProduct({brand:res.data.seller.name});
            setProduct({sellerId:res.data.seller.sellerId});
            setUser(res.data.username);
            setLogin(res.data.accounttype);  
        }
        else{
            alert("error")
        }
    }
    console.log(product);
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const res = await axios.post("http://localhost:3000/api/addproduct",{...product,pimages},{headers:{"Content-Type":"application/json"}})
        console.log(res);
        if(res.status==201){
          alert("Success")
        }
        else{
          alert(res.data.msg)
        }
    }
    const handleFile=async(e)=>{
        const arr=Object.values(e.target.files)
        console.log(arr);
        arr.map(async(m)=>{
          const pimages=await convertToBase64(m)
          setPhotos((pre)=>([...pre,pimages]))
        })
      }
    
    function convertToBase64(file){
        return new Promise((resolve,reject)=>{
            const fileReader=new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload=()=>{
                resolve(fileReader.result)
            }
            fileReader.onerror=(error)=>{
                reject(error)
            }
        });
    }
    const handleChange=(e)=>{
        console.log(e.target.value);
        setProduct((pre)=>({
            ...pre,[e.target.name]:e.target.value
        }))
    } 
  return (
    <div className='addp'>
        <div className="mains">
            <div className="main">
                <h2>Add Product</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder='Name' name='pname' id='pname' onChange={handleChange}/>
                    <input type="text" placeholder='category' name='category' id='category' onChange={handleChange}/>
                    <input type="text" placeholder='price' name='price' id='price' onChange={handleChange}/>
                    <input type="text" placeholder='size' name='size' id='size' onChange={handleChange}/>
                    <input type="file"onChange={handleFile} name="pimages" id='pimages' multiple/>
                    <div className="display">
                        <img src="" alt=""  />
                    </div>
                    <button className='button-3'>Submit</button>
                </form>
            </div>
        </div>
    </div>
  )
}
export default AddProduct;
