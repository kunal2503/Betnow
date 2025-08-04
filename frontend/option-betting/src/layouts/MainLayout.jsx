import React from 'react'
import { Routes,Route } from 'react-router'
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Home from '../pages/Home'
import History from '../pages/History'
import Profile from '../pages/Profile'
import Orders from '../pages/Orders'

const MainLayout = () => {
  return (
    <div className='flex flex-col min-h-screen scroll-smooth '>
        <Navbar/>
        <div className='flex-grow'>
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/history' element={<History/>}/>
            <Route path='/profile/:id' element={<Profile/>}/>
            <Route path='/orders' element={<Orders/>}/>
        </Routes>
        </div>
        <Footer/>
    </div>
  )
}

export default MainLayout