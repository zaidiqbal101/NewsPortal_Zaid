import React from 'react';

const Latest = ({ latestArticles = [] }) => {
    return (
        <section id="latest" className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-4xl font-light text-center text-gray-800 mb-16">
                    Latest Articles
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {latestArticles.length > 0 ? (
                        latestArticles.map((article, index) => (
                            <ArticleCard key={article.id || index} article={article} index={index} />
                        ))
                    ) : (
                        <>
                            <ArticleCard 
                                article={{
                                    category: 'Technology',
                                    title: 'AI Revolution: Impact on Indian Tech Industry',
                                    excerpt: 'Exploring how artificial intelligence is transforming the technological landscape in India...',
                                    author: 'Tech Desk',
                                    time: '4 hours ago',
                                    image_text: 'Technology'
                                }}
                                index={0}
                            />
                            <ArticleCard 
                                article={{
                                    category: 'Economy',
                                    title: 'Budget 2025: Key Takeaways for Middle Class',
                                    excerpt: 'Breaking down the latest budget announcements and their implications for Indian households...',
                                    author: 'Economics Team',
                                    time: '8 hours ago',
                                    image_text: 'Economy'
                                }}
                                index={1}
                            />
                            <ArticleCard 
                                article={{
                                    category: 'Culture',
                                    title: 'Reviving Traditional Arts in Modern India',
                                    excerpt: 'How contemporary artists are bringing ancient Indian art forms to new audiences...',
                                    author: 'Culture Desk',
                                    time: '1 day ago',
                                    image_text: 'Culture'
                                }}
                                index={2}
                            />
                        </>
                    )}
                </div>
            </div>
        </section>
    );
};

const ArticleCard = ({ article, index }) => {
    const handleClick = () => {
        alert('Article would open here in a real implementation');
    };

    return (
        <article 
            className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer overflow-hidden animate-fade-in-up"
            style={{ animationDelay: `${index * 100}ms` }}
            onClick={handleClick}
        >
            <div className="h-48 bg-gradient-to-r from-blue-600 to-blue-500 flex items-center justify-center text-white font-medium text-lg">
                {article.image_text || 'News'}
            </div>
            <div className="p-6">
                <div className="text-blue-600 text-sm font-semibold uppercase tracking-wide mb-3">
                    {article.category}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4 leading-tight">
                    {article.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                    {article.excerpt}
                </p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>By {article.author}</span>
                    <span>{article.time}</span>
                </div>
            </div>
        </article>
    );
};

export default Latest;