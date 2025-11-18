import React from 'react'
import Navbar from '../../components/Layouts/Navbar'
import Table from '../../components/Reusable/Table'

const Customer = () => {
  return (
    <div className="bg-white">
      <main className="">
        <h1 className="text-4xl font-semibold text-gray-900 mb-8">Customers</h1>

        {/* Customer Info Form */}
        <section className="">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-gray-700 font-medium">Name</label>
              <input
                type="text"
                id="name"
                placeholder="Enter name..."
                className="border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="code" className="text-gray-700 font-medium">Code</label>
              <input
                type="text"
                id="code"
                placeholder="Optional..."
                className="border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="credit" className="text-gray-700 font-medium">Credit Limit</label>
              <input
                type="text"
                id="credit"
                placeholder="Optional..."
                className="border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="billing" className="text-gray-700 font-medium">Billing Address</label>
              <textarea
                id="billing"
                rows={4}
                placeholder="Billing Address..."
                className="border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              ></textarea>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="shipping" className="text-gray-700 font-medium">Delivery Address</label>
              <textarea
                id="shipping"
                rows={4}
                placeholder="Delivery Address..."
                className="border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              ></textarea>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-gray-700 font-medium">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter email..."
                className="border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="image" className="text-gray-700 font-medium">Image</label>
              <input
                type="file"
                id="image"
                className="border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button className="bg-emerald-500 text-white px-6 py-3 rounded-2xl font-semibold hover:bg-emerald-600 transition">
              Save Customer
            </button>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Customer
