import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { BASE_URL } from '../../constants'

const EmailInput = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: ''
    })
    const [loading, setLoading] = useState(false);

    const handleForgotPassword = async (e) => {

        e.preventDefault()

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
            navigate(`/verify-otp`, { state: { email: formData.email } });
        } catch (error) {
            toast.error(error.message, { toastId: "register-error-500" });
            setLoading(false);
        }
    }

    return (
        <>
            <ToastContainer />
            <div className='pt-5 px-2'>
                <Link to={'/'} className="bg-blue-600 text-white p-3 rounded">
                    &larr; Go to Home
                </Link>
            </div>

            <form onSubmit={handleForgotPassword} className='max-w-lg w-full mx-auto mt-10 px-4'>


                <h1 className="text-3xl w-full text-center font-semibold mb-2">Enter your email</h1>


                <input type="text" name='code' onChange={(e) => { setFormData({ ...formData, email: e.target.value }) }} className="w-full p-3 border rounded" placeholder="Enter your email" required />
                <button type='submit' className="bg-blue-800 w-full text-white p-3 rounded mt-3">Send verification code</button>
            </form>
        </>
    )
}

export default EmailInput