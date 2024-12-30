import React, { useEffect, useState } from 'react'
import '../EditSeller/EditSeller.scss'
import axios from 'axios';
const EditSeller = ({setUser,setLogin}) => {

    const value = localStorage.getItem('Auth')
    console.log(value);
    const [sdata,getSData] = useState({})
    useEffect(()=>{
        getDetails();
        getData();
    },[])
    const getDetails=async()=>{
        const res = await axios.get("http://localhost:3000/api/seller", { headers: { "Authorization": `Bearer ${value}` } })
        console.log(res);
        if(res.status==201){
            setUser(res.data.username);
            setLogin(res.data.accounttype);  
        }
        else{
            alert("error")
        }
        
    }
    const getData = async()=>{
      const res = await axios.get("http://localhost:3000/api/getseller",{ headers: { "Authorization": `Bearer ${value}` } })
      console.log(res);
      if(res.status==201){
        getSData(res.data);
        alert("Success")
      }
      else{
        alert("error")
      }
    }

    const handleChange=(e)=>{
        console.log(e.target.value);
        getSData((pre)=>({
            ...pre,[e.target.name]:e.target.value
        }))
    }
    
    const handleSubmit=async(e)=>{
    e.preventDefault();
    const res = await axios.post("http://localhost:3000/api/editseller",sdata,{ headers: { "Authorization": `Bearer ${value}` } })
    console.log(res);
    if(res.status==201){
      getSData(res.data)
      alert("Success")
    }
    else{
      alert(res.data.msg)
    }
}
 
    
  return (
    <div className='edit'>
      <div className="mains">
        <div className="main">
            <h1>Edit Seller</h1>
            <form onSubmit={handleSubmit}>
                <input type="text"  placeholder='Name' id='name' name='name' value={sdata.name} onChange={handleChange}/>
                <input type="text"  placeholder="Location" id='location' name="location" value={sdata.location} onChange={handleChange}/>
                <div className="buttons">
                    <button className='button-3'>Submit</button>
                </div>
            </form>
        </div>
      </div>
    </div>
  )
}

export default EditSeller
