import React from 'react'

export default function Login() {
    return (
        <div className='flex justify-center items-center h-screen'>
            <div className='w-72 h-80 bg-slate-300 shadow-2xl border border-black-1 text-center p-4 gap-6 flex flex-col rounded-2xl justify-center'>
                <div className='flex flex-col gap-1'>
                    <label className='font-semibold'>User Id</label>
                    <input type='text' className='rounded-lg p-2' />
                </div>
                <div className='flex flex-col gap-1'>
                    <label className='font-semibold'>Password</label>
                    <input type='password' className='rounded-lg p-2' />
                </div>
                <button className='bg-blue-500 p-2 rounded-xl hover:bg-blue-300'>Login</button>
            </div>
        </div>
    )
}
