import React, { useState } from 'react';
import axios from 'axios';

const SalaryBreakdownCalculator = () => {
    const [ctc, setCtc] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const isValid = ctc && !isNaN(ctc) && Number(ctc) > 0;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isValid) return;

        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const response = await axios.post('http://localhost:8000/api/calculate-salary-breakdown/', { ctc });
            setResult(response.data);
        } catch (error) {
            console.error(error);
            setError('Failed to calculate. Please ensure the backend server is running and try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 py-12 px-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.1]" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob animation-delay-2000" />

            <div className="max-w-4xl mx-auto relative z-10">
                <h1 className="text-4xl font-bold text-center text-white mb-8">Salary Breakdown Calculator</h1>

                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-gray-800 rounded-xl p-8 shadow-xl border border-gray-700 backdrop-blur-sm">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-gray-300 mb-2">Annual CTC (₹)</label>
                                <input
                                    type="number"
                                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-emerald-500 font-mono text-lg transition-colors"
                                    value={ctc}
                                    onChange={(e) => setCtc(e.target.value)}
                                    placeholder="e.g. 1200000"
                                    required
                                />
                                <p className="text-sm text-gray-500 mt-2">Enter your total CTC as per offer letter.</p>
                            </div>
                            <button
                                disabled={loading || !isValid}
                                className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center
                                    ${loading || !isValid
                                        ? 'bg-gray-700 text-gray-400 cursor-not-allowed opacity-70'
                                        : 'bg-emerald-600 text-white hover:bg-emerald-500 shadow-lg shadow-emerald-500/50 hover:shadow-emerald-500/70 hover:-translate-y-0.5'
                                    }`}
                            >
                                {loading ? (
                                    <span className="flex items-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                        Calculating...
                                    </span>
                                ) : (
                                    <>
                                        <svg className={`w-5 h-5 mr-2 ${isValid ? 'animate-pulse' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 3.666V14h-6v-3.334H5V18h14v-7.334h-2z" /></svg>
                                        Calculate In-Hand Salary
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
                            <div className="bg-gray-800 rounded-xl p-8 shadow-xl border border-gray-700 backdrop-blur-sm">
                                <h3 className="text-xl font-bold text-white mb-6">Monthly Breakdown</h3>

                                <div className="space-y-4">
                                    <div className="flex justify-between items-center p-4 bg-emerald-900/20 rounded-lg border border-emerald-800/50">
                                        <div className="flex flex-col">
                                            <span className="text-emerald-400 text-sm uppercase tracking-wide">Net In-Hand</span>
                                            <span className="text-xs text-gray-500">Per Month</span>
                                        </div>
                                        <span className="text-3xl font-bold text-white">₹{result.monthly.inHand.toLocaleString()}</span>
                                    </div>

                                    <div className="bg-gray-900/50 rounded-lg p-4 space-y-3">
                                        <div className="flex justify-between text-gray-300 text-sm">
                                            <span>Gross Salary</span>
                                            <span>₹{result.monthly.gross.toLocaleString()}</span>
                                        </div>
                                        <div className="h-px bg-gray-700" />
                                        <div className="flex justify-between text-red-400 text-sm">
                                            <span>PF Deduction (12%)</span>
                                            <span>- ₹{result.monthly.pf.toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between text-red-400 text-sm">
                                            <span>Prof. Tax</span>
                                            <span>- ₹{result.monthly.pt.toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between text-red-400 text-sm">
                                            <span>Income Tax (Est)</span>
                                            <span>- ₹{result.monthly.tax.toLocaleString()}</span>
                                        </div>
                                    </div>

                                    <div className="mt-4 pt-4 border-t border-gray-700 flex justify-between text-xs text-gray-500">
                                        <span>Annual Tax: ₹{result.annual.tax.toLocaleString()}</span>
                                        <span>Annual PF: ₹{result.annual.pf.toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {!result && (
                            <div className="bg-gray-800/50 rounded-xl p-8 border border-gray-700 flex items-center justify-center h-full text-gray-500 text-center">
                                <div>
                                    <p className="mb-2">Enter CTC to see the breakdown</p>
                                    <p className="text-sm">We'll show you exactly where your money goes.</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Explanation Section */}
                <div className="mt-12 bg-gray-800/50 rounded-2xl p-8 border border-gray-700 backdrop-blur-sm relative overflow-hidden group hover:border-emerald-500/50 transition-all duration-500">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600/10 rounded-full blur-3xl -mr-16 -mt-16 transition-all duration-500 group-hover:bg-emerald-600/20"></div>

                    <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                        <span className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center mr-3 text-emerald-400">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </span>
                        Understanding CTC vs In-Hand
                    </h3>

                    <div className="grid md:grid-cols-2 gap-10 text-gray-300">
                        <div className="space-y-4">
                            <p>
                                Your <strong>CTC (Cost to Company)</strong> is not what hits your bank account. Several deductions happen before you receive your salary.
                            </p>
                            <ul className="space-y-2 list-disc list-inside text-gray-400">
                                <li><strong>Provident Fund (PF):</strong> Mandatory 12% deduction from Basic Salary for retirement.</li>
                                <li><strong>Professional Tax (PT):</strong> A state-level tax, roughly ₹200/month in most states.</li>
                                <li><strong>Income Tax (TDS):</strong> Estimated monthly tax deducted by employer based on your projected annual income.</li>
                            </ul>
                        </div>

                        <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-700/50 text-sm space-y-4">
                            <div className="flex items-center">
                                <span className="w-24 font-bold text-white">Formula</span>
                                <span className="flex-1 font-mono text-emerald-400">In-Hand = Gross - (PF + P.Tax + Income Tax)</span>
                            </div>
                            <p className="text-gray-500 italic">
                                Note: This calculator assumes Basic Salary is 50% of CTC and uses the New Tax Regime for tax estimates. Actual values may vary based on your company's specific salary structure.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SalaryBreakdownCalculator;
