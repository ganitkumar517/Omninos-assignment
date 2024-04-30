import React from 'react'
import Route from './Route/Index'
import './App.css'
import { Toaster } from 'react-hot-toast';

export default function App() {
  return (
    <div>
      <Toaster />
      <Route />
    </div>
  )
}
