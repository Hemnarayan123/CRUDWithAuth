import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {summaryAPI} from "../../common/index.js";
import { RiEyeCloseLine } from "react-icons/ri";
import { RiEyeLine } from "react-icons/ri";
import { Toaster, toast } from "react-hot-toast";
import { useAuth } from "../context/AuthToken";

function SignIn() {
  const [showPassword,setShowPassword] = useState(false)
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const  {tokenGetLocalStorage}  = useAuth();
  const navigate = useNavigate();



  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(summaryAPI.signIn.url,data,{
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200 || response.status === 201) {
        toast.success("Sign In Success", {
          duration: 3000,
        });

        tokenGetLocalStorage(response.data.token)
        navigate("/");
      } else {
        toast.error("Sign In Error", {
          duration: 3000,
        });
      }
    } catch (error) {
      console.error("Error", error);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">SignIn</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-3 py-2 border rounded"
              value={data.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4 relative">
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className="w-full px-3 py-2 border rounded"
              value={data.password}
              onChange={handleChange}
              required
            />
            <div
              className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer pt-6"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              <span>{showPassword ? <RiEyeLine /> : <RiEyeCloseLine />}</span>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-gray-600 text-white py-2 rounded hover:bg-gray-800"
          >
            SignIn
          </button>

          <div>
            <p className="text-center text-gray-700">
              Don't have an account?{"      "}
              <Link to={"/signup"} className="text-blue-600">
                SignUp
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
