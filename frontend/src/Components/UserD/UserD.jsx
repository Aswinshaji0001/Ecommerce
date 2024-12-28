import React, { useState } from 'react';
import '../UserD/UserD.scss';

const UserD = () => {
  const [addressCards, setAddressCards] = useState([1]); // Initial state with one address card

  // Function to add a new address card
  const addAddressCard = () => {
    setAddressCards([...addressCards, addressCards.length + 1]);
  };

  return (
    <div className='userd'>
      <div className="left">
        <div className="card">
          <h1>User Details</h1>
          <div className="images">
            <img src="profile.png" alt="Profile" />
          </div>
          <form action="">
            <input type="text" placeholder='Fname'/>
            <input type="text" placeholder='Lname'/>
            <input type="text" placeholder='Mobile number'/>
            <label htmlFor="male">Male</label>
            <input type="radio" id="male" name="gender" value="male"/>
            <label htmlFor="female">Female</label>
            <input type="radio" id="female" name="gender" value="female"/>
            <div className="buttons">
              <button className='button-24'>Submit</button>
              <button className='button-24'>Edit</button>
              <button className='button-24'>Save</button>
            </div>
          </form>
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
