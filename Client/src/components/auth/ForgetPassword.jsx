import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthToken';

function ForgetPassword() {
  const [email, setEmail] = useState('')
  const navigate = useNavigate();
  const { tokenGetLocalStorage } = useAuth();

  

  axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/api/v1/forget_password', { email })

    .then(res => {
      console.log("Response:", res);
      

      if (res.data && res.data.Status === "Success") {
        navigate(`/signin`);
      } else {
        console.log("Error: Response status is not success");
      }
    })
    .catch(err => console.log(err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h4>Forgot Password</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              autoComplete="off"
              name="email"
              className="form-control rounded-0"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgetPassword;

