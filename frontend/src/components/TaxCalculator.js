import React, { useState } from 'react';
import axios from 'axios';
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const response = await axios.post('http://localhost:8000/api/calculate-tax/', {
        salary: parseFloat(formData.salary) || 0,
        hra: parseFloat(formData.hra) || 0,
        lta: parseFloat(formData.lta) || 0,
        deduction80C: parseFloat(formData.deduction80C) || 0,
        deduction80D: parseFloat(formData.deduction80D) || 0,
        age: formData.age
      });

      setResults(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to calculate tax. Please check your inputs.');
      console.error('Error calculating tax:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Indian Income Tax Calculator
          </h1>
          <p className="text-lg text-gray-600">
            FY 2024-25 | Calculate and compare Old vs New Tax Regime
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="bg-white rounded-lg shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Enter Your Details
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Annual Salary (₹) *
                </label>
                <input
                  type="number"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="e.g., 1000000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  HRA (House Rent Allowance) (₹)
                </label>
                <input
                  type="number"
                  name="hra"
                  value={formData.hra}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="e.g., 100000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  LTA (Leave Travel Allowance) (₹)
                </label>
                <input
                  type="number"
                  name="lta"
                  value={formData.lta}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="e.g., 50000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Section 80C Deduction (₹) - Max ₹1,50,000
                </label>
                <input
                  type="number"
                  name="deduction80C"
                  value={formData.deduction80C}
                  onChange={handleChange}
                  max="150000"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="e.g., 150000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Section 80D Deduction (Medical Insurance) (₹)
                </label>
                <input
                  type="number"
                  name="deduction80D"
                  value={formData.deduction80D}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="e.g., 25000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Age Category
                </label>
                <select
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="below60">Below 60 years</option>
                  <option value="60to80">60 to 80 years</option>
                  <option value="above80">Above 80 years</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 font-semibold"
              >
                {loading ? 'Calculating...' : 'Calculate Tax'}
              </button>
            </form>

            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800 text-sm">{error}</p>
              </div>
            )}
          </div>

          {/* Results Section */}
          <div>
            {results ? (
              <ResultsCard results={results} />
            ) : (
              <div className="bg-white rounded-lg shadow-xl p-8 h-full flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <svg className="mx-auto h-24 w-24 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  <p className="text-lg font-medium">Calculate your tax</p>
                  <p className="text-sm mt-2">Fill in the form and click "Calculate Tax" to see results</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaxCalculator;