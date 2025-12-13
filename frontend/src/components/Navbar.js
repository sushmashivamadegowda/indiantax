import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="bg-gray-800/80 backdrop-blur-md border-b border-gray-700 fixed w-full z-50 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0">
                            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                                TaxCalc
                            </span>
                        </Link>
                    </div>

                    <div className="flex items-center space-x-6">
                        {/* Navigation Links - Moved to Right */}
                        <div className="hidden md:flex items-center space-x-4">
                            <Link
                                to="/"
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/') ? 'text-white bg-gray-900' : 'text-gray-300 hover:text-white hover:bg-gray-700'}`}
                            >
                                Home
                            </Link>
                            <Link
                                to="/how-it-works"
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/how-it-works') ? 'text-white bg-gray-900' : 'text-gray-300 hover:text-white hover:bg-gray-700'}`}
                            >
                                Learn
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Secondary Toolbar for Tools */}
            <div className="border-t border-gray-700/50 bg-gray-900/60 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Centered container with increased padding/visibility */}
                    <div className="flex items-center justify-center space-x-6 overflow-x-auto no-scrollbar py-4">
                        {[
                            { name: 'Income Tax', path: '/calculator', color: 'indigo' },
                            { name: 'GST', path: '/gst-calculator', color: 'pink' },
                            { name: 'Salary', path: '/salary-breakdown', color: 'green' },
                            { name: 'HRA', path: '/hra-calculator', color: 'purple' },
                            { name: 'Advance Tax', path: '/advance-tax-calculator', color: 'blue' },
                            { name: 'TDS', path: '/tds-calculator', color: 'teal' },
                            { name: '80C', path: '/80c-calculator', color: 'orange' },
                            { name: 'Composition', path: '/composition-scheme-calculator', color: 'cyan' },
                        ].map((tool) => (
                            <Link
                                key={tool.name}
                                to={tool.path}
                                className={`
                                    whitespace-nowrap px-5 py-2 rounded-full text-sm font-bold border transition-all duration-300 flex-shrink-0
                                    ${isActive(tool.path)
                                        ? `bg-${tool.color}-500/20 text-${tool.color}-300 border-${tool.color}-500/50 shadow-[0_0_15px_rgba(0,0,0,0.4)] shadow-${tool.color}-500/30 scale-105`
                                        : `bg-gray-800 text-gray-300 border-gray-600 hover:border-${tool.color}-500/50 hover:text-${tool.color}-300 hover:bg-gray-800 hover:shadow-lg hover:shadow-${tool.color}-500/20`
                                    }
                                `}
                            >
                                {tool.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
