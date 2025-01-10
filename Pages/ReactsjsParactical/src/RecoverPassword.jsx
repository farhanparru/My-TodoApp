// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { FiLock, FiMail, FiUser } from 'react-icons/fi';
import gifLogo from '../src/assets/Images/list_16678000.gif';
import { ToastContainer, toast } from 'react-toastify';
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css';

export default function RecoverPassword() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');

  const navigate = useNavigate()

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(!username,!email){
      toast.error('Please enter all Feild.');
      return;
    }
   try {
    const response = await axios.post('  https://my-todo-api-chi.vercel.app/api/auth/sendPasswordLink', {
      username:username,
      email:email
    })
    toast.success('Password reset email sent successfully!')
    navigate('/login')
    setEmail('')
    console.log(response,"send email");
    
   } catch (error) {
    if(error.response.status === 404){
      toast.error('This Customer Note Enter Application.');

    }else if (error.response.status === 401){
      toast.error('This E-mail Note Enter Application!.');
    }else{
      toast.error('Failed to send password reset email. Please try again.');
    }
   
    
    console.log(error);
    
   }
};

  return (
    <div className='flex flex-wrap items-center justify-center min-h-screen bg-indigo-50'>
    <ToastContainer/>
      <div className='w-full md:w-1/2 px-8 py-6'>
        <div className='mb-4 text-center'>
          <div className='flex justify-center mb-4'>
            <img
              src={gifLogo}
              alt="Loading animation"
              className='w-24 h-24 object-cover rounded-full'
            />
          </div>
          <FiLock className='w-16 h-16 mx-auto text-gray-400' />
          <h1 className='text-xl font-bold'>Forgot Your Password?</h1>
          <p className='text-sm'>Enter your details below, and we’ll send you a link to reset your password.</p>
        </div>

        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label htmlFor='username' className='block text-sm font-medium text-gray-700'>Username</label>
            <div className='mt-1 relative rounded-md shadow-sm'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <FiUser className='h-5 w-5 text-gray-400' />
              </div>
              <input
                type='text'
                id='username'
                required
                className='w-full px-3 py-2 border rounded-md focus:border-indigo-500 focus:ring-indigo-500 pl-10'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label htmlFor='email' className='block text-sm font-medium text-gray-700'>Email Address</label>
            <div className='mt-1 relative rounded-md shadow-sm'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <FiMail className='h-5 w-5 text-gray-400' />
              </div>
              <input
                type='email'
                id='email'
                required
                className='w-full px-3 py-2 border rounded-md focus:border-indigo-500 focus:ring-indigo-500 pl-10'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <button
            type='submit'
            className='w-full px-4 py-2 font-bold text-white bg-indigo-500 rounded-md hover:bg-indigo-600'
          
          >
            Send Reset Link
          </button>

         
            <p className='mt-4 text-center text-green-500'>
              If your email is in our system, you will receive a password reset link shortly.
            </p>
         
        </form>
      </div>

      <div className='w-full md:w-1/2 lg:w-5/12 mt-20'>
        <img
          className='object-contain w-full h-full rounded-r-lg'
          src='https://objectstorage.me-dubai-1.oraclecloud.com/n/axwzijd5v1vn/b/DSL_IMAGES/o/IMAGE/8a215904-3bd2-48c0-80b8-154db5e85262-recover-Photoroom.png'
          alt='Security'
        />
      </div>
      
    </div>
  );
}
