import React, { useState } from 'react';
import { calculateTax } from '../utils/taxCalculators';
import ResultsCard from './ResultsCard';

const TaxCalculator = () => {
  const [formData, setFormData] = useState({
    salary: '',
    hra: '',
    lta: '',
    deduction80C: '',
    deduction80D: '',
    age: 'below60'
  });

  const [financialYear, setFinancialYear] = useState('2024-2025');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const isValid = formData.salary && !isNaN(formData.salary) && Number(formData.salary) > 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;

    setLoading(true);
    setError(null);
    setResults(null);

    try {
      // Simulate a small delay for better UX (optional, but feels "app-like")
      setTimeout(() => {
        const result = calculateTax({
          salary: parseFloat(formData.salary) || 0,
          hra: parseFloat(formData.hra) || 0,
          lta: parseFloat(formData.lta) || 0,
          deduction80C: parseFloat(formData.deduction80C) || 0,
          deduction80D: parseFloat(formData.deduction80D) || 0,
          age: formData.age,
          financial_year: financialYear
        });

        setResults(result);
        setLoading(false);
      }, 300);
    } catch (err) {
      setError('Failed to calculate tax. Please check your inputs.');
      console.error('Error calculating tax:', err);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-transparent py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Indian Income Tax Calculator
          </h1>
          <p className="text-lg text-gray-400">
            FY 2024-25 | Calculate and compare Old vs New Tax Regime
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="bg-gray-800 rounded-lg shadow-xl p-8 border border-gray-700">
            {/* Financial Year Selector */}
            <div className="mb-6 flex justify-end">
              <select
                value={financialYear}
                onChange={(e) => setFinancialYear(e.target.value)}
                className="block w-full sm:w-48 pl-3 pr-10 py-2 text-base border-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md bg-gray-700 text-white cursor-pointer"
              >
                <option value="2024-2025">FY 2024-25</option>
                <option value="2025-2026">FY 2025-26</option>
              </select>
            </div>

            <h2 className="text-2xl font-bold text-white mb-6">
              Enter Your Details
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Annual Salary (₹) *
                </label>
                <input
                  type="number"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white placeholder-gray-400"
                  placeholder="e.g., 1000000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  HRA (House Rent Allowance) (₹)
                </label>
                <input
                  type="number"
                  name="hra"
                  value={formData.hra}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white placeholder-gray-400"
                  placeholder="e.g., 100000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  LTA (Leave Travel Allowance) (₹)
                </label>
                <input
                  type="number"
                  name="lta"
                  value={formData.lta}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white placeholder-gray-400"
                  placeholder="e.g., 50000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Section 80C Deduction (₹) - Max ₹1,50,000
                </label>
                <input
                  type="number"
                  name="deduction80C"
                  value={formData.deduction80C}
                  onChange={handleChange}
                  max="150000"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white placeholder-gray-400"
                  placeholder="e.g., 150000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Section 80D Deduction (Medical Insurance) (₹)
                </label>
                <input
                  type="number"
                  name="deduction80D"
                  value={formData.deduction80D}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white placeholder-gray-400"
                  placeholder="e.g., 25000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Age Category
                </label>
                <select
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white"
                >
                  <option value="below60">Below 60 years</option>
                  <option value="60to80">60 to 80 years</option>
                  <option value="above80">Above 80 years</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loading || !isValid}
                className={`w-full py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 font-semibold flex items-center justify-center
                  ${loading || !isValid
                    ? 'bg-gray-700 text-gray-400 cursor-not-allowed opacity-70'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-500/50 hover:shadow-indigo-500/70 hover:-translate-y-0.5'
                  }`}
              >
                {loading ? 'Calculating...' : 'Calculate Tax'}
              </button>
            </form>

            {error && (
              <div className="mt-4 p-4 bg-red-900/20 border border-red-800 rounded-lg">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}
          </div>

          {/* Results Section */}
          <div>
            {results ? (
              <ResultsCard results={results} />
            ) : (
              <div className="bg-gray-800 rounded-lg shadow-xl p-8 border border-gray-700 h-full flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <svg className="mx-auto h-24 w-24 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  <p className="text-lg font-medium text-gray-400">Calculate your tax</p>
                  <p className="text-sm mt-2">Fill in the form and click "Calculate Tax" to see results</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Explanation Section */}
        <div className="mt-16 bg-gray-800/50 rounded-2xl p-8 border border-gray-700 backdrop-blur-sm relative overflow-hidden group hover:border-indigo-500/50 transition-all duration-500">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl -mr-16 -mt-16 transition-all duration-500 group-hover:bg-indigo-600/20"></div>

          <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
            <span className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center mr-3 text-indigo-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </span>
            How Income Tax is Calculated
          </h3>

          <div className="grid md:grid-cols-2 gap-8 text-gray-300">
            <div>
              <p className="mb-4 leading-relaxed">
                Indian Income Tax follows a <span className="text-indigo-400 font-semibold">progressive slab system</span>. This means your income is divided into different 'slabs', and each slab is taxed at a different rate.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="w-2 h-2 mt-2 rounded-full bg-indigo-500 mr-3 shrink-0"></span>
                  <span><strong>Old Regime:</strong> Allows you to claim deductions (80C, 80D, HRA) to lower your taxable income, but has higher tax rates.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 mt-2 rounded-full bg-indigo-500 mr-3 shrink-0"></span>
                  <span><strong>New Regime:</strong> Offers lower tax rates but removes most deductions. It's the default regime for FY 2024-25.</span>
                </li>
              </ul>
            </div>
            <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-700/50">
              <h4 className="text-white font-semibold mb-3">Formula Breakdown</h4>
              <div className="space-y-4 font-mono text-sm">
                <div className="flex justify-between items-center bg-gray-800 p-3 rounded-lg">
                  <span className="text-gray-400">Taxable Income</span>
                  <span className="text-indigo-300">= Gross - Deductions</span>
                </div>
                <div className="flex justify-between items-center bg-gray-800 p-3 rounded-lg">
                  <span className="text-gray-400">Total Tax</span>
                  <span className="text-indigo-300">= (Slab Tax - Rebate) + 4% Cess</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaxCalculator;