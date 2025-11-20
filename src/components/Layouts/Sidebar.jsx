import { NavLink } from "react-router-dom"

const Sidebar = () => {
    return (
        <div className="w-64 bg-white text-black min-h-screen p-4 border-r border-gray-200">
            <h2 className="text-xl font-bold mb-6 text-center">NH Manager</h2>

            <nav className="flex flex-col gap-3">
                <NavLink to="/admin" className="hover:bg-gray-200 p-2 rounded transition-all">Analytics</NavLink>
                <NavLink to="/admin/customer" className="hover:bg-gray-200 p-2 rounded transition-all">Customer</NavLink>
                <NavLink to="/admin/inquiry" className="hover:bg-gray-200 p-2 rounded transition-all">Inquiry</NavLink>
                <NavLink to="/admin/quotation" className="hover:bg-gray-200 p-2 rounded transition-all">Quotaion</NavLink>
                <NavLink to="/admin/customer-purchase-order" className="hover:bg-gray-200 p-2 rounded transition-all">Customer Purchase Order</NavLink>
                <NavLink to="/admin/sales-order" className="hover:bg-gray-200 p-2 rounded transition-all">Sales Order</NavLink>
            </nav>
        </div>
    )
}

export default Sidebar
