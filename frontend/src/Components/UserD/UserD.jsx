import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../UserD/UserD.scss';
import { Link } from 'react-router-dom';

const UserD = ({ setUser, setLogin }) => {
  const value = localStorage.getItem('Auth');
  const [addressCards, setAddressCards] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);

  // State for user data
  const [data, setData] = useState({
    fname: "",
    lname: "",
    mobile: "",
    gender: "",
  });

  const[count,setCount] =useState({
    counts:""
  })
console.log(count);

  // Fetch user details from API
  useEffect(() => {
    getDetails();
    getData();
    getAddress();
  }, []);

  const getDetails = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/seller", {
        headers: { "Authorization": `Bearer ${value}` },
      });
      if (res.status === 201) {
        setUser(res.data.username);
        setLogin(res.data.accounttype);
        setAddressCards(res.data.address.address)
      } else {
        alert("Error fetching seller details");
      }
    } catch (error) {
      console.error("Error fetching details:", error);
    }
  };

  const getData = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/getuser", {headers: { "Authorization": `Bearer ${value}` },});
      
      setData({
        gender: res.data.user.gender || "",
        fname: res.data.user.fname,
        lname: res.data.user.lname,
        mobile: res.data.user.mobile,
      });
      setCount({
        counts:res.data.count
      })
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
const getAddress = async()=>{
  const res = await axios.get("http://localhost:3000/api/getaddress", {headers: { "Authorization": `Bearer ${value}` },});
  if(res.status==201){
    setAddressCards(res.data.address)
    
  }
  else{
    alert("Failed")
  }
}
  const handleChange = (e, index) => {
    const { name, value } = e.target;
    setAddressCards((prevCards) => {
      const updatedAddressCards = [...prevCards];
      updatedAddressCards[index] = { ...updatedAddressCards[index], [name]: value };
      return updatedAddressCards;
    });
  };
  

  const handleGenderChange = (e) => {
    setData((prevData) => ({
      ...prevData,
      gender: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = {data};

    try {
      const res = await axios.post("http://localhost:3000/api/updateuser", data, {headers: { "Authorization": `Bearer ${value}` },});

      if (res.status === 201) {
        alert("User saved successfully!");
      } else {
        alert(res.data.msg);
      }
    } catch (error) {
      console.error("Error during submission:", error);
    }
  };
  
  const toggleInput = () => {
    setIsDisabled(!isDisabled);
  };
  const toggleInputA = () => {
    setIsDisabled(!isDisabled);
  };

  const addAddressCard = () => {
    setAddressCards([
      ...addressCards,
      {
        housename: '',
        landmark: '',
        pincode: '',
        place: '',
      },
    ]);
  };

  const handleAddressSubmit = async (index) => {
    const addressToSubmit = addressCards[index];
    console.log("Address to be submitted:", addressToSubmit);

    try {
      const res = await axios.post("http://localhost:3000/api/addaddress", addressCards, {
        headers: { "Authorization": `Bearer ${value}` },
      });

      if (res.status === 201) {
        alert("Address added successfully!");
      } else {
        alert("Failed to add address: " + res.data.msg);
      }
    } catch (error) {
      console.error("Error adding address:", error);
      alert("Error adding address");
    }
  };

  const deleteAddress = (id)=>{
      console.log(id);
      
  }

  return (
    <div className="userd">
      <div className="left">
        <div className="card">
          <h1>User Details</h1>
          <div className="images">
            <img src="profile.png" alt="Profile" />
          </div>
          <input
            type="text"
            placeholder="Fname"
            disabled={isDisabled}
            name="fname"
            value={data.fname}
            onChange={(e) => setData({ ...data, fname: e.target.value })}
          />
          <input
            type="text"
            placeholder="Lname"
            disabled={isDisabled}
            name="lname"
            value={data.lname}
            onChange={(e) => setData({ ...data, lname: e.target.value })}
          />
          <input
            type="text"
            placeholder="Mobile number"
            disabled={isDisabled}
            name="mobile"
            value={data.mobile}
            onChange={(e) => setData({ ...data, mobile: e.target.value })}
          />
          {/* Gender Radio Buttons */}
          <label htmlFor="male">Male</label>
          <input
            type="radio"
            id="male"
            disabled={isDisabled}
            name="gender"
            value="male"
            checked={data.gender === "male"}
            onChange={handleGenderChange}
          />
          <label htmlFor="female">Female</label>
          <input
            type="radio"
            id="female"
            disabled={isDisabled}
            name="gender"
            value="female"
            checked={data.gender === "female"}
            onChange={handleGenderChange}
          />

          <div className="buttons">
            <button className="button-24" onClick={handleSubmit}>
              Save
            </button>
            <button className="button-24" onClick={toggleInput}>
              {isDisabled ? "Enable" : "Disable"}
            </button>
            <button className="button-24">Logout</button>
          </div>
        </div>
      </div>

      <div className="right">
        <div className="buttonss">
       <button className="button-24"><Link to="/myorders">Your Orders   ({count.counts})</Link></button>
          <button className='button-24'><Link to="/wishlist">Your Wishlist</Link></button>
          <button className='button-24'><Link to="/cart">Your Cart</Link></button>
        </div>
        <div className="cards">
          <div className="cardx">
            <h1>Address Details</h1>
            {addressCards.map((address, index) => (
              <div key={index} className="address-card">
                <input
                  type="text"
                  placeholder="Housename"
                  name="housename"
                  value={address.housename}
                  disabled={isDisabled}
                  onChange={(e) => handleChange(e, index)}
                />
                <input
                  type="text"
                  placeholder="Landmark"
                  name="landmark"
                  value={address.landmark}
                  disabled={isDisabled}
                  onChange={(e) => handleChange(e, index)}
                />
                <input
                  type="text"
                  placeholder="Pincode"
                  name="pincode"
                  value={address.pincode}
                  disabled={isDisabled}
                  onChange={(e) => handleChange(e, index)}
                />
                <input
                  type="text"
                  placeholder="Place"
                  name="place"
                  value={address.place}
                  disabled={isDisabled}
                  onChange={(e) => handleChange(e, index)}
                />
                <div className="buttons">
                  <button className="button-24" onClick={() => handleAddressSubmit(index)}>
                    Submit Address
                  </button>
                  <button className="button-24" onClick={toggleInputA}>
              {isDisabled ? "Enable" : "Disable"}
            </button>
            <button className="button-24" onClick={()=>deleteAddress(address.name)}>Delete</button>
                </div>
              </div>
            ))}
            <div className="buttons">
              <button className="button-24" onClick={addAddressCard}>
                + Add Address
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserD;
