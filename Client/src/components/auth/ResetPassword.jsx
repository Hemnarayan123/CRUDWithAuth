import React from 'react'
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from 'axios'
import { ToastBar, toast } from 'react-hot-toast';

function ResetPassword() {
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const { id, token } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`http://localhost:8000/api/v1/reset_password/${id}/${token}`, { password })
      .then(res => {
        if (res.data.Status === "Success") {
          toast.success("Password reset successfully", {
            duration: 2000,
          });
          toast.success("Please Login with new Password", {
            duration: 3000,
          });
          navigate('/signin');
        } else {
          console.log("Error: ", res.data.Status);
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800">
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-2xl font-semibold text-center text-gray-800">Reset Password</h2>
      <form onSubmit={handleSubmit} className="mt-6">
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            New Password
          </label>
          <input
            type="password"
            id="password"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter your new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700">
          Update Password
        </button>
      </form>
    </div>
  </div>
  );
}

export default ResetPassword;