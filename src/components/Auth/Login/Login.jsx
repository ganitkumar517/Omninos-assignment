import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLoginMutation } from '../../../store/Api';
import toast from 'react-hot-toast';
export default function Login() {
    const navigate = useNavigate();
    const [logIn, { isLoading }] = useLoginMutation();
    const [userId, setUserId] = useState();
    const [password, setPassword] = useState();

    const handleLogIn = () => {
        if (!userId) {
            toast.error("userId is required")
            return
        }
        else if (!password) {
            toast.error("password is required")
            return
        }
        else {
            logIn({ userId, password })
                .unwrap().then((res) => {
                    toast.success('Login Successfully!')
                    navigate('/dashboard')
                    localStorage.setItem("token", res?.token)
                })
                .catch((res) => toast.error(res?.data?.message))
        }
    }
    return (
        <div className='flex justify-center items-center h-screen'>
            <div className='w-72 h-80 bg-slate-300 shadow-2xl border border-black-1 text-center p-4 gap-6 flex flex-col rounded-2xl justify-center'>
                <div className='flex flex-col gap-1'>
                    <label className='font-semibold'>User Id</label>
                    <input type='text' className='rounded-lg p-2' placeholder='Enter your User Id' value={userId} onChange={(e) => setUserId(e.target.value)} />
                </div>
                <div className='flex flex-col gap-1'>
                    <label className='font-semibold'>Password</label>
                    <input type='password' className='rounded-lg p-2' placeholder='Enter your Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button className='bg-blue-500 p-2 rounded-xl hover:bg-blue-300' onClick={handleLogIn} disabled={isLoading}>{isLoading ? <>Loading</> : <>Login</>}</button>
                <div onClick={() => navigate("/signup")} className='text-blue-500 cursor-pointer'>sign up</div>
            </div>
        </div>
    )
}
