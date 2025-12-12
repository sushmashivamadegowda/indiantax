import React from 'react';

const HowItWorks = () => {
    return (
        <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* V3 Animation Background */}
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.1]" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-green-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob animation-delay-2000" />

            <div className="max-w-4xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">How It Works</h1>
                    <p className="text-xl text-gray-400">Understanding Indian Taxation and GST made simple</p>
                </div>

                {/* Income Tax Section */}
                <div className="mb-16">
                    <div className="flex items-center mb-8">
                        <div className="w-12 h-12 bg-indigo-900/50 rounded-lg flex items-center justify-center border border-indigo-700 mr-4">
                            <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold text-white">Income Tax (FY 2024-25)</h2>
                    </div>

                    <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700 shadow-xl mb-8">
                        <h3 className="text-xl font-bold text-white mb-4">Old vs New Regime</h3>
                        <p className="text-gray-400 mb-6">
                            The Indian tax system currently offers two regimes. The <strong>New Regime</strong> offers lower tax rates but fewer deductions, while the <strong>Old Regime</strong> has higher rates but allows for significant tax-saving deductions.
                        </p>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-700">
                                <h4 className="font-semibold text-indigo-400 mb-2">New Regime Highlights</h4>
                                <ul className="space-y-2 text-sm text-gray-300">
                                    <li>• Default regime for FY 2024-25</li>
                                    <li>• Tax-free income up to ₹3 Lakhs</li>
                                    <li>• Section 87A rebate for income up to ₹7 Lakhs</li>
                                    <li>• Standard Deduction of ₹50,000 applicable</li>
                                    <li>• No other deductions (HRA, 80C, 80D, etc.)</li>
                                </ul>
                            </div>

                            <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-700">
                                <h4 className="font-semibold text-green-400 mb-2">Old Regime Highlights</h4>
                                <ul className="space-y-2 text-sm text-gray-300">
                                    <li>• Must explicitly opt-in</li>
                                    <li>• Tax-free income up to ₹2.5 Lakhs</li>
                                    <li>• Section 87A rebate for income up to ₹5 Lakhs</li>
                                    <li>• <strong>Allows Deductions:</strong> 80C (₹1.5L), 80D, HRA, LTA</li>
                                    <li>• Ideal for those with high investments/expenses</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* GST Section */}
                <div className="mb-16">
                    <div className="flex items-center mb-8">
                        <div className="w-12 h-12 bg-pink-900/50 rounded-lg flex items-center justify-center border border-pink-700 mr-4">
                            <svg className="w-6 h-6 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold text-white">Goods & Services Tax (GST)</h2>
                    </div>

                    <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700 shadow-xl">
                        <p className="text-gray-400 mb-6">
                            GST is a single indirect tax for the whole nation, making India one unified common market. It is calculated as a percentage of the price of goods or services.
                        </p>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <h4 className="text-lg font-semibold text-white mb-3">Formulae</h4>
                                <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700 space-y-4">
                                    <div>
                                        <p className="text-xs text-indigo-400 uppercase font-bold mb-1">GST Exclusive (Add GST)</p>
                                        <p className="text-gray-300 font-mono text-sm">Total = Base Price + (Base Price × Rate/100)</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-green-400 uppercase font-bold mb-1">GST Inclusive (Remove GST)</p>
                                        <p className="text-gray-300 font-mono text-sm">Base = Total × [100 / (100 + Rate)]</p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h4 className="text-lg font-semibold text-white mb-3">Common Rates</h4>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="bg-gray-700 p-3 rounded text-center">
                                        <span className="block text-xl font-bold text-white">5%</span>
                                        <span className="text-xs text-gray-400">Essentials</span>
                                    </div>
                                    <div className="bg-gray-700 p-3 rounded text-center">
                                        <span className="block text-xl font-bold text-white">12%</span>
                                        <span className="text-xs text-gray-400">Electronics</span>
                                    </div>
                                    <div className="bg-gray-700 p-3 rounded text-center">
                                        <span className="block text-xl font-bold text-white">18%</span>
                                        <span className="text-xs text-gray-400">Services (Default)</span>
                                    </div>
                                    <div className="bg-gray-700 p-3 rounded text-center">
                                        <span className="block text-xl font-bold text-white">28%</span>
                                        <span className="text-xs text-gray-400">Luxury</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HowItWorks;
