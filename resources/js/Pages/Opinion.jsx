import React from 'react';
import Header from '../components/Header';

const Opinion = () => {
    const newsItems = [
        {
            id: 1,
            title: "Rahul Gandhi to Host INDIA Bloc Leaders’ Meeting",
            summary: "Leader of Opposition Rahul Gandhi will host a dinner for INDIA bloc leaders on August 7, 2025, at his Delhi residence, followed by a protest march to the Election Commission headquarters on August 8, addressing concerns over voter roll revisions in Bihar.",
            date: "August 4, 2025",
            source: "The Hindu",
            image: "/images/news/arnab.png"
        },
        {
            id: 2,
            title: "Former Jharkhand CM Shibu Soren Passes Away",
            summary: "Shibu Soren, former Jharkhand Chief Minister, passed away at 81 after a long illness. His son, current CM Hemant Soren, announced the loss, marking a significant moment for Jharkhand’s political landscape.",
            date: "August 3, 2025",
            source: "The Indian Express",
            image: "/images/news/arnab.png"
        },
        {
            id: 3,
            title: "Congress Criticizes Centre Over Pahalgam Terror Attack",
            summary: "Congress MP Priyanka Gandhi questioned the Centre’s security measures following the Pahalgam terror attack, sparking debates in Lok Sabha about Operation Sindoor and electoral roll revisions in Bihar.",
            date: "August 3, 2025",
            source: "Business Standard",
            image: "/images/news/arnab.png"
        },
    ];

    return (
        <div className="min-h-screen bg-gray-100">
            <Header isScrolled={false} />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-20">
                <h1 className="text-4xl font-bold text-gray-800 mb-8">Opinion </h1>
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

export default Opinion;