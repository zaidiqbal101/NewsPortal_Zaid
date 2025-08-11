import React, { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';
import Stories from './Stories';

const Landing = ({ featuredStories = [] }) => {
    const [email, setEmail] = useState('');
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 100);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNewsletterSubmit = (e) => {
        e.preventDefault();
        if (email) {
            alert('Thank you for subscribing! You will receive our latest updates.');
            setEmail('');
        }
    };

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            <Head title="News Portal"/>

            <div className="min-h-screen bg-white">
                <Header isScrolled={isScrolled} scrollToSection={scrollToSection} />

                {/* Hero Section */}
                <section className="pt-24 pb-20 bg-gradient-to-br from-gray-50 to-gray-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-12">
                        <h1 className="text-5xl md:text-6xl font-light text-gray-800 mb-6 leading-tight">
                            Independent <span className="text-green-600 font-normal">Journalism</span><br />
                            for a Democratic India
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed">
                            Fearless reporting, rigorous analysis, and uncompromising coverage of the issues 
                            that matter most to India's democracy and society.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={() => scrollToSection('stories')}
                                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-medium transition-all transform hover:-translate-y-1 hover:shadow-xl"
                            >
                                Read Latest Stories
                            </button>
                            <button
                                onClick={() => scrollToSection('about')}
                                className="border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-8 py-4 rounded-lg font-medium transition-all transform hover:-translate-y-1"
                            >
                                Learn More
                            </button>
                        </div>
                    </div>
                </section>

                {/* Featured Stories */}
            <Stories featuredStories={featuredStories} />

                {/* Newsletter Section */}
                <section className="py-20 bg-gradient-to-r from-gray-800 to-gray-900 text-white">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-4xl font-light mb-6">Stay Informed</h2>
                        <p className="text-xl mb-10 opacity-90 leading-relaxed">
                            Get the most important stories delivered to your inbox. Join thousands of 
                            readers who trust The Nikatby for independent news.
                        </p>
                        
                        <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email address"
                                className="flex-1 px-6 py-4 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
                                required
                            />
                            <button
                                type="submit"
                                className="bg-green-600 hover:bg-green-700 px-8 py-4 rounded-lg font-medium transition-all transform hover:-translate-y-1"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </section>

                <Footer />
            </div>
        </>
    );
};

const StoryCard = ({ story, index }) => {
    const handleClick = () => {
        alert('Story would open here in a real implementation');
    };

    return (
        <article 
            className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer overflow-hidden animate-fade-in-up"
            style={{ animationDelay: `${index * 100}ms` }}
            onClick={handleClick}
        >
            <div className="h-48 bg-gradient-to-r from-green-600 to-green-500 flex items-center justify-center text-white font-medium text-lg">
                {story.image_text || 'News'}
            </div>
            <div className="p-6">
                <div className="text-green-600 text-sm font-semibold uppercase tracking-wide mb-3">
                    {story.category}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4 leading-tight">
                    {story.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                    {story.excerpt}
                </p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>By {story.author}</span>
                    <span>{story.time}</span>
                </div>
            </div>
        </article>
    );
};

export default Landing;
