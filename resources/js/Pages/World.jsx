import React from 'react';
import Header from '../components/Header';
import { usePage } from '@inertiajs/react';

const World = () => {
    const { newsItems } = usePage().props;

    return (
        <div className="min-h-screen bg-gray-100">
            <Header isScrolled={false} />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-20">
                <h1 className="text-4xl font-bold text-gray-800 mb-8">World News</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {newsItems.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6"
                        >
                            {item.image && (
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-48 object-cover rounded-t-lg mb-4"
                                />
                            )}
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h2>
                            <p className="text-gray-600 mb-4">{item.summary}</p>
                            <div className="text-sm text-gray-500">
                                <span>{item.date}</span> | <span>Source: {item.source}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default World;
