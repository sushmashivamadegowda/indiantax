import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative bg-gray-900 overflow-hidden">
      {/* V3 Animation Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.2]" />
      <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-600 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob" />
      <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-600 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-600 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob animation-delay-4000" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Indian Income Tax Calculator
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            Financial Year 2024-25
          </p>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-10">
            Calculate and compare your tax liability under both Old and New Tax Regimes.
            Make informed decisions about which regime saves you more money.
          </p>
          <button
            onClick={() => navigate('/calculator')}
            className="bg-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Calculate Your Tax
          </button>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="bg-gray-800 rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all border border-gray-700 backdrop-blur-sm cursor-pointer" onClick={() => navigate('/calculator')}>
            <div className="w-16 h-16 bg-indigo-900/50 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Income Tax</h3>
            <p className="text-gray-400 text-sm">
              Calculate income tax for FY 2024-25 with New vs Old regime comparison.
            </p>
          </div>

          <div className="bg-gray-800 rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all border border-gray-700 backdrop-blur-sm cursor-pointer" onClick={() => navigate('/gst-calculator')}>
            <div className="w-16 h-16 bg-pink-900/50 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">GST Calculator</h3>
            <p className="text-gray-400 text-sm">
              Quickly calculate GST inclusive and exclusive amounts with standard rates.
            </p>
          </div>

          <div className="bg-gray-800 rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all border border-gray-700 backdrop-blur-sm">
            <div className="w-16 h-16 bg-green-900/50 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Compare Regimes</h3>
            <p className="text-gray-400 text-sm">
              Side-by-side comparison of Old vs New tax regime.
            </p>
          </div>

          <div className="bg-gray-800 rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all border border-gray-700 backdrop-blur-sm">
            <div className="w-16 h-16 bg-purple-900/50 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Breakdown</h3>
            <p className="text-gray-400 text-sm">
              Comprehensive slab-wise breakdown of your tax liability.
            </p>
          </div>
        </div>

        {/* Tax Regimes Info */}
        <div className="bg-gray-800 rounded-xl shadow-xl p-8 mb-16 border border-gray-700">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Understanding Tax Regimes
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Old Regime */}
            <div className="border-2 border-gray-700 rounded-lg p-6 bg-gray-800/50">
              <h3 className="text-2xl font-bold text-white mb-4">Old Tax Regime</h3>
              <div className="space-y-3 mb-4">
                <p className="text-gray-300 font-medium">Tax Slabs:</p>
                <ul className="space-y-2 text-gray-400">
                  <li>• Up to ₹2.5L: <span className="font-semibold text-gray-200">0%</span></li>
                  <li>• ₹2.5L - ₹5L: <span className="font-semibold text-gray-200">5%</span></li>
                  <li>• ₹5L - ₹10L: <span className="font-semibold text-gray-200">20%</span></li>
                  <li>• Above ₹10L: <span className="font-semibold text-gray-200">30%</span></li>
                </ul>
              </div>
              <div className="bg-green-900/20 rounded-lg p-4 border border-green-900/30">
                <p className="text-green-400 font-semibold mb-2">✓ Deductions Available:</p>
                <ul className="text-green-300/80 text-sm space-y-1">
                  <li>• Section 80C (up to ₹1.5L)</li>
                  <li>• Section 80D (Medical Insurance)</li>
                  <li>• HRA, LTA exemptions</li>
                  <li>• Standard Deduction (₹50,000)</li>
                </ul>
              </div>
            </div>

            {/* New Regime */}
            <div className="border-2 border-indigo-900/50 rounded-lg p-6 bg-indigo-900/10">
              <h3 className="text-2xl font-bold text-white mb-4">New Tax Regime</h3>
              <div className="space-y-3 mb-4">
                <p className="text-gray-300 font-medium">Tax Slabs:</p>
                <ul className="space-y-2 text-gray-400">
                  <li>• Up to ₹3L: <span className="font-semibold text-gray-200">0%</span></li>
                  <li>• ₹3L - ₹6L: <span className="font-semibold text-gray-200">5%</span></li>
                  <li>• ₹6L - ₹9L: <span className="font-semibold text-gray-200">10%</span></li>
                  <li>• ₹9L - ₹12L: <span className="font-semibold text-gray-200">15%</span></li>
                  <li>• ₹12L - ₹15L: <span className="font-semibold text-gray-200">20%</span></li>
                  <li>• Above ₹15L: <span className="font-semibold text-gray-200">30%</span></li>
                </ul>
              </div>
              <div className="bg-indigo-900/20 rounded-lg p-4 border border-indigo-900/30">
                <p className="text-indigo-400 font-semibold mb-2">✓ Benefits:</p>
                <ul className="text-indigo-300/80 text-sm space-y-1">
                  <li>• Lower tax rates</li>
                  <li>• Section 87A rebate (income ≤ ₹7L)</li>
                  <li>• Standard Deduction (₹50,000)</li>
                  <li>• Simpler calculations</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-indigo-700 to-purple-700 text-white rounded-xl shadow-2xl p-12 border border-indigo-600/30">
          <h2 className="text-3xl font-bold mb-4">Ready to Calculate Your Tax?</h2>
          <p className="text-xl mb-8 text-indigo-100">
            Get instant results and find out which regime is best for you
          </p>
          <button
            onClick={() => navigate('/calculator')}
            className="bg-white text-indigo-700 px-10 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-lg mb-4 sm:mb-0 sm:mr-4"
          >
            Start Calculating Now →
          </button>

          <button
            onClick={() => navigate('/how-it-works')}
            className="bg-indigo-900/50 text-white border-2 border-indigo-400/30 px-10 py-4 rounded-lg text-lg font-semibold hover:bg-indigo-900/80 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            Learn How It Works
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;