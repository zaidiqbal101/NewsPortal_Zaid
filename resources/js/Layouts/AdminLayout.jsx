import React from 'react';
import Header from '../Pages/admin/Header_Admin';
import Sidebar from '../Pages/admin/Sidebar_Admin';
import Footer from '../Pages/admin/Footer_Admin';

const AdminLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <main className="flex-1 px-6 pt-6"> {/* ✅ Add top padding here (pt-6) */}
          <Header />
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default AdminLayout;
