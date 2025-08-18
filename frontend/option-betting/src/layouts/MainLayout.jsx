import React from 'react'
import { Routes, Route } from 'react-router'
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Home from '../pages/Home'
import History from '../pages/History'
import Profile from '../pages/Profile'
import Orders from '../pages/Orders'
import ProtectRoute from '../components/ProtectRoute'
import AddBalance from '../components/AddBalance'
import TransitionsHistory from '../pages/TransitionsHistory'
import PersonalInfo from '../components/PersonalInfo'
import Settings from '../components/Setting'
import CustomerSupport from '../components/CustomerSupport'

const MainLayout = () => {
  return (
    <div className='flex flex-col min-h-screen scroll-smooth'>
      <ProtectRoute>
          <Navbar />
          <div className='flex-grow'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/history' element={<History />} />
              <Route path='/profile/:id' element={<Profile />} />
              <Route path='/orders' element={<Orders />} />
              <Route path='/add-balance/:id' element={<AddBalance />} />
              <Route path='/transitions-history/:id' element={<TransitionsHistory />} />
              <Route path='/personal-info/:id' element={<PersonalInfo/>} />
              <Route path='/settings' element={<Settings/>} />
              <Route path='/support' element={<CustomerSupport/>} />
            </Routes>
          </div>
          <Footer />
      </ProtectRoute>
    </div>
  )
}

export default MainLayout
