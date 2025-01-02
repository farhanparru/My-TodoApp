import { useState } from 'react';
import { HiOutlineMail, HiLockClosed } from 'react-icons/hi';
import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';
import {useNavigate} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css';

function RecoverPassword() {

   const navigate = useNavigate()

  const [email, setEmail] = useState('');

  const handleSubmit = async(e) => {
        e.preventDefault();
        if(!email){
          toast.error('Please enter a valid email address.');
          return;
        }
       try {
        const response = await axios.post('http://localhost:8000/api/auth/sendPasswordLink', {email})
        toast.success('Password reset email sent successfully!')
        navigate('/login')
        setEmail('')
        console.log(response,"send email");
        
       } catch (error) {
        toast.error('Failed to send password reset email. Please try again.');
        console.log(error);
        
       }
  };

  return (
    <div className='flex flex-col min-h-screen'>
    <ToastContainer/>
      <div className='bg-purple-50 text-center py-2 flex flex-col items-center justify-center bg-fixed bg-center bg-cover' style={{ backgroundImage: "url('https://source.unsplash.com/random/1280x720?security')" }}>
         <img className='h-[200px] w-[200px] object-contain m-0 p-0' src='https://objectstorage.me-dubai-1.oraclecloud.com/n/axwzijd5v1vn/b/DSL_IMAGES/o/IMAGE/7c9c886e-6ab4-4e88-aecd-4ed24873a05c-recoverrr-Photoroom.png'/>
        <h2 className='text-3xl text-gray-800 font-bold'>Secure Your Account</h2>
        <p className='m-2 text-md text-gray-700'>Follow a few simple steps to reset your password and secure your account.</p>
      
      </div>
      <main className='flex-grow'>
        <div className='max-w-lg mx-auto my-5 p-4'>
          <div className='text-center'>
            <HiLockClosed className='mx-auto text-5xl text-indigo-500' />
            <h1 className='text-3xl font-semibold my-2'>Recover Password</h1>
            <p className='text-gray-600 text-sm'>Let s quickly get you back into your account.</p>
          </div>
          <form onSubmit={handleSubmit} className='my-3'>
            <div className='mb-4'>
              <label htmlFor='email' className='block text-sm font-medium text-gray-700'>Email</label>
              <div className='mt-1 relative rounded-md shadow-sm'>

              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <HiOutlineMail className="h-5 w-5 text-gray-400" />
                </div>

                <input type='email' name='email' id='email'  value={email} className="w-full text-sm
                 text-gray-800 border border-gray-300 px-3 py-3 rounded-lg outline-blue-600"  onChange={(e) => setEmail(e.target.value)}  required
               aria-label="Email" style={{"paddingLeft":"2.75rem"}}/>
              </div>

            </div>
            <button type='submit' className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>Send Reset Link</button>
          </form>
          <div className='text-sm text-center text-gray-500'>Privacy Policy | Terms of Service</div>
          <div className='flex justify-center space-x-4 mt-4'>
            <FaFacebook className='text-xl text-gray-600 cursor-pointer' />
            <FaTwitter className='text-xl text-gray-600 cursor-pointer' />
            <FaLinkedin className='text-xl text-gray-600 cursor-pointer' />
          </div>
        </div>
      </main>
    </div>
  );
}

export default RecoverPassword;