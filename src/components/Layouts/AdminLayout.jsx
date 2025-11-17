import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Footer from './Footer'
import Navbar from './Navbar'

const AdminLayout = () => {
    return (
        <div className="flex">
            {/* LEFT SIDEBAR (never re-renders) */}
            <Sidebar />

            {/* MAIN CONTENT (changes on URL change) */}
            <div className="flex-1 flex flex-col">
                <Navbar />
                <div className='flex-1 overflow-auto p-6'>
                    <Outlet />
                </div>
                <Footer />
            </div>
        </div>
    )
}

export default AdminLayout