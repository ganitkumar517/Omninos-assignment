import React, { Suspense, useEffect } from 'react'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import { defaultRoute, router, token } from './config'
import Login from '../components/Auth/Login/Index'

export default function Index() {

    function Validate({ Route }) {
        const navigate = useNavigate();
        useEffect(() => {
            if (localStorage.getItem('token')) {
                navigate('/dashboard')
            } else {
                navigate('/login')
            }
        }, [localStorage.getItem('token')])

        return <Route />
    }

    return (
        <div>
            <Suspense fallback={
                <div className="absolute top-1/2 left-1/2 ">
                    <div
                        className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]   "
                        role="status"
                    >
                        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                            Loading...
                        </span>
                    </div>
                </div>
            }
            >
                <BrowserRouter basename="/">
                    <Routes>
                        <Route path={defaultRoute} element={<Login />} />
                        {router.map((route) => (
                            <>
                                <Route
                                    key={route.path}
                                    path={route.path}
                                    element={<Validate Route={route.component} />}
                                />
                                <Route path='*' element={<div>page not found</div>} />
                            </>
                        )
                        )}
                    </Routes>
                </BrowserRouter>
            </Suspense >
        </div>
    )
}
