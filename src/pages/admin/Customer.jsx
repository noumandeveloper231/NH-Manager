import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Layouts/Navbar';
import { toast } from 'sonner';

const Customer = () => {
  const [currentPage, setCurrentPage] = useState(1); // current page number
  const rowsPerPage = 5; // how many rows per page
  const indexOfLast = currentPage * rowsPerPage; // e.g. page 1: 1*5=5
  const indexOfFirst = indexOfLast - rowsPerPage; // 5-5=0

  // Single state object for form data
  // const [formData, setFormData] = useState({
  //   id: Date.now(),
  //   name: '',
  //   code: '',
  //   credit: '',
  //   billing: '',
  //   shipping: '',
  //   email: '',
  //   image: null,
  // });
  // Single state object for form data
  const [formData, setFormData] = useState({
    id: Date.now(),
    name: '',
    code: '',
    credit: '',
    billing: '',
    shipping: '',
    email: '',
    image: null,
  });

  // Load customers from customer.json on mount
  const [customers, setCustomers] = useState([]);
  useEffect(() => {
    fetch('/customer.json')
      .then(res => res.json())
      .then(data => setCustomers(data))
      .catch(err => console.error('Failed to load customers:', err));
  }, []);

  // Customers array for table rendering

  const currentCustomers = customers.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(customers.length / rowsPerPage);

  // Handle input changes
  const handleChange = (e) => {
    const { id, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: files ? files[0] : value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Customer added successfully!');

    // Reset form
    setFormData({
      id: Date.now(),
      name: '',
      code: '',
      credit: '',
      billing: '',
      shipping: '',
      email: '',
      image: null,
    });
  };

  function handleDelete(id) {
    console.log(id)
    console.log(customers)
    const updatedCustomers = customers.filter(customer => customer.id !== id)
    setCustomers(updatedCustomers)
    localStorage.setItem("customerData", JSON.stringify(updatedCustomers));
    toast.success('Customer deleted successfully!');
  }

  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <main className="max-w-6xl mx-auto p-6">
        <h1 className="text-4xl font-semibold text-gray-900 mb-8">Customers</h1>

        {/* Customer Form */}
        <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-2xl shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-gray-700 font-medium">Name</label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter name..."
                className="border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="code" className="text-gray-700 font-medium">Code</label>
              <input
                type="text"
                id="code"
                value={formData.code}
                onChange={handleChange}
                placeholder="Optional..."
                className="border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="credit" className="text-gray-700 font-medium">Credit Limit</label>
              <input
                type="text"
                id="credit"
                value={formData.credit}
                onChange={handleChange}
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
                value={formData.billing}
                onChange={handleChange}
                placeholder="Billing Address..."
                className="border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              ></textarea>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="shipping" className="text-gray-700 font-medium">Delivery Address</label>
              <textarea
                id="shipping"
                rows={4}
                value={formData.shipping}
                onChange={handleChange}
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
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email..."
                className="border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="image" className="text-gray-700 font-medium">Image</label>
              <input
                type="file"
                id="image"
                onChange={handleChange}
                className="border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              className="bg-emerald-500 text-white px-6 py-3 rounded-2xl font-semibold hover:bg-emerald-600 transition"
            >
              Save Customer
            </button>
          </div>
        </form>

        {/* Customer Table */}
        <table className="mt-10 rounded-2xl min-w-full bg-white border-collapse ">
          <thead>
            <tr className='text-center text-white bg-blue-500 border-b border-gray-200'>
              <th className="font-medium uppercase py-4">#</th>
              <th className="font-medium uppercase py-4">Name</th>
              <th className="font-medium uppercase py-4">Email</th>
              <th className="font-medium uppercase py-4">Code</th>
              <th className="font-medium uppercase py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentCustomers.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-500">
                  No customers added yet.
                </td>
              </tr>
            ) : (
              currentCustomers.map((customer, index) => (
                <tr key={index}
                  className='hover:bg-indigo-50/50 border-t border-gray-300 transition duration-150 ease-in-out'
                >
                  <td className="px-6 py-3 font-semibold text-gray-800">{index + 1}</td>
                  <td className="px-6 py-3 text-gray-800">{customer.name}</td>
                  <td className="px-6 py-3 text-gray-800">{customer.email}</td>
                  <td className="px-6 py-3 text-gray-800">{customer.code}</td>
                  <td className="px-6 py-3 text-gray-800">
                    <button className="text-blue-500 hover:underline mr-2">Edit</button>
                    <button onClick={() => handleDelete(customer.id)} className="text-red-500 hover:underline">Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <div className="w-full py-4 border-b border-t border-gray-300 flex justify-end px-10 items-center gap-1">
          {/* Previous button */}
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-3 cursor-pointer py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          {/* Page numbers */}
          {(() => {
            const pages = [];
            const maxVisiblePages = 5;
            let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
            let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

            if (endPage - startPage + 1 < maxVisiblePages) {
              startPage = Math.max(1, endPage - maxVisiblePages + 1);
            }

            // First page
            if (startPage > 1) {
              pages.push(
                <button
                  key={1}
                  onClick={() => setCurrentPage(1)}
                  className="px-3 cursor-pointer py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  1
                </button>
              );
              if (startPage > 2) {
                pages.push(
                  <span key="ellipsis1" className="px-2 text-gray-500">
                    ...
                  </span>
                );
              }
            }

            // Visible pages
            for (let i = startPage; i <= endPage; i++) {
              pages.push(
                <span
                  key={i}
                  onClick={() => setCurrentPage(i)}
                  className={`px-3 cursor-pointer py-1 text-sm border rounded-md ${currentPage === i
                    ? "bg-[var(--primary-color)] text-white border-[var(--primary-color)]"
                    : "border-gray-300 hover:bg-gray-50"
                    }`}
                >
                  {i}
                </span>
              );
            }

            // Last page
            if (endPage < totalPages) {
              if (endPage < totalPages - 1) {
                pages.push(
                  <span key="ellipsis2" className="px-2 text-gray-500">
                    ...
                  </span>
                );
              }
              pages.push(
                <button
                  key={totalPages}
                  onClick={() => setCurrentPage(totalPages)}
                  className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  {totalPages}
                </button>
              );
            }

            return pages;
          })()}

          {/* Next button */}
          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="px-3 cursor-pointer py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </main>
    </div>
  );
};

export default Customer;
