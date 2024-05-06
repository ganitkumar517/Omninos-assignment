import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDecodeTokenMutation } from '../../../store/Api';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate();
  const [decodeToken, { data, isLoading }] = useDecodeTokenMutation();
  useEffect(() => {
    decodeToken({ token: localStorage.getItem('token') })
  }, [localStorage.getItem('token')])

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/')
  }
  if (isLoading) {
    return <div>loading</div>
  }
  return (
    <div className='bg-slate-200 p-4 flex justify-between items-center px-10'>
      <p className='text-3xl font-bold font-mono'>Fire AI</p>
      <div className='flex items-center gap-4'>
        <div className='rounded-full bg-slate-500 p-3 cursor-pointer'><svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="currentColor" d="M17 18c-1.11 0-2 .89-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2M1 2v2h2l3.6 7.59l-1.36 2.45c-.15.28-.24.61-.24.96a2 2 0 0 0 2 2h12v-2H7.42a.25.25 0 0 1-.25-.25q0-.075.03-.12L8.1 13h7.45c.75 0 1.41-.42 1.75-1.03l3.58-6.47c.07-.16.12-.33.12-.5a1 1 0 0 0-1-1H5.21l-.94-2M7 18c-1.11 0-2 .89-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2"></path></svg></div>
        <div className='rounded-full w-12 h-12 text-center bg-slate-500 flex items-center justify-center cursor-pointer relative' onClick={() => setIsOpen(!isOpen)}>
          <p>{data?.decoded?.name?.substring(0, 3)}</p>
          {isOpen && (
            <div className='absolute p-2 border bg-slate-50 top-14 rounded-xl shadow-2xl'>
              <p className='w-28 whitespace-nowrap text-ellipsis overflow-hidden'>{data?.decoded?.name}</p>
              <p className='w-28 whitespace-nowrap text-ellipsis overflow-hidden'>{data?.decoded?.email}</p>
              <button className='w-full p-2 rounded-xl hover:bg-slate-400 text-sm text-red-400' onClick={handleLogout}>
                Logout
              </button>
            </div>
          )
          }
        </div>
      </div>
    </div>
  )
}
