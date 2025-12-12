import React, { useState, useEffect } from 'react';

const GSTCalculator = () => {
    const [amount, setAmount] = useState('');
    const [taxRate, setTaxRate] = useState('18');
    const [type, setType] = useState('exclusive');
    const [results, setResults] = useState(null);

    const calculateGST = () => {
        const baseAmount = parseFloat(amount);
        const rate = parseFloat(taxRate);

        if (isNaN(baseAmount) || isNaN(rate)) {
            setResults(null);
            return;
        }

        let gstAmount = 0;
        let totalAmount = 0;
        let netAmount = 0;

        if (type === 'exclusive') {
            gstAmount = (baseAmount * rate) / 100;
            totalAmount = baseAmount + gstAmount;
            netAmount = baseAmount;
        } else {
            // Inclusive
            netAmount = baseAmount * (100 / (100 + rate));
            gstAmount = baseAmount - netAmount;
            totalAmount = baseAmount;
        }

        setResults({
            netAmount,
            gstAmount,
            totalAmount
        });
    };

    useEffect(() => {
        calculateGST();
    }, [amount, taxRate, type]);

    return (
        <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* V3 Animation Background Elements */}
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.1]" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob animation-delay-2000" />

            <div className="max-w-3xl mx-auto relative z-10">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-white mb-4">GST Calculator</h1>
                    <p className="text-gray-400">Calculate GST inclusive and exclusive amounts instantly</p>
                </div>

                <div className="bg-gray-800 rounded-2xl shadow-xl border border-gray-700 p-8 backdrop-blur-sm">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Amount (₹)</label>
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="Enter amount"
                                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white placeholder-gray-400 outline-none transition-all"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">GST Rate (%)</label>
                            <select
                                value={taxRate}
                                onChange={(e) => setTaxRate(e.target.value)}
                                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white outline-none transition-all"
                            >
                                <option value="5">5%</option>
                                <option value="12">12%</option>
                                <option value="18">18%</option>
                                <option value="28">28%</option>
                            </select>
                        </div>
                    </div>

                    <div className="mb-8">
                        <label className="block text-sm font-medium text-gray-300 mb-3">Tax Type</label>
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                onClick={() => setType('exclusive')}
                                className={`py-3 px-6 rounded-lg font-medium transition-all ${type === 'exclusive'
                                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                                    : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                                    }`}
                            >
                                GST Exclusive
                                <span className="block text-xs font-normal mt-1 opacity-80">(Amount + GST)</span>
                            </button>
                            <button
                                onClick={() => setType('inclusive')}
                                className={`py-3 px-6 rounded-lg font-medium transition-all ${type === 'inclusive'
                                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                                    : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                                    }`}
                            >
                                GST Inclusive
                                <span className="block text-xs font-normal mt-1 opacity-80">(Amount includes GST)</span>
                            </button>
                        </div>
                    </div>

                    {results && (
                        <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-700">
                            <div className="space-y-4">
                                <div className="flex justify-between items-center text-gray-400">
                                    <span>Net Amount</span>
                                    <span className="font-semibold text-white text-lg">₹{results.netAmount.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center text-indigo-400">
                                    <span>GST Amount ({taxRate}%)</span>
                                    <span className="font-semibold text-xl">+ ₹{results.gstAmount.toFixed(2)}</span>
                                </div>
                                <div className="h-px bg-gray-700 my-2" />
                                <div className="flex justify-between items-center text-white">
                                    <span className="text-lg font-medium">Total Amount</span>
                                    <span className="text-3xl font-bold text-indigo-500">₹{results.totalAmount.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Explanation Section */}
                <div className="mt-12 bg-gray-800/50 rounded-2xl p-8 border border-gray-700 backdrop-blur-sm relative overflow-hidden group hover:border-pink-500/50 transition-all duration-500 text-left">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-pink-600/10 rounded-full blur-3xl -mr-16 -mt-16 transition-all duration-500 group-hover:bg-pink-600/20"></div>

                    <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                        <span className="w-8 h-8 rounded-lg bg-pink-500/20 flex items-center justify-center mr-3 text-pink-400">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                        </span>
                        Understanding GST Logic
                    </h3>

                    <div className="grid md:grid-cols-2 gap-10 text-gray-300">
                        <div>
                            <p className="mb-4">
                                <strong>Good and Services Tax (GST)</strong> is a destination-based tax on consumption of goods and services. It is levied at all stages right from manufacture up to final consumption with credit of taxes paid at previous stages available as setoff.
                            </p>
                            <div className="flex gap-4 flex-wrap">
                                <span className="px-3 py-1 rounded-full bg-pink-900/30 border border-pink-500/30 text-pink-300 text-sm">Inclusive = Removes Tax</span>
                                <span className="px-3 py-1 rounded-full bg-indigo-900/30 border border-indigo-500/30 text-indigo-300 text-sm">Exclusive = Adds Tax</span>
                            </div>
                        </div>

                        <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-700/50 font-mono text-sm space-y-4">
                            <div>
                                <span className="text-gray-500 block text-xs uppercase mb-1">To find Base Price from Inclusive Amount</span>
                                <div className="text-pink-300 bg-gray-800 p-2 rounded">Base = Total × (100 / 100 + Rate)</div>
                            </div>
                            <div>
                                <span className="text-gray-500 block text-xs uppercase mb-1">To find Total Price from Base Amount</span>
                                <div className="text-indigo-300 bg-gray-800 p-2 rounded">Total = Base × (1 + Rate / 100)</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GSTCalculator;
