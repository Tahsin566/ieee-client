import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../constants';
import { toast, ToastContainer } from 'react-toastify';

const SignUp = () => {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [otpInputOpen, setOtpInputOpen] = useState(false);


  const [formData, setFormData] = useState({
    username: '',
    email: '',
    memberType: 'local',
    facebook: '',
    linkedin: '',
    IEEEID: '',
    password: '',
    confirmPassword: '',
    code: ''
  });
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'radio' ? e.target.id : value
    }));
  };



  const handleSubmit = async (e) => {

    e.preventDefault();
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match', { toastId: "register-error-password" })
      return
    }


    try {

      const response = await fetch(`${BASE_URL}/auth`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json();
      if (!data.success) {
        toast.error(data.message, { toastId: "register-error-message" })
        setLoading(false);
        return
      }
      toast.success('Registered successfully', { toastId: "register-success" })
      setLoading(false);
      navigate('/', { replace: true });

    } catch (error) {
      toast.error(error.message, { toastId: "register-error-500" });
      setLoading(false);
    }
  }

  const handleVerification = async (e) => {

    e.preventDefault();
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match', { toastId: "register-error-password" })
      setLoading(false);
      return
    }

    const emailregex = /^[a-z0-9_\.]+@(?:gmail\.com|lus\.ac\.bd)$/i

    const localregex = /^lm\d{5,}$/

    const usernameregex = /^[a-zA-Z .]{4,}$/

    const IEEEIDregex = formData.memberType?.toLowerCase()?.trim() === 'local' ? localregex : /^[0-9]+$/

    if (!emailregex.test(formData.email) && formData.email) {
      toast.error('invalid email', { toastId: "register-error-email" })
      setLoading(false);
      return
    }

    if (!usernameregex.test(formData.username) && formData.username) {
      toast.error('username can contain only alphabets and numbers and must be atleast 3 characters long', { toastId: "register-error-username" })
      setLoading(false);
      return
    }

    if (!(IEEEIDregex.test(formData.IEEEID)) && formData.IEEEID) {
      toast.error(`invalid IEEE ID, ${formData.memberType?.toLowerCase() === "local" ? 'IEEE ID must be of 5 digits at least and start with lm for local members' : 'IEEE ID must be number for global members'}`, { toastId: "register-error-IEEEID" })
      setLoading(false);
      return
    }




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
      setOtpInputOpen(true);
      setLoading(false);
    } catch (error) {
      toast.error(error.message, { toastId: "register-error-500" });
      setLoading(false);
    }
    finally {
      setLoading(false);
    }
  }



  if (otpInputOpen) {
    return (
      <>
        <ToastContainer />
        <div className='pt-5 px-2'>
          <Link to={'/'} className="bg-blue-600 text-white p-3 rounded">
            &larr; Go to Home
          </Link>
        </div>

        <form onSubmit={handleSubmit} className='max-w-lg w-full mx-auto mt-10 px-4'>


          <h1 className="text-3xl font-semibold mb-2">Enter the verification code</h1>


          <input type="text" name='code' onChange={(e) => { setFormData({ ...formData, code: e.target.value }) }} className="w-full p-3 border rounded" placeholder="Enter the verification code" />
          <button type='submit' className="bg-blue-800 w-full text-white p-3 rounded mt-3">Submit</button>

        </form>
      </>
    )
  }



  return (

    <>

      <div className='pt-5 px-2'>
        <Link to={'/'} className="bg-blue-600 text-white p-3 rounded">
          &larr; Go to Home
        </Link>
      </div>

      <section className=" min-h-screen flex items-center justify-center p-6 -z-10">
        <ToastContainer />

        <div className="max-w-lg w-full ">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-semibold mb-2">Register Now</h1>
            <p className="text-gray-600 mb-6">
              Join us and be part of a vibrant community. Sign up now to unlock exclusive content and features!
            </p>
          </div>
          <div className="bg-white p-6 text-center  rounded-lg shadow-lg overflow-hidden">

            <div className="bg-white p-6 rounded-lg">
              <form onSubmit={handleVerification} className="space-y-1">
                <div className="text-left">
                  <label htmlFor="name" className="block mb-2 text-gray-700">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="username"
                    placeholder="Name"
                    className="w-full border border-gray-300 rounded p-2"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    required
                  />
                </div>

                <div className="text-left">
                  <label htmlFor="email" className="block mb-2 text-gray-700">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    className="w-full border border-gray-300 rounded p-2"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value.toLowerCase() })}
                    required
                  />
                </div>


                <div className="text-left">
                  <label className="block mb-2 text-gray-700">Member type</label>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="global"
                        name="memberType"
                        className="mr-2"
                        checked={formData.memberType === 'global'}
                        onChange={handleChange}
                      />
                      <label htmlFor="global" className="text-gray-700">Global Member</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="local"
                        name="memberType"
                        className="mr-2"
                        checked={formData.memberType === 'local'}
                        onChange={handleChange}
                      />
                      <label htmlFor="local" className="text-gray-700">Local Member</label>
                    </div>
                  </div>
                </div>



                <div className="text-left">
                  <label htmlFor="IEEEID" className="block mb-2 text-gray-700">{formData.memberType === 'local' ? 'IEEE CS LU SBC ID' : 'IEEE ID'}</label>
                  <input
                    type="text"
                    id="IEEEID"
                    name="IEEEID"
                    placeholder={formData.memberType === 'local' ? 'IEEE CS LU SBC ID' : 'IEEE ID'}
                    className="w-full border border-gray-300 rounded p-2"
                    value={formData.IEEEID}
                    onChange={(e) => setFormData({ ...formData, IEEEID: e.target.value })}
                    required
                  />
                </div>


                <div className="text-left">
                  <label htmlFor="password" className="block mb-2 text-gray-700">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    className="w-full border border-gray-300 rounded p-2"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                  />
                </div>

                <div className="text-left">
                  <label htmlFor="confirmPassword" className="block mb-2 text-gray-700">Confirm Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    className="w-full border border-gray-300 rounded p-2"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    required
                  />
                </div>

                {!loading ? <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#045C99] hover:bg-blue-700 text-white py-2 px-4 rounded"
                >
                  Sign Up
                </button> : <button
                  disabled={loading}
                  className="w-full bg-[#045C99] hover:bg-blue-700 text-white py-2 px-4 rounded"
                >
                  loading
                </button>}

                <p className="text-center text-sm text-gray-600 mt-4">
                  Already have an account?{' '}
                  <Link to="/signin" className="text-blue-600 hover:underline">
                    Sign In
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUp;