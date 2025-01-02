// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useParams } from "react-router-dom";
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function RecoverPassword() {
  const [Username, setUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

   const {id,token} = useParams()

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:8000/api/auth/UpdatePassword/${id}/${token}`)
      toast.success('Password change Successfully!')
      console.log(response);
      
    } catch (error) {
      toast.error('Failed to change password reset email. Please try again.');
      console.log(error);
      
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen bg-[#cffadf]">
      <div className="bg-green-50 flex flex-col justify-center items-center px-5">
        <h1 className="text-3xl font-bold mb-2">Reset Your Password</h1>
        <p className="mb-4">
          Can t access your Todo account? No worries! Just enter your registered
          email below, and we ll help you get back to organizing your tasks in
          no time.
        </p>

        <img
          src="https://objectstorage.me-dubai-1.oraclecloud.com/n/axwzijd5v1vn/b/DSL_IMAGES/o/IMAGE/b35bd369-ce03-42e9-a612-f88c70167354-roce-Photoroom.png"
          alt="Recovery"
          className="h-[300px] w-[300px]"
        />
      </div>
      <div className="flex flex-col justify-center items-start bg-green-50 px-10 py-8">
        <h2 className="text-3xl font-bold mb-5">Reset Your Password</h2>
        <form onSubmit={handleSubmit} className="w-full">
          <label htmlFor="email" className="font-semibold">
            Username 
          </label>
          <input
            id="email"
            type="email"
            value={Username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-2 mb-4"
          />
          <label htmlFor="newPassword" className="font-semibold">
            New Password
          </label>
          <div className="relative w-full mb-4">
            <input
              id="newPassword"
              type={showPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-2"
            />
            <span
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </span>
          </div>
          <label htmlFor="confirmPassword" className="font-semibold">
            Confirm New Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-2 mb-6"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition-colors"
          >
            Reset Password
          </button>
        </form>
      </div>
      <div>
      <ToastContainer/>
      </div>
    </div>
  );
}

export default RecoverPassword;
