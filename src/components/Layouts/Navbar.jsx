import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className='border-b border-gray-300 py-4 text-center flex justify-between items-center max-w-6xl mx-auto w-full px-10'>
      <h2 className='font-bold text-2xl'>
        <NavLink to="/">
          NH Manager
        </NavLink>
      </h2>
      <ul className='flex gap-4'>
        <li>
          <NavLink to="/admin" className='hover:text-gray-500'>
            Admin
          </NavLink>
        </li>
        <li>
          <NavLink to="/" className='hover:text-gray-500'>
            Home
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar