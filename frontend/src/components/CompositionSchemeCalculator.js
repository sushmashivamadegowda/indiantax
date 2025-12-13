import React, { useState } from 'react';
import { calculateCompositionTax } from '../utils/taxCalculators';

const CompositionSchemeCalculator = () => {
    const [turnover, setTurnover] = useState('');
    const [businessType, setBusinessType] = useState('trader');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const isValid = turnover && !isNaN(turnover) && Number(turnover) > 0;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isValid) return;

        setLoading(true);
        setError(null);
        setResult(null);

        try {
            // Simulate API delay
            setTimeout(() => {
                const res = calculateCompositionTax(parseFloat(turnover), businessType);
                setResult(res);
                setLoading(false);
            }, 500);
        } catch (error) {
            console.error(error);
            setError('Failed to calculate. Please try again.');
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 py-12 px-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.1]" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob animation-delay-2000" />

            <div className="max-w-4xl mx-auto relative z-10">
                <h1 className="text-4xl font-bold text-center text-white mb-8">GST Composition Scheme Calculator</h1>

                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-gray-800 rounded-xl p-8 shadow-xl border border-gray-700 backdrop-blur-sm">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-gray-300 mb-2">Annual Turnover (₹)</label>
                                <input
                                    type="number"
                                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-cyan-500 font-mono text-lg"
                                    value={turnover}
                                    onChange={(e) => setTurnover(e.target.value)}
                                    placeholder="e.g. 8000000"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-300 mb-2">Business Category</label>
                                <select
                                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-cyan-500"
                                    value={businessType}
                                    onChange={(e) => setBusinessType(e.target.value)}
                                >
                                    <option value="trader">Trader / Manufacturer (Goods)</option>
                                    <option value="restaurant">Restaurant Service</option>
                                    <option value="service_provider">Other Service Provider</option>
                                </select>
                            </div>

                            <button
                                disabled={loading || !isValid}
                                className={`w-full text-white py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center 
                                    ${loading || !isValid
                                        ? 'bg-gray-700 text-gray-400 cursor-not-allowed opacity-70'
                                        : 'bg-cyan-600 hover:bg-cyan-700 shadow-lg shadow-cyan-500/50 hover:shadow-cyan-500/70 hover:-translate-y-0.5'
                                    }`}
                            >
                                {loading ? (
                                    'Calculating...'
                                ) : (
                                    <>
                                        <svg className={`w-5 h-5 mr-2 ${isValid ? 'animate-pulse' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 3.666V14h-6v-3.334H5V18h14v-7.334h-2z" /></svg>
                                        Check Liability
                                    </>
                                )}
                            </button>

                            {error && (
                                <div className="bg-red-900/30 border border-red-500/50 text-red-200 p-4 rounded-lg text-sm">
                                    {error}
                                </div>
                            )}
                        </form>
                    </div>

                    <div className="space-y-6">
                        {result && (
                            <div className={`rounded-xl p-8 shadow-xl border backdrop-blur-sm ${result.is_eligible ? 'bg-gray-800 border-gray-700' : 'bg-red-900/10 border-red-800/50'}`}>
                                <h3 className="text-xl font-bold text-white mb-6">Calculation Result</h3>

                                {result.is_eligible ? (
                                    <div className="space-y-4">
                                        <div className="flex items-center space-x-2 text-green-400 mb-4">
                                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                                            <span className="font-bold">You are Eligible!</span>
                                        </div>

                                        <div className="flex justify-between items-center p-4 bg-cyan-900/20 rounded-lg border border-cyan-800/50">
                                            <span className="text-cyan-400">Total Tax Liability</span>
                                            <span className="text-3xl font-bold text-white">₹{result.tax_amount.toLocaleString()}</span>
                                        </div>

                                        <div className="bg-gray-900/50 rounded-lg p-4 space-y-3 font-mono text-sm">
                                            <div className="flex justify-between text-gray-300">
                                                <span>Applicable Rate</span>
                                                <span>{result.tax_rate}%</span>
                                            </div>
                                            <div className="flex justify-between text-gray-400">
                                                <span>CGST ({result.tax_rate / 2}%)</span>
                                                <span>₹{result.cgst.toLocaleString()}</span>
                                            </div>
                                            <div className="flex justify-between text-gray-400">
                                                <span>SGST ({result.tax_rate / 2}%)</span>
                                                <span>₹{result.sgst.toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center py-4">
                                        <div className="flex items-center justify-center text-red-500 mb-4">
                                            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        </div>
                                        <h4 className="text-lg font-bold text-white mb-2">Not Eligible</h4>
                                        <p className="text-red-300">{result.reason}</p>
                                        <p className="text-gray-400 text-sm mt-4">You must file regular GST returns.</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {!result && (
                            <div className="bg-gray-800/50 rounded-xl p-8 border border-gray-700 flex items-center justify-center h-full text-gray-500 text-center">
                                <div>
                                    <p className="mb-2">Enter turnover to check eligibility</p>
                                    <p className="text-sm">We'll calculate your lower tax liability instantly.</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Explanation Section */}
                <div className="mt-12 bg-gray-800/50 rounded-2xl p-8 border border-gray-700 backdrop-blur-sm relative overflow-hidden group hover:border-cyan-500/50 transition-all duration-500">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-600/10 rounded-full blur-3xl -mr-16 -mt-16 transition-all duration-500 group-hover:bg-cyan-600/20"></div>

                    <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                        <span className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center mr-3 text-cyan-400">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                        </span>
                        Composition Scheme at a Glance
                    </h3>

                    <div className="grid md:grid-cols-2 gap-10 text-gray-300">
                        <div className="space-y-4">
                            <p>
                                A simple GST scheme for small businesses involving fixed tax rates and fewer compliances.
                            </p>
                            <div className="space-y-3">
                                <div className="flex items-start">
                                    <div className="flex-shrink-0 h-5 w-5 bg-cyan-900 rounded-full flex items-center justify-center mt-1 mr-3 border border-cyan-700">
                                        <span className="text-xs font-bold text-cyan-400">1</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-white">Eligible Businesses</p>
                                        <p className="text-xs text-gray-400">Turnover up to ₹1.5 Crore (₹50 Lakhs for Services).</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="flex-shrink-0 h-5 w-5 bg-cyan-900 rounded-full flex items-center justify-center mt-1 mr-3 border border-cyan-700">
                                        <span className="text-xs font-bold text-cyan-400">2</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-white">Lower Tax Rates</p>
                                        <p className="text-xs text-gray-400">1% for Traders/Manufacturers, 5% for Restaurants, 6% for Services.</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="flex-shrink-0 h-5 w-5 bg-cyan-900 rounded-full flex items-center justify-center mt-1 mr-3 border border-cyan-700">
                                        <span className="text-xs font-bold text-cyan-400">3</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-white">Restrictions</p>
                                        <p className="text-xs text-gray-400">Cannot collect tax from customers, no Input Tax Credit (ITC), no inter-state sales.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-700/50 text-sm">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="text-gray-500 border-b border-gray-700">
                                        <th className="pb-2">Category</th>
                                        <th className="pb-2 text-right">Rate</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-300">
                                    <tr className="border-b border-gray-800">
                                        <td className="py-2">Manufacturer</td>
                                        <td className="py-2 text-right">1%</td>
                                    </tr>
                                    <tr className="border-b border-gray-800">
                                        <td className="py-2">Trader (Goods)</td>
                                        <td className="py-2 text-right">1%</td>
                                    </tr>
                                    <tr className="border-b border-gray-800">
                                        <td className="py-2">Restaurant</td>
                                        <td className="py-2 text-right">5%</td>
                                    </tr>
                                    <tr>
                                        <td className="py-2">Service Provider</td>
                                        <td className="py-2 text-right">6%</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompositionSchemeCalculator;
