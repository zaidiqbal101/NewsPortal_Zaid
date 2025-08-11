import React from 'react';
import { Inertia } from '@inertiajs/inertia';

const Header = () => {
  const handleLogout = () => {
    Inertia.post('/logout');
  };

  return (
    <header className="flex justify-end items-center mb-6">
      <div className="flex items-center gap-4">
        <img
          src="https://i.pravatar.cc/40"
          alt="Admin"
          className="w-10 h-10 rounded-full"
        />
        <span className="text-gray-600">Welcome, Admin</span>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;