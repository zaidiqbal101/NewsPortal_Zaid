import React from 'react';
import { Link } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';

 const handleLogout = () => {
        Inertia.post('/logout');
    };

const Header = ({ isScrolled }) => {
    return (
        <header 
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${
                isScrolled 
                    ? 'bg-white/95 backdrop-blur-md shadow-lg' 
                    : 'bg-white shadow-sm'
            }`}
            style={{ borderBottom: '1px solid #e0e0e0' }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    <Link 
                        href="/" 
                        className="text-4xl font-bold text-green-600 hover:text-green-700 transition-colors"
                        style={{ fontFamily: 'Arial, sans-serif', letterSpacing: '-1px' }}
                    >
                        Nikatby News 
                    </Link>

                    <nav className="hidden md:flex space-x-8">
                        {['Politics', 'World', 'Economy', 'Science'].map((item) => (
                            <Link
                                key={item}
                                href={`/${item.toLowerCase()}`}
                                className="text-gray-800 hover:text-green-600 font-medium text-sm uppercase tracking-wide transition-colors"
                            >
                                {item}
                            </Link>
                        ))} 
                    </nav>

                    <Link
                        href="/subscribe"
                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded transition-all transform hover:-translate-y-0.5"
                    >
                        Subscribe
                    </Link>

                      <button
                    onClick={handleLogout}
                    className="px-6 py-2 bg-red-500 text-white p-2 rounded hover:bg-red-600"
                >
                    Logout
                </button>
                
                </div>
            </div>
        </header>
    );
};

export default Header;