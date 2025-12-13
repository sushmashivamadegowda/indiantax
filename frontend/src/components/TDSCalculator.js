import React, { useState } from 'react';
import { calculateTDS } from '../utils/taxCalculators';

const TDSCalculator = () => {
    const [formData, setFormData] = useState({ salary: '', investments: '' });
    const [result, setResult] = useState(null);

    const isValid = formData.salary && !isNaN(formData.salary) && Number(formData.salary) > 0;

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            if (!isValid) return;
            // calculated based on simplified New Regime estimation
            const res = calculateTDS(
                parseFloat(formData.salary),
                parseFloat(formData.investments) || 0
            );
            setResult(res);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 py-12 px-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.1]" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-teal-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob animation-delay-2000" />

            <div className="max-w-md mx-auto relative z-10 w-full">
                <h1 className="text-4xl font-bold text-center text-white mb-8">TDS Estimator</h1>

                <div className="bg-gray-800 rounded-xl p-8 shadow-xl border border-gray-700 backdrop-blur-sm mb-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-gray-300 mb-2">Annual Gross Salary</label>
                            <input
                                type="number"
                                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-teal-500"
                                value={formData.salary}
                                onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-300 mb-2">Total Investments (80C, etc.)</label>
                            <input
                                type="number"
                                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-teal-500"
                                value={formData.investments}
                                onChange={(e) => setFormData({ ...formData, investments: e.target.value })}
                                placeholder="Optional"
                            />
                        </div>
                        <button
                            disabled={!isValid}
                            className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center
                                ${!isValid
                                    ? 'bg-gray-700 text-gray-400 cursor-not-allowed opacity-70'
                                    : 'bg-teal-600 text-white hover:bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/70 hover:-translate-y-0.5'
                                }`}
                        >
                            <svg className={`w-5 h-5 mr-2 ${isValid ? 'animate-pulse' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                            Estimate TDS
                        </button>
                    </form>
                </div>

                {result && (
                    <div className="bg-gray-800 rounded-xl p-8 shadow-xl border border-gray-700 backdrop-blur-sm text-center">
                        <h3 className="text-gray-400 mb-2 uppercase tracking-wide text-sm font-semibold">Estimated Monthly TDS Deduction</h3>
                        <div className="text-5xl font-bold text-white mb-2">₹{result.monthlyTDS.toLocaleString()}</div>
                        <p className="text-teal-400 text-sm">Annual Tax Liability: ₹{result.annualTax.toLocaleString()}</p>
                        <p className="text-xs text-gray-500 mt-4">* Based on simplified New Regime estimation.</p>
                    </div>
                )}

                {/* Explanation Section */}
                <div className="mt-12 bg-gray-800/50 rounded-2xl p-8 border border-gray-700 backdrop-blur-sm relative overflow-hidden group hover:border-teal-500/50 transition-all duration-500">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-teal-600/10 rounded-full blur-3xl -mr-16 -mt-16 transition-all duration-500 group-hover:bg-teal-600/20"></div>

                    <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                        <span className="w-8 h-8 rounded-lg bg-teal-500/20 flex items-center justify-center mr-3 text-teal-400">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                        </span>
                        How Salary TDS Works
                    </h3>

                    <div className="grid md:grid-cols-2 gap-8 text-gray-300">
                        <div>
                            <p className="mb-4">
                                <strong>Tax Deducted at Source (TDS)</strong> is a mechanism where your employer deducts tax from your salary every month and deposits it with the government on your behalf.
                            </p>
                            <p>
                                The amount deducted is based on your estimated annual tax liability, divided by the number of months remaining in the financial year.
                            </p>
                        </div>
                        <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-700/50">
                            <h4 className="text-teal-400 font-semibold mb-3">Does 10% TDS mean 10% tax?</h4>
                            <p className="text-sm text-gray-400 leading-relaxed">
                                Not necessarily. TDS on salary is not a fixed rate like 10%. It is calculated based on your slab rate. If your income falls in the 30% slab, TDS will be closer to 30%.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TDSCalculator;
