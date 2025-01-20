import React, { useEffect, useState } from 'react';
import '../EditSeller/EditSeller.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EditSeller = ({ setUser, setLogin }) => {
  const value = localStorage.getItem('Auth');
  const navigate = useNavigate();
  const [sdata, getSData] = useState({});

  useEffect(() => {
    getDetails();
    getData();
  }, []);

  const getDetails = async () => {
    const res = await axios.get('http://localhost:3000/api/seller', {
      headers: { Authorization: `Bearer ${value}` },
    });
    if (res.status === 201) {
      setUser(res.data.username);
      setLogin(res.data.accounttype);
    } else {
      alert('Error fetching details');
    }
  };

  const getData = async () => {
    const res = await axios.get('http://localhost:3000/api/getseller', {
      headers: { Authorization: `Bearer ${value}` },
    });
    if (res.status === 201) {
      getSData(res.data);
    } else {
      alert('Error fetching seller data');
    }
  };

  const handleChange = (e) => {
    getSData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post('http://localhost:3000/api/editseller', sdata, {
      headers: { Authorization: `Bearer ${value}` },
    });
    if (res.status === 201) {
      getSData(res.data);
      alert('Success');
      navigate('/seller');
    } else {
      alert(res.data.msg);
    }
  };

  return (
    <div className="edit">
      <div className="edit-container">
        <h1>Edit Seller</h1>
        <form className="edit-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Name"
              id="name"
              name="name"
              value={sdata.name || ''}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Location"
              id="location"
              name="location"
              value={sdata.location || ''}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn-primary">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditSeller;
