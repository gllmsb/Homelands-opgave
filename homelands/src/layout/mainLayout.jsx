import React from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar } from '../components/Navbar/Navbar'
import { Footer } from '../components/Footer/Footer'

export const MainLayout = () => {
  return (
    <div>
        <Navbar />
        <main className='content' style={{marginTop: "80px", padding: "20px"}}>
            <Outlet />
        </main>
        <Footer />
    </div>
  )
}
