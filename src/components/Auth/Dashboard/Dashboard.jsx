import React from 'react'
import Navbar from '../Navbar/Navbar'

export default function Dashboard() {
    return (
        <div>
            <Navbar />
            <div>
                <div className='flex justify-center mt-10 gap-4'>
                    <input type='text' className='border p-2 bg-slate-200 rounded-xl w-96' placeholder='Search'></input>
                    <button className='bg-blue-500 p-2 px-4 rounded-lg'>Search</button>
                </div>
                <div>

                </div>
            </div>
        </div>
    )
}
