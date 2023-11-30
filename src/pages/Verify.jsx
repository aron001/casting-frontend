import React, { useState } from 'react';
import axios from 'axios';
import { Link,useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { server } from '../server';
const VerifyOTP = () => {
  const [otp, setOTP] = useState('');
  const navigate = useNavigate();

  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer your_token', 
    
    // Example: Authorization header with a token
    // Add other headers as needed
  };
  const handleOTPChange = (e) => {
    setOTP(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
  
    try {
      await axios.post(`${server}/api/user/verify`,  {otp },{withCredentials:true} ).then(res=>{
        if(res.status===200){
          toast.success('you  sucussfully verified ',{
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          
          })
          navigate('/profile')
        }
   
      }).catch(error=>{
        const status =error.response.status
        if(status===401){
          toast.warning("your otp is expired ",{
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
      }
      if(status===404){
        toast.warning("user not found ",{
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
      })
    }
    if(status===400){
      toast.warning("Invalid OTP",{
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    })
  }

    });
     
       // Handle the response as needed
    } catch (error) {
      console.error(error); // Handle the error as needed
    }
  };

  return (
    <form onSubmit={handleSubmit} className=" p-6 md:p-20">
      <div>
<h3 className=' text-[42px]'>Alomost there </h3>
<p className=' text-[14px] text-[#ED7D31]'> we have sent you an email with verification OTP</p>
      </div>
<main className='absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] flex justify-center items-center flex-col w-full p-5 md:w-1/4'>
<div className=' w-full mt-20'> 
  <p className='text-[12px]'>Vitfay you're Email</p>
<input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={handleOTPChange}
        className="border border-gray-300 px-4 py-2 w-full mb-4 rounded-full"
      />
</div>
      <button
        type="submit"
        className="bg-[#ED7D31]  hover:bg-orange-600 text-white font-bold py-2 px-4 rounded mb-48"
      >
        Verify OTP
      </button>
</main>


    </form>
  );
};

export default VerifyOTP;
