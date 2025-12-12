import React, { useState } from 'react';
import axios from 'axios';

const AdvanceTaxCalculator = () => {
    const [liability, setLiability] = useState('');
    const [schedule, setSchedule] = useState(null);

    const isValid = liability && !isNaN(liability) && Number(liability) > 0;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!isValid) return;
            const response = await axios.post('http://localhost:8000/api/calculate-advance-tax/', {
                tax_liability: liability
            });
            setSchedule(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 py-12 px-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.1]" />
            <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob animation-delay-2000" />

            <div className="max-w-3xl mx-auto relative z-10">
                <h1 className="text-4xl font-bold text-center text-white mb-4">Advance Tax Calculator</h1>
                <p className="text-center text-gray-400 mb-12">Calculate your quarterly advance tax installment schedule</p>

                <div className="bg-gray-800 rounded-xl p-8 shadow-xl border border-gray-700 backdrop-blur-sm mb-8">
                    <form onSubmit={handleSubmit} className="flex gap-4 items-end">
                        <div className="flex-1">
                            <label className="block text-gray-300 mb-2">Estimated Annual Tax Liability (₹)</label>
                            <input
                                type="number"
                                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 text-lg"
                                value={liability}
                                onChange={(e) => setLiability(e.target.value)}
                                placeholder="e.g. 50000"
                                required
                            />
                        </div>
                        <button
                            disabled={!isValid}
                            className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 text-lg flex items-center
                                ${!isValid
                                    ? 'bg-gray-700 text-gray-400 cursor-not-allowed opacity-70'
                                    : 'bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-500/50 hover:shadow-blue-500/70 hover:-translate-y-0.5'
                                }`}
                        >
                            Calculate
                        </button>
                    </form>
                </div>

                {schedule && (
                    <div className="bg-gray-800 rounded-xl overflow-hidden shadow-xl border border-gray-700">
                        <div className="grid grid-cols-3 bg-gray-900/50 p-4 border-b border-gray-700 font-semibold text-gray-300">
                            <div>Due Date</div>
                            <div className="text-center">Cumulative %</div>
                            <div className="text-right">Amount to Pay</div>
                        </div>

                        <div className="divide-y divide-gray-700">
                            {schedule.map((item, index) => (
                                <div key={index} className="grid grid-cols-3 p-4 items-center hover:bg-gray-700/30 transition-colors">
                                    <div className="text-blue-400 font-medium">{item.due_date}</div>
                                    <div className="text-center text-gray-400">{item.percentage}%</div>
                                    <div className="text-right text-white font-bold text-lg">₹{item.cumulative_amount.toLocaleString()}</div>
                                </div>
                            ))}
                        </div>
                        <div className="p-4 perform-bg-gray-900 border-t border-gray-700 text-sm text-gray-500 text-center">
                            * Note: Amounts are cumulative. Subtract previous payments to find current installment.
                        </div>
                    </div>
                )}

                {/* Explanation Section */}
                <div className="mt-12 bg-gray-800/50 rounded-2xl p-8 border border-gray-700 backdrop-blur-sm relative overflow-hidden group hover:border-blue-500/50 transition-all duration-500">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl -mr-16 -mt-16 transition-all duration-500 group-hover:bg-blue-600/20"></div>

                    <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                        <span className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center mr-3 text-blue-400">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        </span>
                        Advance Tax Schedule
                    </h3>

                    <div className="text-gray-300">
                        <p className="mb-6">
                            Advance tax is income tax paid in advance for the financial year, instead of a lump sum payment at year-end. It is also known as <strong>'pay as you earn'</strong> tax.
                        </p>

                        <div className="grid md:grid-cols-4 gap-4">
                            <div className="bg-gray-900/80 p-4 rounded-lg border-l-4 border-blue-500">
                                <div className="text-xs text-blue-400 font-bold uppercase tracking-wider mb-1">By 15th June</div>
                                <div className="text-2xl font-bold text-white">15%</div>
                                <div className="text-xs text-gray-500 mt-1">of tax liability</div>
                            </div>
                            <div className="bg-gray-900/80 p-4 rounded-lg border-l-4 border-blue-400">
                                <div className="text-xs text-blue-400 font-bold uppercase tracking-wider mb-1">By 15th Sept</div>
                                <div className="text-2xl font-bold text-white">45%</div>
                                <div className="text-xs text-gray-500 mt-1">cumulative</div>
                            </div>
                            <div className="bg-gray-900/80 p-4 rounded-lg border-l-4 border-blue-300">
                                <div className="text-xs text-blue-400 font-bold uppercase tracking-wider mb-1">By 15th Dec</div>
                                <div className="text-2xl font-bold text-white">75%</div>
                                <div className="text-xs text-gray-500 mt-1">cumulative</div>
                            </div>
                            <div className="bg-gray-900/80 p-4 rounded-lg border-l-4 border-blue-200">
                                <div className="text-xs text-blue-400 font-bold uppercase tracking-wider mb-1">By 15th Mar</div>
                                <div className="text-2xl font-bold text-white">100%</div>
                                <div className="text-xs text-gray-500 mt-1">cumulative</div>
                            </div>
                        </div>
                        <p className="text-sm text-gray-500 italic mt-6">
                            * Applicable if annual tax liability exceeds ₹10,000.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdvanceTaxCalculator;
