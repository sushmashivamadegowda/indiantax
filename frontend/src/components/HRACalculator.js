import React, { useState } from 'react';
import { calculateHRAExemption } from '../utils/taxCalculators';

const HRACalculator = () => {
    const [formData, setFormData] = useState({
        basic: '',
        hra: '',
        rent: '',
        city: 'non-metro'
    });
    const [result, setResult] = useState(null);

    const isValid = formData.basic && formData.hra && formData.rent;

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            // We can assume valid if button is enabled, but good practice to check logic
            if (!isValid) return;

            const res = calculateHRAExemption(
                parseFloat(formData.basic),
                parseFloat(formData.hra),
                parseFloat(formData.rent),
                formData.city
            );
            setResult(res);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 py-12 px-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.1]" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob animation-delay-2000" />

            <div className="max-w-4xl mx-auto relative z-10">
                <h1 className="text-4xl font-bold text-center text-white mb-8">HRA Exemption Calculator</h1>

                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-gray-800 rounded-xl p-8 shadow-xl border border-gray-700 backdrop-blur-sm">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-gray-300 mb-2">Basic Salary (Annual)</label>
                                <input
                                    type="number"
                                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500"
                                    value={formData.basic}
                                    onChange={(e) => setFormData({ ...formData, basic: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-300 mb-2">HRA Received (Annual)</label>
                                <input
                                    type="number"
                                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500"
                                    value={formData.hra}
                                    onChange={(e) => setFormData({ ...formData, hra: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-300 mb-2">Rent Paid (Annual)</label>
                                <input
                                    type="number"
                                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500"
                                    value={formData.rent}
                                    onChange={(e) => setFormData({ ...formData, rent: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-300 mb-2">City Type</label>
                                <select
                                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500"
                                    value={formData.city}
                                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                >
                                    <option value="non-metro">Non-Metro (40%)</option>
                                    <option value="metro">Metro (50%)</option>
                                </select>
                            </div>
                            <button
                                disabled={!isValid}
                                className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center
                                    ${!isValid
                                        ? 'bg-gray-700 text-gray-400 cursor-not-allowed opacity-70'
                                        : 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg shadow-indigo-500/50 hover:shadow-indigo-500/70 hover:-translate-y-0.5'
                                    }`}
                            >
                                <svg className={`w-5 h-5 mr-2 ${isValid ? 'animate-pulse' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                                Calculate Exemption
                            </button>
                        </form>
                    </div>

                    <div className="space-y-6">
                        {result && (
                            <div className="bg-gray-800 rounded-xl p-8 shadow-xl border border-gray-700 backdrop-blur-sm">
                                <h3 className="text-xl font-bold text-white mb-6">Calculation Result</h3>

                                <div className="space-y-4">
                                    <div className="flex justify-between items-center p-4 bg-green-900/20 rounded-lg border border-green-800/50">
                                        <span className="text-green-400">Exempted HRA</span>
                                        <span className="text-xl font-bold text-white">₹{result.exempted}</span>
                                    </div>

                                    <div className="flex justify-between items-center p-4 bg-red-900/20 rounded-lg border border-red-800/50">
                                        <span className="text-red-400">Taxable HRA</span>
                                        <span className="text-xl font-bold text-white">₹{result.taxable}</span>
                                    </div>

                                    <div className="mt-6 pt-6 border-t border-gray-700">
                                        <h4 className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-wider">Breakdown - Least of the following</h4>
                                        <ul className="space-y-3 text-sm text-gray-300">
                                            <li className="flex justify-between">
                                                <span>Actual HRA Received</span>
                                                <span className="font-mono">₹{result.breakdown.actualReceived}</span>
                                            </li>
                                            <li className="flex justify-between">
                                                <span>{formData.city === 'metro' ? '50%' : '40%'} of Basic Salary</span>
                                                <span className="font-mono">₹{result.breakdown.percentOfBasic}</span>
                                            </li>
                                            <li className="flex justify-between">
                                                <span>Rent Paid - 10% Basic</span>
                                                <span className="font-mono">₹{result.breakdown.rentMinusBasic}</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )}

                        {!result && (
                            <div className="bg-gray-800/50 rounded-xl p-8 border border-gray-700 flex items-center justify-center h-full text-gray-500 text-center">
                                <div>
                                    <p className="mb-2">Enter your salary details</p>
                                    <p className="text-sm">We'll calculate your HRA tax exemption instantly.</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Explanation Section */}
                <div className="mt-12 bg-gray-800/50 rounded-2xl p-8 border border-gray-700 backdrop-blur-sm relative overflow-hidden group hover:border-purple-500/50 transition-all duration-500">
                    <div className="absolute top-0 left-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl -ml-16 -mt-16 transition-all duration-500 group-hover:bg-purple-600/20"></div>

                    <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                        <span className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center mr-3 text-purple-400">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                        </span>
                        How HRA Exemption Works
                    </h3>

                    <div className="text-gray-300 space-y-4">
                        <p>
                            Section 10(13A) of the Income Tax Act provides exemption for House Rent Allowance. The exemption amount is the <strong>least</strong> of these three values:
                        </p>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="bg-gray-900/50 p-5 rounded-xl border border-gray-700/50 hover:bg-gray-800 transition-all cursor-default">
                                <div className="text-purple-400 font-bold text-lg mb-1">1. Actual HRA</div>
                                <div className="text-sm text-gray-500">The exact amount your employer pays you as HRA allowance.</div>
                            </div>
                            <div className="bg-gray-900/50 p-5 rounded-xl border border-gray-700/50 hover:bg-gray-800 transition-all cursor-default">
                                <div className="text-purple-400 font-bold text-lg mb-1">2. Salary %</div>
                                <div className="text-sm text-gray-500">50% of Basic Salary for Metros, 40% for Non-Metros.</div>
                            </div>
                            <div className="bg-gray-900/50 p-5 rounded-xl border border-gray-700/50 hover:bg-gray-800 transition-all cursor-default">
                                <div className="text-purple-400 font-bold text-lg mb-1">3. Rent Adjusted</div>
                                <div className="text-sm text-gray-500">Actual Rent paid minus 10% of your Basic Salary.</div>
                            </div>
                        </div>
                        <p className="text-sm text-gray-500 italic mt-4">
                            * Note: You need valid rent receipts to claim this. This is only available in the Old Tax Regime.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HRACalculator;
