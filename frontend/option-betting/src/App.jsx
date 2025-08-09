import React from 'react'
import {BrowserRouter, Route, Routes} from "react-router"
import Login from './pages/Login'
import Signup from './pages/Signup'
import ForgetPassword from './pages/ForgetPassword'
import MainLayout from './layouts/MainLayout'
import ResetPassword from './pages/ResetPassword'
import { Toaster } from "react-hot-toast"

const App = () => {
  return (
    <>
    
    <Toaster position='top-center'/>
    <BrowserRouter>
    <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/forget-password' element={<ForgetPassword/>}/>
      <Route path='/reset-password' element={<ResetPassword/>}/>
      <Route path='/*' element={<MainLayout/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App