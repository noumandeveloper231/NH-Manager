import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Layouts/Navbar';
import { toast } from 'sonner';

const Inquiry = () => {
  const [formData, setFormData] = useState({
    id: Date.now(),
    issueData: '',
    expireDate: '',
    reference: '',
    inquiryType: '',
    customer: '', // store customer ID
    title: '',
    billing: '',
    desc: '',
    products: [
      {
        desc: '',
        qty: '',
      },
    ],
    image: null,
  });

  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetch('/customer.json')
      .then(res => res.json())
      .then(data => setCustomers(data))
      .catch(err => console.error('Failed to load customers:', err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Customer added successfully!');
    console.log(formData);

    // Reset form
    setFormData({
      id: Date.now(),
      issueData: '',
      expireDate: '',
      reference: '',
      inquiryType: '',
      customer: '',
      billing: '',
      title: '',
      desc: '',
      products: [{ desc: '', qty: '' }],
      image: null,
    });
  };

  // Get the selected customer object
  const selectedCustomer = customers.find(c => c.id === formData.customer);

  return (
    <div className="bg-white min-h-screen">
      <main className="max-w-6xl mx-auto p-6">
        <h1 className="text-4xl font-semibold text-gray-900 mb-8">Inquiry</h1>
      </main>
      <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-2xl shadow-md">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="issueData" className="text-gray-700 font-medium">Issue Date</label>
            <input
              type="date"
              id="issueData"
              value={formData.issueData}
              onChange={(e) => setFormData({ ...formData, issueData: e.target.value })}
              className="border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="expireDate" className="text-gray-700 font-medium">Expire Date</label>
            <input
              type="date"
              id="expireDate"
              value={formData.expireDate}
              onChange={(e) => setFormData({ ...formData, expireDate: e.target.value })}
              className="border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="reference" className="text-gray-700 font-medium">Reference</label>
            <input
              type="text"
              id="reference"
              value={formData.reference}
              onChange={(e) => setFormData({ ...formData, reference: e.target.value })}
              className="border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="inquiryType" className="text-gray-700 font-medium">Inquiry Type</label>
            <select
              id="inquiryType"
              value={formData.inquiryType}
              onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
              className="border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            >
              <option value="">Select Type</option>
              <option value="sales">Local purchase</option>
              <option value="purchase">Foreign purchase</option>
            </select>
          </div>
        </div>

        <div className="grid gap-2 grid-cols-1 mt-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="customer" className="text-gray-700 font-medium">Customer</label>
            <select
              id="customer"
              value={formData.customer}
              onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
              className="border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            >
              <option value="">Select Customer</option>
              {customers.map(c => (
                <option key={c.id} value={c.id}>
                  {c.code} - {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="billing" className="text-gray-700 font-medium">Billing Address</label>
            <textarea
              id="billing"
              rows={4}
              value={formData.billing || selectedCustomer?.billing || ''}
              onChange={(e) => setFormData({ ...formData, billing: e.target.value })}
              placeholder="Billing Address..."
              className="border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            ></textarea>
          </div>


          <div className="flex flex-col gap-2 mt-2">
            <label htmlFor="title" className="text-gray-700 font-medium">Title</label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="flex flex-col gap-2 mt-2">
            <label htmlFor="desc" className="text-gray-700 font-medium">Description</label>
            <textarea
              id="desc"
              rows={4}
              value={formData.desc}
              onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
              className="border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            ></textarea>
          </div>
        </div>

        {/* Products Section */}
        <div className="md:col-span-2 mt-4">
          <label className="text-gray-700 font-medium mb-2 block">Products</label>
          <div className="space-y-3">
            {formData.products.map((p, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <input
                  type="text"
                  placeholder="Description"
                  value={p.desc}
                  onChange={(e) => {
                    const updated = [...formData.products];
                    updated[idx].desc = e.target.value;
                    setFormData({ ...formData, products: updated });
                  }}
                  className="flex-1 border border-gray-300 rounded-2xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <input
                  type="number"
                  placeholder="Qty"
                  value={p.qty}
                  onChange={(e) => {
                    const updated = [...formData.products];
                    updated[idx].qty = e.target.value;
                    setFormData({ ...formData, products: updated });
                  }}
                  className="w-24 border border-gray-300 rounded-2xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <button
                  type="button"
                  onClick={() => {
                    const updated = formData.products.filter((_, i) => i !== idx);
                    setFormData({ ...formData, products: updated });
                  }}
                  className="text-red-500 hover:text-red-700 font-semibold"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => setFormData({ ...formData, products: [...formData.products, { desc: '', qty: '' }] })}
              className="bg-emerald-500 text-white px-4 py-2 rounded-2xl hover:bg-emerald-600 transition"
            >
              + Add Product
            </button>
          </div>
        </div>

        {/* Image Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div className="flex flex-col gap-2 mt-2">
            <label htmlFor="image" className="text-gray-700 font-medium">Image</label>
            <input
              type="file"
              id="image"
              onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
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
    </div>
  );
};

export default Inquiry;
