import React from 'react';
import { Link } from '@inertiajs/react';

const FooterSection = ({ title, links }) => (
    <div>
        <h3 className="text-green-500 text-lg font-semibold mb-4">{title}</h3>
        <ul className="space-y-2">
            {links.map((link) => (
                <li key={link}>
                    <Link
                        href="#"
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        {link}
                    </Link>
                </li>
            ))}
        </ul>
    </div>
);

const Footer = () => (
    <footer className="bg-gray-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                <FooterSection title="Sections" links={['Politics', 'World', 'Economy', 'Science']} />
                <FooterSection title="About" links={['Our Mission', 'Editorial Team', 'Ethics Policy', 'Contact Us']} />
                <FooterSection title="Support" links={['Subscribe', 'Donate', 'Membership', 'FAQ']} />
                <FooterSection title="Legal" links={['Privacy Policy', 'Terms of Service', 'Copyright', 'Corrections']} />
            </div>
            <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
                <p>&copy; 2025 The Nikatby News. All rights reserved. | Independent journalism for a democratic India.</p>
            </div>
        </div>
    </footer>
);

export default Footer;
