import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { BASE_URL } from "../../constants";

export default function OtuVerify() {


    const [formData, setFormData] = useState({ code: "" ,email:""});
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const email = useLocation()?.state?.email
    

    useEffect(() => {
       setFormData({ email }); 
    },[])

    const handleSubmit = async (e) => {

        e.preventDefault()

        if(!formData?.email){
            toast.error('Email is required', { toastId: "register-error-email" })
            return
        }

        try {
            const response = await fetch(`${BASE_URL}/auth/verify/otp`, {
                method:"POST",
                credentials:"include",
                headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(formData)
            })

            const data = await response.json();
            if (!data.success) {
                toast.error(data.message, { toastId: "register-error-message" })
                return
            }
            toast.success('Success', { toastId: "register-success" })
            navigate('/change-pass',{state:{email:formData.email}});
              
        } catch (error) {
            toast.error(error.message, { toastId: "register-error-500" });
        }

    }


    const handleForgotPassword = async () => {
        if (!formData.email) return toast.error('Please enter your email', { toastId: "forgot-password-error" });
        try {
          const response = await fetch(`${BASE_URL}/auth/verify`, {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: formData.email })
          })
    
          const data = await response.json();
          if (!data.success) {
            toast.error(data.message, { toastId: "register-error-message" })
            setLoading(false);
            return
          }
          toast.success('Verification code sent', { toastId: "register-success" })
          setLoading(false);
        } catch (error) {
          toast.error(error.message, { toastId: "register-error-500" });
          setLoading(false);
        }
      }


    return <>
        <ToastContainer />
        <div className='pt-5 px-2'>
            <Link to={'/'} className="bg-blue-600 text-white p-3 rounded">
                &larr; Go to Home
            </Link>
        </div>

        <form onSubmit={handleSubmit} className='max-w-lg w-full mx-auto mt-10 px-4'>


            <h1 className="text-3xl w-full text-center font-semibold mb-2">OTP Verification</h1>


            <input type="text" name='code' onChange={(e) => { setFormData({ ...formData, code: e.target.value }) }} className="w-full p-3 border rounded" placeholder="Enter the verification code" />
            <button type='submit' className="bg-blue-800 w-full text-white p-3 rounded mt-3">Submit</button>
        </form>
            {/* <p className="w-full text-center text-blue-500 p-3 rounded mt-3">Didn't receive the code? <button className="underline cursor-pointer" onClick={handleForgotPassword} >Resend</button></p> */}

    </>
}
