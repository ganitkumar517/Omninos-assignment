import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Register() {
    const navigate = useNavigate()
    return (
        <div className='flex justify-center items-center h-screen'>
            <div className='w-72  bg-slate-300 shadow-2xl border border-black-1 text-center p-4 gap-6 flex flex-col rounded-2xl justify-center'>
                <div className='flex flex-col gap-1'>
                    <label className='font-semibold'>Email Id</label>
                    <input type='email' className='rounded-lg p-2' placeholder='Enter your Email' />
                </div>
                <div className='flex flex-col gap-1'>
                    <label className='font-semibold'>User Id</label>
                    <input type='text' className='rounded-lg p-2' placeholder='Enter your User Id' />
                </div>
                <div className='flex flex-col gap-1'>
                    <label className='font-semibold'>Password</label>
                    <input type='password' className='rounded-lg p-2' placeholder='Enter New Password' />
                </div>
                <button className='bg-blue-500 p-2 rounded-xl hover:bg-blue-300'>Sign Up</button>
                <div onClick={() => navigate("/login")} className='text-blue-500 cursor-pointer'>Log In</div>
            </div>
        </div>
    )
}
