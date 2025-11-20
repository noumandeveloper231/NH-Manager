import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Layouts/Navbar';
import { toast } from 'sonner';

const Quotation = () => {
  const [formData, setFormData] = useState({
    id: Date.now(),
    issueDate: '',
    validTillDate: '',
    inquiryReference: '',
    inquiry: '',
    customer: '',
    quotation: '',
    title: '',
    billing: '',
    desc: '',
    products: [],
    productsTotalPrice: '',
    remarks: '',
    image: null,
  });

  const [inquiryList, setInquiryList] = useState([]);
  const [customers, setCustomers] = useState([]);

  // Load inquiry
  useEffect(() => {
    fetch('/inquiry.json')
      .then(res => res.json())
      .then(data => setInquiryList(data))
      .catch(err => console.error('Failed to load inquiry:', err));
  }, []);

  // Load customers
  useEffect(() => {
    fetch('/customer.json')
      .then(res => res.json())
      .then(data => setCustomers(data))
      .catch(err => console.error('Failed to load customer:', err));
  }, []);

  // Get selected inquiry
  const selectedInquiry = inquiryList.find(i => i.id == formData.inquiry);

  // Auto-fill billing + products when inquiry changes
  useEffect(() => {
    if (!selectedInquiry) return;

    // Find matching customer
    const customerObj = customers.find(c => c.id === selectedInquiry.customer);

    setFormData(prev => ({
      ...prev,
      quotation: customerObj?.id || '',
      billing: customerObj?.billing || '',
      products: selectedInquiry.products || [],
    }));
  }, [formData.inquiry, customers]);

  const handleSubmit = (e) => {
    e.preventDefault();

    toast.success('Quotation saved successfully!');
    const finalData = {
      ...formData,
      productsTotalPrice: netTotal
    };

    toast.success("Quotation saved!");
    console.log(finalData);


    // Reset form
    setFormData({
      id: Date.now(),
      issueDate: '',
      validTillDate: '',
      inquiryReference: '',
      inquiry: '',
      customer: '',
      title: '',
      billing: '',
      desc: '',
      products: [],
      productsTotalPrice: '',
      remarks: '',
      image: null,
    });
  };

  // Calculate net total
  const netTotal = formData.products.reduce((sum, p) => {
    const qty = Number(p.qty) || 0;
    const unit = Number(p.unitPrice) || 0;
    return sum + qty * unit;
  }, 0);

  return (
    <div className="bg-white min-h-screen p-6">
      <h1 className="text-4xl font-semibold text-gray-900 mb-6">Quotation</h1>

      <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-2xl shadow-md space-y-6">

        {/* Dates */}
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="font-medium">Issue Date</label>
            <input
              type="date"
              value={formData.issueDate}
              onChange={e => setFormData({ ...formData, issueDate: e.target.value })}
              className="border rounded-2xl px-4 py-3"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-medium">Valid Till Date</label>
            <input
              type="date"
              value={formData.validTillDate}
              onChange={e => setFormData({ ...formData, validTillDate: e.target.value })}
              className="border rounded-2xl px-4 py-3"
            />
          </div>
        </div>

        {/* Inquiry */}
        <div className="flex flex-col gap-2">
          <label className="font-medium">Inquiry</label>
          <select
            value={formData.inquiry}
            onChange={e => setFormData({ ...formData, inquiry: e.target.value })}
            className="border rounded-2xl px-4 py-3"
            required
          >
            <option value="">Select Inquiry</option>
            {inquiryList.map(i => (
              <option key={i.id} value={i.id}>
                {i.id} - {i.title}
              </option>
            ))}
          </select>
        </div>

        {/* Customer */}
        <div className="flex flex-col gap-2">
          <label className="font-medium">Customer</label>
          <select
            value={formData.customer}
            onChange={e => setFormData({ ...formData, customer: e.target.value })}
            className="border disabled:bg-gray-100 disabled:cursor-not-allowed  rounded-2xl px-4 py-3"
            required
            disabled={
              formData?.inquiry
            }
          >
            <option value="">Select Customer</option>
            {customers.map(c => (
              <option key={c.id} value={c.id}>{c.code} - {c.name}</option>
            ))}
          </select>
        </div>

        {/* Billing */}
        <div className="flex flex-col gap-2">
          <label className="font-medium">Billing Address</label>
          <textarea
            rows={4}
            value={formData.billing}
            onChange={e => setFormData({ ...formData, billing: e.target.value })}
            className="border rounded-2xl px-4 py-3"
          ></textarea>
        </div>

        {/* Title */}
        <div className="flex flex-col gap-2">
          <label className="font-medium">Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={e => setFormData({ ...formData, title: e.target.value })}
            className="border rounded-2xl px-4 py-3"
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-2">
          <label className="font-medium">Description</label>
          <textarea
            rows={4}
            value={formData.desc}
            onChange={e => setFormData({ ...formData, desc: e.target.value })}
            className="border rounded-2xl px-4 py-3"
          ></textarea>
        </div>

        {/* Products */}
        {/* Products */}
        <div>
          <label className="font-medium">Products</label>
          <div className="space-y-3 mt-2">
            {formData.products?.map((p, idx) => (
              <div key={idx} className="flex gap-3 items-center">

                {/* Description */}
                <input
                  type="text"
                  placeholder="Description"
                  value={p.desc}
                  onChange={e => {
                    const updated = [...formData.products];
                    updated[idx].desc = e.target.value;
                    setFormData({ ...formData, products: updated });
                  }}
                  className="flex-1 border rounded-2xl px-4 py-2"
                />

                {/* Quantity */}
                <input
                  type="number"
                  placeholder="Qty"
                  value={p.qty}
                  onChange={e => {
                    const updated = [...formData.products];
                    updated[idx].qty = e.target.value;
                    setFormData({ ...formData, products: updated });
                  }}
                  className="w-24 border rounded-2xl px-4 py-2"
                />

                {/* Unit Price */}
                <div className="relative w-28">
                  <input
                    type="number"
                    placeholder="Unit"
                    value={p.unitPrice}
                    onChange={e => {
                      const updated = [...formData.products];
                      updated[idx].unitPrice = e.target.value;
                      setFormData({ ...formData, products: updated });
                    }}
                    className="border rounded-2xl px-4 py-2 w-full pr-10"
                  />
                  <span className="h-full flex items-center pl-1 border-l absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                    PKR
                  </span>
                </div>


                {/* Total Price (auto calculated) */}
                <div className='relative w-28'>
                  <input
                    type="number"
                    placeholder="Total"
                    value={p.qty && p.unitPrice ? p.qty * p.unitPrice : ''}
                    readOnly
                    className="w-28 border rounded-2xl px-4 py-2 bg-gray-100"
                  />
                  <span className="h-full flex items-center pl-1 border-l absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                    PKR
                  </span>
                </div>

                {/* Remove button */}
                <button
                  type="button"
                  onClick={() => {
                    const updated = formData.products.filter((_, i) => i !== idx);
                    setFormData({ ...formData, products: updated });
                  }}
                  className="text-red-500"
                >
                  Remove
                </button>
              </div>
            ))}

            {/* Add product button */}
            <button
              type="button"
              onClick={() =>
                setFormData({
                  ...formData,
                  products: [
                    ...formData.products,
                    { desc: '', qty: '', unitPrice: '' },
                  ],
                })
              }
              className="bg-emerald-500 text-white px-4 py-2 rounded-2xl"
            >
              + Add Product
            </button>
          </div>
        </div>

        {/* Net Total */}
        <div className="flex justify-end mt-6">
          <div className="flex items-center gap-3">
            <label className="font-medium text-lg">Net Total:</label>

            <div className="relative w-40">
              <input
                type="number"
                value={netTotal}
                readOnly
                className="border rounded-2xl px-4 py-2 w-full bg-gray-100 font-semibold"
              />
              <span className="h-full flex items-center pl-1 border-l absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                PKR
              </span>
            </div>
          </div>
        </div>



        {/* Remarks */}
        <div className="flex flex-col gap-2">
          <label className="font-medium">Remarks</label>
          <textarea
            rows={4}
            value={formData.remarks}
            onChange={e => setFormData({ ...formData, remarks: e.target.value })}
            className="border rounded-2xl px-4 py-3"
          ></textarea>
        </div>

        {/* Image */}
        <div className="flex flex-col gap-2">
          <label className="font-medium">Image</label>
          <input
            type="file"
            onChange={e => setFormData({ ...formData, image: e.target.files[0] })}
            className="border rounded-2xl px-4 py-3"
          />
        </div>

        <div className="flex justify-end">
          <button className="bg-emerald-500 text-white px-6 py-3 rounded-2xl font-semibold">
            Save Quotation
          </button>
        </div>
      </form>
    </div>
  );
};

export default Quotation;
