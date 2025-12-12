import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import TaxCalculator from './components/TaxCalculator';

import GSTCalculator from './components/GSTCalculator';
import HowItWorks from './pages/HowItWorks';

import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import HRACalculator from './components/HRACalculator';
import AdvanceTaxCalculator from './components/AdvanceTaxCalculator';
import TDSCalculator from './components/TDSCalculator';
import SavingsCalculator80C from './components/SavingsCalculator80C';
import SalaryBreakdownCalculator from './components/SalaryBreakdownCalculator';
import CompositionSchemeCalculator from './components/CompositionSchemeCalculator';

import ChatBot from './components/ChatBot';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        {/* Increased top padding to account for taller double-layered navbar */}
        <div className="pt-36">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/calculator" element={<TaxCalculator />} />
            <Route path="/gst-calculator" element={<GSTCalculator />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* New Tools Routes */}
            <Route path="/hra-calculator" element={<HRACalculator />} />
            <Route path="/advance-tax-calculator" element={<AdvanceTaxCalculator />} />
            <Route path="/tds-calculator" element={<TDSCalculator />} />
            <Route path="/80c-calculator" element={<SavingsCalculator80C />} />
            <Route path="/salary-breakdown" element={<SalaryBreakdownCalculator />} />
            <Route path="/composition-scheme-calculator" element={<CompositionSchemeCalculator />} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
        <ChatBot />
      </Router>
    </AuthProvider>
  );
}

export default App;
