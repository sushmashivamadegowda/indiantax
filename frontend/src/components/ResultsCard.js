import React from 'react';

const ResultsCard = ({ results }) => {
  const { oldRegime, newRegime } = results;
  const betterRegime = oldRegime.totalTax <= newRegime.totalTax ? 'old' : 'new';

  const RegimeCard = ({ regime, data, isBetter, title }) => (
    <div className={`bg-gray-800 rounded-lg p-6 border-2 ${isBetter ? 'border-green-500 shadow-lg shadow-green-900/20' : 'border-gray-700'}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-white">{title}</h3>
        {isBetter && (
          <span className="bg-green-900/30 text-green-400 text-xs font-semibold px-3 py-1 rounded-full border border-green-800">
            Recommended
          </span>
        )}
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center pb-2 border-b border-gray-700">
          <span className="text-sm text-gray-400">Taxable Income:</span>
          <span className="font-semibold text-white">₹{data.taxableIncome.toLocaleString('en-IN')}</span>
        </div>

        {/* Slabs Breakdown */}
        <div className="bg-gray-700/50 rounded-lg p-3">
          <p className="text-xs font-semibold text-gray-300 mb-2">Tax Slabs:</p>
          {data.slabs.map((slab, index) => (
            <div key={index} className="flex justify-between text-xs py-1">
              <span className="text-gray-400">{slab.range} @ {slab.rate}</span>
              <span className="font-medium text-gray-200">₹{slab.amount.toLocaleString('en-IN')}</span>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-400">Base Tax:</span>
          <span className="font-semibold text-white">₹{data.baseTax.toLocaleString('en-IN')}</span>
        </div>

        {data.rebate > 0 && (
          <div className="flex justify-between items-center text-green-400">
            <span className="text-sm">Section 87A Rebate:</span>
            <span className="font-semibold">-₹{data.rebate.toLocaleString('en-IN')}</span>
          </div>
        )}

        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-400">Health & Education Cess (4%):</span>
          <span className="font-semibold text-white">₹{data.cess.toLocaleString('en-IN')}</span>
        </div>

        <div className="flex justify-between items-center pt-3 border-t-2 border-gray-700">
          <span className="text-lg font-bold text-white">Total Tax:</span>
          <span className="text-2xl font-bold text-indigo-400">₹{data.totalTax.toLocaleString('en-IN')}</span>
        </div>

        <div className="flex justify-between items-center bg-indigo-900/20 rounded p-2 border border-indigo-900/30">
          <span className="text-sm font-medium text-gray-300">Effective Tax Rate:</span>
          <span className="text-lg font-bold text-indigo-400">{data.effectiveRate.toFixed(2)}%</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Comparison Banner */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg p-6 shadow-xl">
        <h2 className="text-2xl font-bold mb-4">Tax Calculation Results</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-indigo-100 text-sm mb-1">Old Regime</p>
            <p className="text-3xl font-bold">₹{oldRegime.totalTax.toLocaleString('en-IN')}</p>
          </div>
          <div>
            <p className="text-indigo-100 text-sm mb-1">New Regime</p>
            <p className="text-3xl font-bold">₹{newRegime.totalTax.toLocaleString('en-IN')}</p>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-indigo-400">
          <p className="text-sm text-indigo-100">Potential Savings:</p>
          <p className="text-2xl font-bold">
            ₹{Math.abs(oldRegime.totalTax - newRegime.totalTax).toLocaleString('en-IN')}
          </p>
          <p className="text-sm text-indigo-100 mt-1">
            {betterRegime === 'old' ? 'by choosing Old Regime' : 'by choosing New Regime'}
          </p>
        </div>
      </div>

      {/* Regime Cards */}
      <div className="grid grid-cols-1 gap-6">
        <RegimeCard
          regime="old"
          data={oldRegime}
          isBetter={betterRegime === 'old'}
          title="Old Tax Regime"
        />

        <RegimeCard
          regime="new"
          data={newRegime}
          isBetter={betterRegime === 'new'}
          title="New Tax Regime"
        />
      </div>

      {/* Key Points */}
      <div className="bg-blue-900/10 border border-blue-900/30 rounded-lg p-6">
        <h4 className="font-semibold text-blue-300 mb-3">📌 Key Points:</h4>
        <ul className="space-y-2 text-sm text-blue-200/80">
          <li>• Standard Deduction of ₹50,000 applied to both regimes</li>
          <li>• Old Regime allows deductions (80C, 80D, HRA, LTA)</li>
          <li>• New Regime has lower tax rates but no deductions (except standard)</li>
          <li>• Section 87A rebate (₹25,000) available for income ≤ ₹7L in New Regime</li>
          <li>• 4% Health & Education Cess added to final tax amount</li>
        </ul>
      </div>
    </div>
  );
};

export default ResultsCard;