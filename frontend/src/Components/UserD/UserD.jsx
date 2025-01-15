import React, { useEffect, useState } from "react";
import axios from "axios";
import "../UserD/UserD.scss";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaPlusCircle } from "react-icons/fa"; // Importing icons from react-icons

const UserD = ({ setUser, setLogin }) => {
  const value = localStorage.getItem("Auth");
  const [addressCards, setAddressCards] = useState([]); // Ensure addressCards is always an array
  const [isDisabled, setIsDisabled] = useState(true);
  const navigate = useNavigate();

  // State for user data
  const [data, setData] = useState({
    fname: "",
    lname: "",
    mobile: "",
    gender: "",
  });

  const [count, setCount] = useState({
    counts: "",
    counts1: "",
    counts2: "",
  });

  // Fetch user details from API
  useEffect(() => {
    getDetails();
    getData();
    getAddress();
  }, []);

  const getDetails = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/seller", {
        headers: { Authorization: `Bearer ${value}` },
      });
      if (res.status === 201) {
        setUser(res.data.username);
        setLogin(res.data.accounttype);
        setAddressCards(res.data.address.address || []); // Ensure addressCards is an array
      } else {
        alert("Error fetching seller details");
      }
    } catch (error) {
      console.error("Error fetching details:", error);
    }
  };

  const getData = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/getuser", {
        headers: { Authorization: `Bearer ${value}` },
      });

      setData({
        gender: res.data.user.gender || "",
        fname: res.data.user.fname,
        lname: res.data.user.lname,
        mobile: res.data.user.mobile,
      });
      setCount({
        counts: res.data.count,
        counts1: res.data.count1,
        counts2: res.data.count2,
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const getAddress = async () => {
    const res = await axios.get("http://localhost:3000/api/getaddress", {
      headers: { Authorization: `Bearer ${value}` },
    });

    if (res.status === 201) {
      setAddressCards(res.data.address || []); // Fallback to an empty array if no address data
    } else {
      alert("Failed");
    }
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    setAddressCards((prevCards) => {
      const updatedAddressCards = [...prevCards];
      updatedAddressCards[index] = {
        ...updatedAddressCards[index],
        [name]: value,
      };
      return updatedAddressCards;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = { data };

    try {
      const res = await axios.post(
        "http://localhost:3000/api/updateuser",
        data,
        { headers: { Authorization: `Bearer ${value}` } }
      );

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

  const addAddressCard = () => {
    setAddressCards([
      ...addressCards,
      {
        housename: "",
        landmark: "",
        pincode: "",
        place: "",
        city: "", // Make sure to add a city in the new address
      },
    ]);
    setPosition(addressCards.length);
    setEditMode(true);
  };

  const handleAddressSubmit = async (index) => {
    const addressToSubmit = addressCards[index];

    try {
      const res = await axios.post(
        "http://localhost:3000/api/addaddress",
        addressCards,
        {
          headers: { Authorization: `Bearer ${value}` },
        }
      );

      if (res.status === 201) {
        alert("Address added successfully!");
        setEditMode(null);
        getDetails();
        getData();
        getAddress();
      } else {
        alert("Failed to add address: " + res.data.msg);
      }
    } catch (error) {
      console.error("Error adding address:", error);
      alert("Error adding address");
    }
  };

  const deleteAddress = async (fieldValue) => {
    const addressToDelete = addressCards.find(
      (address) => address.housename === fieldValue
    );

    if (!addressToDelete) {
      alert("Address not found");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:3000/api/deleteaddress",
        { housename: fieldValue },
        {
          headers: { Authorization: `Bearer ${value}` },
        }
      );

      if (res.status === 201) {
        setAddressCards((prevCards) =>
          prevCards.filter((address) => address.housename !== fieldValue)
        );
        alert("Address deleted successfully!");
      } else {
        alert("Failed to delete address: " + res.data.msg);
      }
    } catch (error) {
      console.error("Error deleting address:", error);
      alert("Error deleting address");
    }
  };

  const logout = () => {
    localStorage.removeItem("Auth");
    alert("Logged Out");
    navigate("/login");
  };

  const [editMode, setEditMode] = useState(false);
  const [position, setPosition] = useState(0);

  const handleEditClick = (index) => {
    setPosition(index);
    setEditMode(true);
  };

  const handleCancelEdit = () => {
    setEditMode(null);
  };

  return (
    <div className="userd">
      <div className="left">
          <div className="edit">
             <div className="card">
               {/* Card Image Section */}
               <div className="card__img">
                 <svg width="100%" xmlns="http://www.w3.org/2000/svg">
                   <rect height="450" width="540" fill="#ffffff"></rect>
                   <defs>
                     <linearGradient gradientTransform="rotate(222,648,379)" y2="100%" y1="0" x2="0" x1="0" gradientUnits="userSpaceOnUse" id="a">
                       <stop stopColor="#ffffff" offset="0"></stop>
                       <stop stopColor="#002349" offset="1"></stop>
                     </linearGradient>
                     <pattern viewBox="0 0 1080 900" y="0" x="0" height="250" width="300" id="b" patternUnits="userSpaceOnUse">
                       <g fillOpacity="0.5">
                         <polygon points="90 150 0 300 180 300" fill="#444"></polygon>
                         <polygon points="90 150 180 0 0 0"></polygon>
                       </g>
                     </pattern>
                   </defs>
                   <rect height="100%" width="100%" fill="url(#a)" y="0" x="0"></rect>
                   <rect height="100%" width="100%" fill="url(#b)" y="0" x="0"></rect>
                 </svg>
               </div>
       
               {/* Avatar Section */}
               <div className="card__avatar">
                 <img
                   src={"/profile.png" || "https://via.placeholder.com/128"}
                   alt="Avatar"
                   className="card__avatar-img"
                 />
                 <input
                   type="file"
                   id="profile"
                   name="profile"
                   style={{ display: "none" }}
                   accept="image/*"
                 />
               </div>
       
               {/* Form Section */}
               <form className="card__form">
                 <div className="card__input-wrapper">
                   <input
                     type="text"
                     id="fname"
                     name="fname"
                     value={data.fname} // Bind to details.username
                     placeholder="Enter Firstname"
                     disabled={isDisabled}

                     onChange={(e) => setData({ ...data, fname: e.target.value })}

                     required
                   />
                 </div>
       
                 <div className="card__input-wrapper">
                   <input
                     type="email"
                     id="lname"
                     name="lname"
                     value={data.lname} // Bind to details.email
                     placeholder="Enter Lastname"
                     disabled={isDisabled}

                     onChange={(e) => setData({ ...data, lname: e.target.value })}

                     required
                   />
                 </div>
                 <div className="card__input-wrapper">
                   <input
                     type="email"
                     id="email"
                     name="mobile"
                     value={data.mobile} // Bind to details.email
                     placeholder="Enter Mobile"
                     disabled={isDisabled}

                     onChange={(e) => setData({ ...data, mobile: e.target.value })}

                     required
                   />
                 </div>
                

                 <div className="cards__input-wrapper">
                
                  <div className="a">
                  <label htmlFor="male">Male</label> 
                   <input
                     type="radio"
                     id="male"
                     name="gender"
                      value="male"
                      disabled={isDisabled}

                     checked={data.gender === "male"} // Bind to details.email
                     onChange={(e) => setData({ ...data, gender: e.target.value })}
                     required
                   />
                   </div>
                   <div className="b">

                       <label htmlFor="male">Female</label>
                   <input
                     type="radio"
                     id="female"
                     name="gender"
                     disabled={isDisabled}

                      value="female"
                     checked={data.gender === "female"} // Bind to details.email
                     onChange={(e) => setData({ ...data, gender: e.target.value })}
                     required
                   />
                </div>
                 </div>
                 

             
                 
               </form>
               <div className="cardg">
               <button type="submit" className="cardsss" onClick={handleSubmit}>SAVE</button>
               <button className="cardsss" onClick={toggleInput}>
              {isDisabled ? "Enable" : "Disable"}
            </button>
            <button className="cardsss" onClick={logout}>
              Logout
            </button>
               </div>
             </div>
           </div>
      </div>

      <div className="right">
        <div className="buttonss">
          <button className="button-24">
            <Link to="/myorders">Your Orders ({count.counts})</Link>
          </button>
          <button className="button-24">
            <Link to="/wishlist">Your Wishlist ({count.counts1})</Link>
          </button>
          <button className="button-24">
            <Link to="/cart">Your Cart ({count.counts2})</Link>
          </button>
        </div>
        <div className="cards">
          <div className="cardx">
            <h1>Address Details</h1>
            <div className="buttonsss">
              <button className="button-24" onClick={addAddressCard}>
                <FaPlusCircle /> {/* Add Address Icon */}
              </button>
            </div>
            {editMode && (
              <div className="address-card">
                <div className="ad">
                  <label htmlFor="housename">Housename</label>
                  <input
                    type="text"
                    placeholder="Housename"
                    name="housename"
                    id="housename"
                    value={addressCards[position]?.housename || ""}
                    onChange={(e) => handleChange(e, position)}
                  />
                  <label htmlFor="landmark">Landmark</label>
                  <input
                    type="text"
                    placeholder="Landmark"
                    name="landmark"
                    id="landmark"
                    value={addressCards[position]?.landmark || ""}
                    onChange={(e) => handleChange(e, position)}
                  />
                </div>
                <div className="ad">
                  <label htmlFor="pincode">Pincode</label>
                  <input
                    type="text"
                    placeholder="Pincode"
                    name="pincode"
                    id="pincode"
                    value={addressCards[position]?.pincode || ""}
                    onChange={(e) => handleChange(e, position)}
                  />
                  <label htmlFor="city">City</label>
                  <input
                    type="text"
                    placeholder="City"
                    name="city"
                    id="city"
                    value={addressCards[position]?.city || ""}
                    onChange={(e) => handleChange(e, position)}
                  />
                </div>
                <div className="ad">
                  <label htmlFor="place">Place</label>
                  <input
                    type="text"
                    placeholder="Place"
                    name="place"
                    id="place"
                    value={addressCards[position]?.place || ""}
                    onChange={(e) => handleChange(e, position)}
                  />
                  <label htmlFor="town">Town</label>
                  <input
                    type="text"
                    placeholder="Town"
                    name="town"
                    id="town"
                    value={addressCards[position]?.town || ""}
                    onChange={(e) => handleChange(e, position)}
                  />
                </div>
                <div className="buttons">
                  <button
                    className="button-24"
                    onClick={() => handleAddressSubmit(position)}
                  >
                    <FaPlusCircle /> {/* Add Address Icon */}
                  </button>
                  <button
                    className="button-24"
                    onClick={handleCancelEdit}
                  >
                    <FaEdit /> {/* Cancel Edit Icon */}
                  </button>
                </div>
              </div>
            )}
            {Array.isArray(addressCards) && addressCards.length > 0 ? (
              addressCards.map((address, index) => (
                address.housename && (
                  <div key={index} className="address-card">
                    <div className="bad">
                      <div className="badx">
                        <h2>{address.housename}</h2>
                        <p>{address.landmark}</p>
                        <p>{address.pincode}</p>
                        <p>{address.city}</p>
                        <p>{address.place}</p>
                        <p>{address.town}</p>
                      </div>
                    </div>
                    <div className="buttons">
                      <button
                        className="button-24"
                        onClick={() => handleEditClick(index)}
                      >
                        <FaEdit /> {/* Edit Icon */}
                      </button>
                      <button
                        className="button-24"
                        onClick={() => deleteAddress(address.housename)}
                      >
                        <FaTrash /> {/* Delete Icon */}
                      </button>
                    </div>
                  </div>
                )
              ))
            ) : (
              <p>No address available.</p> // Optional message when no addresses exist
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserD;
