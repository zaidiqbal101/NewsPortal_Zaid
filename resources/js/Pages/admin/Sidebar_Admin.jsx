import React from 'react';
import { Link, usePage } from '@inertiajs/react';

const Sidebar = () => {
  const { url } = usePage();

  const navItems = [
    { name: 'Dashboard', route: 'admin.dashboard' },
    { name: 'Articles', route: 'admin.articles' },
    { name: 'Users', route: 'admin.users' },
  ];

  const isActive = (routeName) => route().current(routeName);

  return (
    <aside className="w-64 h-screen bg-white shadow-md p-6 border-r border-gray-200 flex flex-col">
      <h1 className="text-3xl font-bold text-blue-600 mb-10">NewsAdmin</h1>
      
      <nav className="flex flex-col gap-2">
        {navItems.map((item) => (
          <Link
            key={item.route}
            href={route(item.route)}
            className={`px-4 py-2 rounded-md transition-all duration-200 font-medium ${
              isActive(item.route)
                ? 'bg-blue-100 text-blue-600 font-semibold'
                : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
