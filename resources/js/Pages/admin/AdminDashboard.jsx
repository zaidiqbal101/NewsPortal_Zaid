import React from 'react';
import Header from './Header_Admin';
import Sidebar from './Sidebar_Admin';
import Footer from './Footer_Admin';

const AdminDashboard = () => {
  return (
    
    <div className="min-h-screen flex bg-gray-100">.
  
      <Sidebar />
       
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-6">
          <Header />
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white shadow rounded-lg p-5">
              <h3 className="text-gray-500">Total Articles</h3>
              <p className="text-2xl font-bold text-blue-600">120</p>
            </div>
            <div className="bg-white shadow rounded-lg p-5">
              <h3 className="text-gray-500">Published Today</h3>
              <p className="text-2xl font-bold text-green-600">8</p>
            </div>
            <div className="bg-white shadow rounded-lg p-5">
              <h3 className="text-gray-500">Categories</h3>
              <p className="text-2xl font-bold text-yellow-600">12</p>
            </div>
            <div className="bg-white shadow rounded-lg p-5">
              <h3 className="text-gray-500">Active Users</h3>
              <p className="text-2xl font-bold text-purple-600">345</p>
            </div>
          </section>
          <section className="mt-10">
            <h3 className="text-xl font-semibold mb-4">Latest Articles</h3>
            <div className="overflow-x-auto bg-white rounded-lg shadow">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">Title</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">Category</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="px-6 py-4">Breaking News: Market Crash</td>
                    <td className="px-6 py-4">Business</td>
                    <td className="px-6 py-4 text-green-600">Published</td>
                    <td className="px-6 py-4">2025-08-06</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4">Sports Update: Match Highlights</td>
                    <td className="px-6 py-4">Sports</td>
                    <td className="px-6 py-4 text-yellow-600">Pending</td>
                    <td className="px-6 py-4">2025-08-05</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4">New Policies by Govt</td>
                    <td className="px-6 py-4">Politics</td>
                    <td className="px-6 py-4 text-green-600">Published</td>
                    <td className="px-6 py-4">2025-08-04</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default AdminDashboard;