import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { defaultRoute, router } from './config'
import Login from '../components/Auth/Index'

export default function Index() {
    return (
        <div>
            <BrowserRouter basename="/">
                <Routes>
                    <Route path={defaultRoute} element={<Login />} />
                    {router.map((route) => (
                        <>
                            <Route
                                key={route.path}
                                path={route.path}
                                element={<route.component />}
                            />
                            <Route path='*' element={<div>page not found</div>} />
                        </>
                    )
                    )}
                </Routes>
            </BrowserRouter>
        </div>
    )
}
