import React, { useState } from 'react';
import axios from 'axios';

const SavingsCalculator80C = () => {
    const [invested, setInvested] = useState('');
    const [result, setResult] = useState(null);

    const isValid = invested !== '' && !isNaN(invested);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!isValid) return;
            const response = await axios.post('http://localhost:8000/api/calculate-80c/', {
                invested: invested
            });
            setResult(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 py-12 px-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.1]" />
            <div className="absolute top-0 left-0 w-96 h-96 bg-orange-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob animation-delay-2000" />

            <div className="max-w-4xl mx-auto relative z-10">
                <h1 className="text-4xl font-bold text-center text-white mb-8">80C Tax Saver</h1>

                <div className="max-w-xl mx-auto mb-12">
                    <div className="bg-gray-800 rounded-xl p-8 shadow-xl border border-gray-700 backdrop-blur-sm">
                        <form onSubmit={handleSubmit}>
                            <label className="block text-gray-300 mb-2">Current 80C Investments (PPF, ELSS, LIC, etc.)</label>
                            <div className="flex gap-4">
                                <input
                                    type="number"
                                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-orange-500"
                                    value={invested}
                                    onChange={(e) => setInvested(e.target.value)}
                                    placeholder="e.g. 50000"
                                    required
                                />
                                <button
                                    disabled={!isValid}
                                    className={`px-6 rounded-lg font-semibold transition-all duration-300 
                                    ${!isValid
                                            ? 'bg-gray-700 text-gray-400 cursor-not-allowed opacity-70'
                                            : 'bg-orange-600 text-white hover:bg-orange-700 shadow-lg shadow-orange-500/50 hover:shadow-orange-500/70 hover:-translate-y-0.5'
                                        }`}
                                >
                                    Check
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {result && (
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-gray-800 rounded-xl p-8 shadow-xl border border-gray-700 backdrop-blur-sm">
                            <h3 className="text-xl font-bold text-white mb-6">Limit Status</h3>

                            <div className="relative pt-1">
                                <div className="overflow-hidden h-4 mb-4 text-xs flex rounded bg-gray-700">
                                    <div
                                        style={{ width: `${Math.min(100, (result.invested / result.limit) * 100)}%` }}
                                        className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${result.remaining === 0 ? 'bg-green-500' : 'bg-orange-500'}`}
                                    ></div>
                                </div>
                                <div className="flex justify-between text-sm text-gray-400 mb-6">
                                    <span>₹0</span>
                                    <span>Max Limit: ₹1.5L</span>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-400">Invested</span>
                                    <span className="text-white font-mono">₹{result.invested.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center border-t border-gray-700 pt-4">
                                    <span className="text-orange-400 font-semibold">Remaining Limit to Save Tax</span>
                                    <span className="text-orange-400 font-mono text-xl font-bold">₹{result.remaining.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-800 rounded-xl p-8 shadow-xl border border-gray-700 backdrop-blur-sm">
                            <h3 className="text-xl font-bold text-white mb-6">Suggestion to Save Tax</h3>
                            {result.suggestions.length > 0 ? (
                                <ul className="space-y-3">
                                    {result.suggestions.map((item, idx) => (
                                        <li key={idx} className="flex items-center text-gray-300">
                                            <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <div className="text-green-400 flex items-center">
                                    <svg className="w-8 h-8 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    You have fully utilized your 80C limit!
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Explanation Section */}
                <div className="mt-12 bg-gray-800/50 rounded-2xl p-8 border border-gray-700 backdrop-blur-sm relative overflow-hidden group hover:border-orange-500/50 transition-all duration-500">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600/10 rounded-full blur-3xl -mr-16 -mt-16 transition-all duration-500 group-hover:bg-orange-600/20"></div>

                    <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                        <span className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center mr-3 text-orange-400">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </span>
                        Maximizing Section 80C
                    </h3>

                    <div className="grid md:grid-cols-3 gap-6 text-gray-300">
                        <div className="col-span-2">
                            <p className="mb-4 leading-relaxed">
                                <strong className="text-orange-400">Section 80C</strong> is the most popular tax-saving section in the Income Tax Act. It allows a deduction of up to <strong>₹1.5 Lakhs</strong> from your total taxable income.
                            </p>
                            <p className="text-sm text-gray-400">
                                Investing ₹1.5L in 80C can save you anywhere from ₹7,800 to ₹46,800 in taxes depending on your slab rate.
                            </p>
                        </div>

                        <div className="bg-gray-900/50 rounded-xl p-5 border border-gray-700/50">
                            <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">Popular Choices</h4>
                            <div className="space-y-2 text-sm">
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-400">ELSS Mutual Funds</span>
                                    <span className="text-green-400 text-xs bg-green-900/20 px-2 py-0.5 rounded">High Return</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-400">PPF / EPF</span>
                                    <span className="text-blue-400 text-xs bg-blue-900/20 px-2 py-0.5 rounded">Safe</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-400">Life Insurance</span>
                                    <span className="text-orange-400 text-xs bg-orange-900/20 px-2 py-0.5 rounded">Protection</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SavingsCalculator80C;
