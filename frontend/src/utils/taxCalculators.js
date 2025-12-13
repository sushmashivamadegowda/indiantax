/**
 * Tax Calculation Utilities for Indian Income Tax (FY 2024-25)
 * Ported from Django Backend
 */

// ==========================================
// 1. INCOME TAX CALCULATOR
// ==========================================

const calculateOldRegimeTax = (taxableIncome) => {
    let slabs = [];
    let tax = 0;

    if (taxableIncome <= 250000) {
        slabs.push({ range: "0 - 2.5L", rate: "0%", amount: 0 });
    } else if (taxableIncome <= 500000) {
        slabs.push({ range: "0 - 2.5L", rate: "0%", amount: 0 });
        let slabAmount = taxableIncome - 250000;
        let slabTax = slabAmount * 0.05;
        tax += slabTax;
        slabs.push({ range: "2.5L - 5L", rate: "5%", amount: Number(slabTax.toFixed(2)) });
    } else if (taxableIncome <= 1000000) {
        slabs.push({ range: "0 - 2.5L", rate: "0%", amount: 0 });
        slabs.push({ range: "2.5L - 5L", rate: "5%", amount: 12500 });
        tax += 12500;
        let slabAmount = taxableIncome - 500000;
        let slabTax = slabAmount * 0.20;
        tax += slabTax;
        slabs.push({ range: "5L - 10L", rate: "20%", amount: Number(slabTax.toFixed(2)) });
    } else {
        slabs.push({ range: "0 - 2.5L", rate: "0%", amount: 0 });
        slabs.push({ range: "2.5L - 5L", rate: "5%", amount: 12500 });
        slabs.push({ range: "5L - 10L", rate: "20%", amount: 100000 });
        tax += 112500;
        let slabAmount = taxableIncome - 1000000;
        let slabTax = slabAmount * 0.30;
        tax += slabTax;
        slabs.push({ range: "Above 10L", rate: "30%", amount: Number(slabTax.toFixed(2)) });
    }

    return { tax, slabs };
};

const calculateNewRegimeTax = (taxableIncome) => {
    let slabs = [];
    let tax = 0;

    if (taxableIncome <= 300000) {
        slabs.push({ range: "0 - 3L", rate: "0%", amount: 0 });
    } else if (taxableIncome <= 600000) {
        slabs.push({ range: "0 - 3L", rate: "0%", amount: 0 });
        let slabAmount = taxableIncome - 300000;
        let slabTax = slabAmount * 0.05;
        tax += slabTax;
        slabs.push({ range: "3L - 6L", rate: "5%", amount: Number(slabTax.toFixed(2)) });
    } else if (taxableIncome <= 900000) {
        slabs.push({ range: "0 - 3L", rate: "0%", amount: 0 });
        slabs.push({ range: "3L - 6L", rate: "5%", amount: 15000 });
        tax += 15000;
        let slabAmount = taxableIncome - 600000;
        let slabTax = slabAmount * 0.10;
        tax += slabTax;
        slabs.push({ range: "6L - 9L", rate: "10%", amount: Number(slabTax.toFixed(2)) });
    } else if (taxableIncome <= 1200000) {
        slabs.push({ range: "0 - 3L", rate: "0%", amount: 0 });
        slabs.push({ range: "3L - 6L", rate: "5%", amount: 15000 });
        slabs.push({ range: "6L - 9L", rate: "10%", amount: 30000 });
        tax += 45000;
        let slabAmount = taxableIncome - 900000;
        let slabTax = slabAmount * 0.15;
        tax += slabTax;
        slabs.push({ range: "9L - 12L", rate: "15%", amount: Number(slabTax.toFixed(2)) });
    } else if (taxableIncome <= 1500000) {
        slabs.push({ range: "0 - 3L", rate: "0%", amount: 0 });
        slabs.push({ range: "3L - 6L", rate: "5%", amount: 15000 });
        slabs.push({ range: "6L - 9L", rate: "10%", amount: 30000 });
        slabs.push({ range: "9L - 12L", rate: "15%", amount: 45000 });
        tax += 90000;
        let slabAmount = taxableIncome - 1200000;
        let slabTax = slabAmount * 0.20;
        tax += slabTax;
        slabs.push({ range: "12L - 15L", rate: "20%", amount: Number(slabTax.toFixed(2)) });
    } else {
        slabs.push({ range: "0 - 3L", rate: "0%", amount: 0 });
        slabs.push({ range: "3L - 6L", rate: "5%", amount: 15000 });
        slabs.push({ range: "6L - 9L", rate: "10%", amount: 30000 });
        slabs.push({ range: "9L - 12L", rate: "15%", amount: 45000 });
        slabs.push({ range: "12L - 15L", rate: "20%", amount: 60000 });
        tax += 150000;
        let slabAmount = taxableIncome - 1500000;
        let slabTax = slabAmount * 0.30;
        tax += slabTax;
        slabs.push({ range: "Above 15L", rate: "30%", amount: Number(slabTax.toFixed(2)) });
    }

    return { tax, slabs };
};

export const calculateTax = ({ salary, hra = 0, lta = 0, deduction80C = 0, deduction80D = 0, age = 'below60', financial_year = '2024-2025' }) => {
    // Standard deduction
    let standardDeduction = 50000;

    // Calculate old regime taxable income
    let grossIncomeOld = Number(salary);
    let totalDeductionsOld = standardDeduction + Number(hra) + Number(lta) + Number(deduction80C) + Number(deduction80D);
    let taxableIncomeOld = Math.max(0, grossIncomeOld - totalDeductionsOld);

    // Calculate new regime taxable income (no deductions except standard)
    let grossIncomeNew = Number(salary);
    let totalDeductionsNew = standardDeduction;
    let taxableIncomeNew = Math.max(0, grossIncomeNew - totalDeductionsNew);

    // Calculate tax for old regime
    let { tax: baseTaxOld, slabs: slabsOld } = calculateOldRegimeTax(taxableIncomeOld);
    let cessOld = baseTaxOld * 0.04;
    let totalTaxOld = baseTaxOld + cessOld;
    let effectiveRateOld = salary > 0 ? (totalTaxOld / salary * 100) : 0;

    // Calculate tax for new regime
    let { tax: baseTaxNew, slabs: slabsNew } = calculateNewRegimeTax(taxableIncomeNew);

    // Apply Section 87A rebate for new regime (income <= 7L)
    let rebateNew = 0;
    if (taxableIncomeNew <= 700000) {
        rebateNew = Math.min(baseTaxNew, 25000);
    }

    let finalTaxNew = baseTaxNew - rebateNew;
    let cessNew = finalTaxNew * 0.04;
    let totalTaxNew = finalTaxNew + cessNew;
    let effectiveRateNew = salary > 0 ? (totalTaxNew / salary * 100) : 0;

    return {
        oldRegime: {
            taxableIncome: Number(taxableIncomeOld.toFixed(2)),
            slabs: slabsOld,
            baseTax: Number(baseTaxOld.toFixed(2)),
            cess: Number(cessOld.toFixed(2)),
            totalTax: Number(totalTaxOld.toFixed(2)),
            effectiveRate: Number(effectiveRateOld.toFixed(2))
        },
        newRegime: {
            taxableIncome: Number(taxableIncomeNew.toFixed(2)),
            slabs: slabsNew,
            baseTax: Number(baseTaxNew.toFixed(2)),
            rebate: Number(rebateNew.toFixed(2)),
            cess: Number(cessNew.toFixed(2)),
            totalTax: Number(totalTaxNew.toFixed(2)),
            effectiveRate: Number(effectiveRateNew.toFixed(2))
        }
    };
};

// ==========================================
// 2. HRA CALCULATOR
// ==========================================
export const calculateHRAExemption = (basic, hraReceived, rentPaid, cityValue) => {
    let condition1 = Number(hraReceived);

    let percentage = (cityValue === 'metro') ? 0.50 : 0.40;
    let condition2 = Number(basic) * percentage;

    let condition3 = Math.max(0, Number(rentPaid) - (Number(basic) * 0.10));

    let exemption = Math.min(condition1, condition2, condition3);
    let taxableHra = Math.max(0, Number(hraReceived) - exemption);

    return {
        exempted: Number(exemption.toFixed(2)),
        taxable: Number(taxableHra.toFixed(2)),
        breakdown: {
            actualReceived: Number(condition1.toFixed(2)),
            percentOfBasic: Number(condition2.toFixed(2)),
            rentMinusBasic: Number(condition3.toFixed(2))
        }
    };
};

// ==========================================
// 3. ADVANCE TAX CALCULATOR
// ==========================================
export const calculateAdvanceTax = (liability) => {
    return [
        { due_date: "15th June", percentage: 15, cumulative_amount: Number((liability * 0.15).toFixed(2)) },
        { due_date: "15th Sept", percentage: 45, cumulative_amount: Number((liability * 0.45).toFixed(2)) },
        { due_date: "15th Dec", percentage: 75, cumulative_amount: Number((liability * 0.75).toFixed(2)) },
        { due_date: "15th Mar", percentage: 100, cumulative_amount: Number((liability * 1.0).toFixed(2)) },
    ];
};

// ==========================================
// 4. TDS CALCULATOR
// ==========================================
export const calculateTDS = (salary, investments) => {
    // Assuming standard deduction and basic 80C for estimation
    let taxableIncome = Math.max(0, salary - 50000 - investments);

    // Using New Regime Logic for Default Estimation
    let { tax: baseTax } = calculateNewRegimeTax(taxableIncome);

    // Rebate 87A
    if (taxableIncome <= 700000) {
        baseTax = 0;
    }

    let cess = baseTax * 0.04;
    let totalTax = baseTax + cess;
    let monthlyTds = totalTax / 12;

    return {
        annualTax: Number(totalTax.toFixed(2)),
        monthlyTDS: Number(monthlyTds.toFixed(2))
    };
};

// ==========================================
// 5. 80C SUGGESTIONS
// ==========================================
export const calculate80CSuggestions = (invested) => {
    let limit = 150000;
    let remaining = Math.max(0, limit - invested);
    let suggestions = [];

    if (remaining > 0) {
        suggestions = [
            "ELSS Mutual Funds (Lock-in 3 years)",
            "PPF (Public Provident Fund)",
            "EPF (Employee Provident Fund)",
            "Life Insurance Premiums",
            "5-Year Tax Saver FD"
        ];
    }

    return {
        limit: limit,
        invested: invested,
        remaining: remaining,
        suggestions: suggestions
    };
};

// ==========================================
// 6. SALARY BREAKDOWN
// ==========================================
export const calculateSalaryBreakdown = (ctc) => {
    // 1. Monthly Gross
    let monthlyCtc = ctc / 12;

    // 2. Components
    let basicSalaryAnnual = ctc * 0.50;
    let pfAnnual = basicSalaryAnnual * 0.12;
    let ptAnnual = 2400; // Flat 200 * 12

    // 3. Tax Calculation (Simplified New Regime Estimation)
    let standardDeduction = 50000;
    let taxableIncome = Math.max(0, ctc - pfAnnual - ptAnnual - standardDeduction);

    // Use existing tax logic for estimate
    let { tax: baseTax } = calculateNewRegimeTax(taxableIncome);

    // Rebate 87A
    if (taxableIncome <= 700000) {
        baseTax = 0;
    }

    let cess = baseTax * 0.04;
    let totalTaxAnnual = baseTax + cess;

    // 4. Monthly In-Hand
    let monthlyPf = pfAnnual / 12;
    let monthlyPt = ptAnnual / 12;
    let monthlyTax = totalTaxAnnual / 12;

    let monthlyInHand = monthlyCtc - monthlyPf - monthlyPt - monthlyTax;

    return {
        annual: {
            ctc: Number(ctc.toFixed(2)),
            tax: Number(totalTaxAnnual.toFixed(2)),
            pf: Number(pfAnnual.toFixed(2)),
            pt: Number(ptAnnual.toFixed(2))
        },
        monthly: {
            gross: Number(monthlyCtc.toFixed(2)),
            pf: Number(monthlyPf.toFixed(2)),
            pt: Number(monthlyPt.toFixed(2)),
            tax: Number(monthlyTax.toFixed(2)),
            inHand: Number(monthlyInHand.toFixed(2))
        }
    };
};

// ==========================================
// 7. COMPOSITION SCHEME
// ==========================================
export const calculateCompositionTax = (turnover, businessType) => {
    let isEligible = false;
    let taxRate = 0;
    let taxAmount = 0;
    let reason = "";

    // Limits
    let limitNormal = 15000000; // 1.5 Cr
    let limitService = 5000000; // 50 Lakhs

    if (businessType === 'service_provider') {
        if (turnover <= limitService) {
            isEligible = true;
            taxRate = 6; // 3% CGST + 3% SGST
        } else {
            reason = "Turnover exceeds ₹50 Lakhs limit for Service Providers.";
        }
    } else {
        // Manufacturers, Traders, Restaurants
        if (turnover <= limitNormal) {
            isEligible = true;
            if (businessType === 'restaurant') {
                taxRate = 5; // 2.5% + 2.5%
            } else if (['manufacturer', 'trader'].includes(businessType)) {
                taxRate = 1; // 0.5% + 0.5%
            }
        } else {
            reason = "Turnover exceeds ₹1.5 Crore limit.";
        }
    }

    if (isEligible) {
        taxAmount = turnover * (taxRate / 100);
    }

    return {
        is_eligible: isEligible,
        tax_rate: taxRate,
        tax_amount: Number(taxAmount.toFixed(2)),
        turnover: turnover,
        cgst: Number((taxAmount / 2).toFixed(2)),
        sgst: Number((taxAmount / 2).toFixed(2)),
        reason: reason
    };
};

// ==========================================
// 8. CHATBOT LOGIC
// ==========================================
export const getBotResponse = (query) => {
    query = query.toLowerCase();

    // helper for keyword checking
    const has = (keywords, text = query) => {
        if (typeof keywords === 'string') return text.includes(keywords);
        return keywords.some(k => text.includes(k));
    };

    // --- GREETINGS & GENERAL HELP ---
    if (has(['hi', 'hello', 'hey', 'greetings', 'help', 'start'])) {
        return "Hello! I am your Virtual Tax Expert. I can answer almost anything about Indian Taxation.\n\n" +
            "Topics I know:\n" +
            "✅ Tools: Income Tax, GST, Salary, HRA, Advance Tax.\n" +
            "✅ Filing: ITR Forms (1, 2, 3, 4), Deadlines, Penalties.\n" +
            "✅ Investments: Capital Gains (Stocks, Gold, Property), Crypto.\n" +
            "✅ Deductions: 80C, 80D, Home Loan, HRA.\n" +
            "✅ Freelancing: Presumptive Tax (44ADA).\n\n" +
            "Just ask freely! E.g., 'Tax on Crypto', 'Which ITR should I file?', or 'LTCG on shares'.";
    }

    // ==========================================
    // 1. SITE TOOLS (What/Why/How)
    // ==========================================

    // Income Tax
    if (has('income tax') || has('tax calculator')) {
        return "Income Tax Calculator\n" +
            "• What: Estimates annual tax ability.\n" +
            "• Why: Compare Old vs New Regime to save money.\n" +
            "• How: Enter Salary & Deductions. We apply FY 24-25 slabs.";
    }

    // GST
    if (has('gst') && !has('composition')) {
        return "GST Calculator\n" +
            "• What: Calculates GST portion in a price.\n" +
            "• Rates: 5%, 12%, 18%, 28%.\n" +
            "• Formula: Net Price = Original Cost + (Original Cost * Rate/100).";
    }

    // HRA
    if (has(['hra', 'house rent'])) {
        return "HRA Exemption (Old Regime)\n" +
            "• Rule: Least of 3 is exempt:\n" +
            "  1. Actual HRA\n" +
            "  2. 50% Basic (Metro) / 40% (Non-Metro)\n" +
            "  3. Rent Paid - 10% Basic\n" +
            "👉 Use our HRA Calculator for exact figures.";
    }

    // Advance Tax
    if (has('advance')) {
        return "Advance Tax\n" +
            "• Who: If tax liability > ₹10,000/year.\n" +
            "• Schedule: 15% (Jun 15), 45% (Sep 15), 75% (Dec 15), 100% (Mar 15).\n" +
            "• Penalty: 1% monthly interest under Sec 234B/C if missed.";
    }

    // TDS
    if (has('tds')) {
        return "TDS (Tax Deducted at Source)\n" +
            "• Salary: Employer deducts monthly based on slabs.\n" +
            "• Interest: Bank deducts 10% if interest > ₹40k.\n" +
            "• Refund: If TDS > Actual Tax, claim refund in ITR.";
    }

    // 80C
    if (has('80c')) {
        return "Section 80C (Limit: ₹1.5 Lakhs)\n" +
            "• Popluar Options: PPF, EPF, ELSS (Mutual Funds), LIC, Sukanya Samriddhi.\n" +
            "• Old Regime Only: Not available in New Regime.";
    }

    // Salary
    if (has(['salary', 'ctc', 'in hand'])) {
        return "CTC vs In-Hand Salary\n" +
            "• CTC: Cost to Company (includes PF, Gratuity, Insurance).\n" +
            "• In-Hand: CTC minus (PF Employee Share + Professional Tax + TDS).\n" +
            "• Note: Employer's PF contribution is part of CTC but not In-Hand.";
    }

    // Composition
    if (has('composition')) {
        return "GST Composition Scheme\n" +
            "• For: Small businesses (Turnover < ₹1.5 Cr).\n" +
            "• Rates: 1% (Traders/Mfr), 5% (Restaurants), 6% (Service Providers).\n" +
            "• Pros/Cons: Less compliance, but No Input Tax Credit.";
    }

    // ==========================================
    // 2. ADVANCED TAX KNOWLEDGE (The "Expert" Part)
    // ==========================================

    // ITR Forms
    if (has('itr') || has('form')) {
        return "Which ITR Form to file?\n" +
            "• ITR-1 (Sahaj): Salaried/Pensioners, Income < 50L, One House prop.\n" +
            "• ITR-2: Capital Gains, Foreign Assets, >1 House prop, Income > 50L.\n" +
            "• ITR-3: Business/Profession Income (Regular).\n" +
            "• ITR-4 (Sugam): Presumptive Business/Freelancing (Sec 44AD/ADA).";
    }

    // Capital Gains (Equity)
    if (has(['stock', 'equity', 'share', 'mutual fund']) && has(['gain', 'tax', 'ltcg', 'stcg'])) {
        return "Capital Gains on Equity/Shares (Budget 2024 Updates)\n" +
            "• STCG (Sold < 1 year): 20% tax.\n" +
            "• LTCG (Sold > 1 year): 12.5% tax (Exempt up to ₹1.25 Lakhs/year).";
    }

    // Capital Gains (Real Estate/Gold)
    if (has(['property', 'real estate', 'gold', 'land']) && has(['gain', 'tax'])) {
        return "Captial Gains on Property/Gold (Budget 2024)\n" +
            "• STCG: Added to income and taxed at slab rates.\n" +
            "• LTCG (Sold > 2 years): 12.5% (No Indexation benefit generally available now for new purchases, grandfathering rules may apply).";
    }

    // Crypto
    if (has(['crypto', 'bitcoin', 'vda'])) {
        return "Tax on Crypto (VDA)\n" +
            "• Rate: Flat 30% tax on profits.\n" +
            "• TDS: 1% on transfer.\n" +
            "• Losses: Cannot be set off against other income or gains.\n" +
            "• Regime: Same tax for everyone.";
    }

    // Freelancing / 44ADA
    if (has(['freelance', 'consultant', 'doctor', '44ada'])) {
        return "Presumptive Taxation for Freelancers (Sec 44ADA)\n" +
            "• Eligibility: Professionals with Gross Receipts < ₹75 Lakhs.\n" +
            "• Benefit: Declare only 50% of income as profit.\n" +
            "• Tax: Pay tax only on that 50%. No need to maintain audit books.";
    }

    // Savings Interest
    if (has(['savings interest', '80tta', '80ttb', 'bank interest'])) {
        return "Savings Bank Interest Tax\n" +
            "• Sec 80TTA: Exempt up to ₹10,000 (Below 60 years).\n" +
            "• Sec 80TTB: Exempt up to ₹50,000 (Senior Citizens 60+).\n" +
            "• Excess interest is added to income and taxed.";
    }

    // Penalties
    if (has(['penalty', 'late', 'fine', '234'])) {
        return "Penalties & Late Fees\n" +
            "• Late Filing (Sec 234F): ₹5,000 if filed after 31st July (₹1,000 if income < 5L).\n" +
            "• Interest (Sec 234A): 1% per month for delay in filing.\n" +
            "• Advance Tax Default (Sec 234B/C): 1% per month interest.";
    }

    // Refunds
    if (has(['refund', 'claim'])) {
        return "Income Tax Refund\n" +
            "• When: If you paid more tax (TDS/Advance) than your actual liability.\n" +
            "• How: Automatically calculated when you file ITR.\n" +
            "• Status: Check on the e-Filing portal after processing.";
    }

    // Form 16
    if (has('form 16')) {
        return "Form 16\n" +
            "• A certificate from your employer showing total salary paid and TDS deducted.\n" +
            "• Part A: TDS details.\n" +
            "• Part B: Salary breakdown and computations.\n" +
            "• Needed for filing ITR-1 or ITR-2.";
    }

    // Gifts
    if (has('gift')) {
        return "Tax on Gifts\n" +
            "• Exempt: Gifts from relatives (Parents, Spouse, Siblings) are 100% tax-free.\n" +
            "• Wedding: Gifts received on marriage are tax-free.\n" +
            "• Others: If total value > ₹50,000/year, the entire amount is taxable.";
    }

    // Home Loan
    if (has(['home loan', '24b', 'housing loan'])) {
        return "Home Loan Tax Benefits\n" +
            "• Principal: Sec 80C (up to 1.5L).\n" +
            "• Interest: Sec 24(b) (up to ₹2 Lakhs for self-occupied).\n" +
            "• Joint Loan: Both owners can claim these limits separately!";
    }

    // ==========================================
    // 3. SPECIFIC TAX SLABS (Fallthrough)
    // ==========================================
    if (has(['slab', 'rate', 'bracket'])) {
        return "New Regime Slabs (FY 2024-25):\n" +
            "0-3L: Nil | 3-7L: 5% (Rebate u/s 87A) | 7-9L: 10% | 9-12L: 15% | 12-15L: 20% | >15L: 30%.\n\n" +
            "Old Regime Slabs:\n" +
            "0-2.5L: Nil | 2.5-5L: 5% | 5-10L: 20% | >10L: 30%.";
    }

    // ==========================================
    // 4. DEFAULT
    // ==========================================
    return "I can answer almost anything about Indian Tax!\n\n" +
        "Try specific questions:\n" +
        "- 'Tax on selling shares' (Capital Gains)\n" +
        "- 'Limit for 80D?' (Medical)\n" +
        "- 'How is Freelance tax calculated?'\n" +
        "- 'Penalty for late filing' \n" +
        "- 'Tax on Crypto'.";
};
