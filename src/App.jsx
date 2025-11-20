import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Analytics from "./pages/admin/Analytics";
import Customer from "./pages/admin/Customer";
import SalesOrder from "./pages/admin/SalesOrder";
import Quotaion from "./pages/admin/Quotaion";
import Navbar from "./components/Layouts/Navbar";
import Footer from "./components/Layouts/Footer";
import AdminLayout from "./components/Layouts/AdminLayout";
import { useLocation } from "react-router-dom";
import NotFoundPage from "./pages/notFound";
import Inquiry from "./pages/admin/Inquiry";
import { Toaster } from 'sonner';
import CPO from "./pages/admin/CPO";

function App() {
  const location = useLocation();

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <div className={location.pathname.includes('/admin') ? 'hidden' : 'block'}>
          <Navbar />
        </div>

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Analytics />} />
              <Route path="customer" element={<Customer />} />
              <Route path="inquiry" element={<Inquiry />} />
              <Route path="quotation" element={<Quotaion />} />
              <Route path="customer-purchase-order" element={<CPO />} />
              <Route path="sales-order" element={<SalesOrder />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        <div className={location.pathname.includes('/admin') ? 'hidden' : 'block'}>
          <Footer />
        </div>
        <Toaster position="top-center" richColors expand visibleToasts={1} />
      </div>
    </>
  )
}

export default App
