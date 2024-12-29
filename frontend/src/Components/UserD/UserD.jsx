import React, { useState } from 'react';
import '../UserD/UserD.scss';
import axios from 'axios';
import { useEffect } from 'react';

const UserD = ({setUser,setLogin}) => {
  const value = localStorage.getItem('Auth');
  const [addressCards, setAddressCards] = useState([1]);

  const addAddressCard = () => {
    setAddressCards([...addressCards, addressCards.length + 1]);
  };
  const [isDisabled, setIsDisabled] = useState(true);
  const toggleInput = () => {
    setIsDisabled(!isDisabled);
  };
  const [data,setData] = useState({
    userId:"",
    fname:"",
    lname:"",
    mobile:"",
    gender:""
  })
  const [user,getUser] = useState("")
  useEffect(()=>{
    getDetails();
    getData();
},[])
const getDetails = async()=>{
    const res = await axios.get("http://localhost:3000/api/seller", { headers: { "Authorization": `Bearer ${value}` } })
    if(res.status==201){
        setUser(res.data.username);
        setLogin(res.data.accounttype);  
        setData({userId:res.data._id})
    }
    else{
        alert("error")
    }
}
  const getData=async()=>{
      const res = await axios.get("http://localhost:3000/api/getuser",{ headers: { "Authorization": `Bearer ${value}` } })
      console.log(res);
      getUser(res.data.user)
      
  }
  console.log(user);
  
  const handleChange=(e)=>{
    console.log(e.target.value);
    setData((pre)=>({
        ...pre,[e.target.name]:e.target.value
    }))
}
const handleSubmit=async(e)=>{
  // console.log(data);
  const res = await axios.post("http://localhost:3000/api/adduser",data,{ headers: { "Authorization": `Bearer ${value}` } })
  // console.log(res);
  if(res.status==201){
    alert("Success")
  }
  else{
    alert(res.data.msg)
  }
}

  return (
    <div className='userd'>
      <div className="left">
        <div className="card">
          <h1>User Details</h1>
          <div className="images">
            <img src="profile.png" alt="Profile" />
          </div>
            <input type="text" placeholder='Fname'disabled={isDisabled} name="fname" id='fname' value={user.fname} onChange={handleChange}/>
            <input type="text" placeholder='Lname' name='lname' disabled={isDisabled} id='lname' value={user.lname} onChange={handleChange}/>
            <input type="text" placeholder='Mobile number' disabled={isDisabled} name='mobile' id='mobile' value={user.mobile} onChange={handleChange}/>
            <label htmlFor="male">Male</label>
            <input type="radio" id="male" disabled={isDisabled} name="gender" value={user.gender}  onChange={handleChange}/>
            <label htmlFor="female">Female</label>
            <input type="radio" id="female" disabled={isDisabled} name="gender" value={user.gender} onChange={handleChange}/>
            <div className="buttons">
              <button className='button-24' onClick={handleSubmit}>Save</button>
              <button className='button-24' onClick={toggleInput}>{isDisabled ? 'Enable' : 'Disable'}</button>
            </div>
        </div>
      </div>

      <div className="right">
        <div className="cards">
          <div className="cardx">
            <h1>Address Details</h1>
            {/* Loop through addressCards state to render each card */}
            {addressCards.map((card, index) => (
              <div key={index} className="address-card">
                <form action="">
                  <input type="text" placeholder='Housename'/>
                  <input type="text" placeholder='Landmark'/>
                  <input type="text" placeholder='Pincode'/>
                  <input type="text" placeholder='Place'/>
                  <div className="buttons">
                    <button className='button-24'>Submit</button>
                    <button className='button-24'>Edit</button>
                    <button className='button-24'>Save</button>
                  </div>
                </form>
              </div>
            ))}
            {/* Plus button to add a new address card */}
            <button className='add-button' onClick={addAddressCard}>
              + Add Address
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserD;
