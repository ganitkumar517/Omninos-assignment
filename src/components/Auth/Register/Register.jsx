import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRegisterMutation } from '../../../store/Api';
import toast from 'react-hot-toast';

export default function Register() {
    const navigate = useNavigate()
    const [email, setEmail] = useState();
    const [userId, setUserId] = useState();
    const [password, setPassword] = useState();
    const [register, { isLoading }] = useRegisterMutation();
    const handleRegister = () => {
        if (!email) {
            toast.error("email is required")
            return
        }
        else if (!userId) {
            toast.error("userId is required")
            return
        }
        else if (!password) {
            toast.error("password is required")
            return
        }
        else {
            register({ email, userId, password })
                .unwrap()
                .then(() => {
                    toast.success("Registration Successfully")
                    navigate("/login")
                })
                .catch((res) => toast.error(res?.data?.message));
        }
    }
    return (
        <div className='flex justify-center items-center h-screen'>
            <div className='w-72  bg-slate-300 shadow-2xl border border-black-1 text-center p-4 gap-6 flex flex-col rounded-2xl justify-center'>
                <div className='flex flex-col gap-1'>
                    <label className='font-semibold'>Email Id</label>
                    <input type='email' className='rounded-lg p-2' placeholder='Enter your Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className='flex flex-col gap-1'>
                    <label className='font-semibold'>User Id</label>
                    <input type='text' className='rounded-lg p-2' placeholder='Enter your User Id' value={userId} onChange={(e) => setUserId(e.target.value)} />
                </div>
                <div className='flex flex-col gap-1'>
                    <label className='font-semibold'>Password</label>
                    <input type='password' className='rounded-lg p-2' placeholder='Enter New Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button className='bg-blue-500 p-2 rounded-xl hover:bg-blue-300' onClick={handleRegister} disabled={isLoading}>{isLoading ? <>Loading...</> : <>Sign Up</>}</button>
                <div onClick={() => navigate("/login")} className='text-blue-500 cursor-pointer'>Log In</div>
            </div>
        </div>
    )
}
