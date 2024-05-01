import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDecodeTokenMutation } from '../../../store/Api';
import { token } from '../../../Route/config';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate();
  const [decodeToken, { data, isLoading }] = useDecodeTokenMutation();
  useEffect(() => {
    decodeToken({ token: token })
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/')
  }
  return (
    <div className='bg-slate-200 p-4 flex justify-between items-center px-10'>
      <p className='text-3xl font-bold font-mono'>Fire AI</p>
      <div className='rounded-full w-12 h-12 text-center bg-slate-500 flex items-center justify-center cursor-pointer relative' onClick={() => setIsOpen(!isOpen)}>
        {!isLoading &&
          <p>{data?.decoded?.userId?.substring(0, 3)}</p>
        }
        {isOpen && (
          <button className='absolute p-2 w-28 border bg-slate-50 top-14 rounded-xl shadow-2xl hover:bg-slate-400 text-sm text-red-400' onClick={handleLogout}>
            Logout
          </button>
        )
        }
      </div>
    </div>
  )
}
