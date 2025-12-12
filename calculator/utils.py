"""
Tax Calculation Utilities for Indian Income Tax (FY 2024-25)
"""

def calculate_old_regime_tax(taxable_income):
    """
    Calculate tax under old regime
    Slabs: 0-2.5L:0%, 2.5-5L:5%, 5-10L:20%, 10L+:30%
    """
    slabs = []
    tax = 0
    
    if taxable_income <= 250000:
        slabs.append({
            "range": "0 - 2.5L",
            "rate": "0%",
            "amount": 0
        })
    elif taxable_income <= 500000:
        slabs.append({
            "range": "0 - 2.5L",
            "rate": "0%",
            "amount": 0
        })
        slab_amount = taxable_income - 250000
        slab_tax = slab_amount * 0.05
        tax += slab_tax
        slabs.append({
            "range": "2.5L - 5L",
            "rate": "5%",
            "amount": round(slab_tax, 2)
        })
    elif taxable_income <= 1000000:
        slabs.append({
            "range": "0 - 2.5L",
            "rate": "0%",
            "amount": 0
        })
        slabs.append({
            "range": "2.5L - 5L",
            "rate": "5%",
            "amount": 12500
        })
        tax += 12500
        slab_amount = taxable_income - 500000
        slab_tax = slab_amount * 0.20
        tax += slab_tax
        slabs.append({
            "range": "5L - 10L",
            "rate": "20%",
            "amount": round(slab_tax, 2)
        })
    else:
        slabs.append({
            "range": "0 - 2.5L",
            "rate": "0%",
            "amount": 0
        })
        slabs.append({
            "range": "2.5L - 5L",
            "rate": "5%",
            "amount": 12500
        })
        slabs.append({
            "range": "5L - 10L",
            "rate": "20%",
            "amount": 100000
        })
        tax += 112500
        slab_amount = taxable_income - 1000000
        slab_tax = slab_amount * 0.30
        tax += slab_tax
        slabs.append({
            "range": "Above 10L",
            "rate": "30%",
            "amount": round(slab_tax, 2)
        })
    
    return tax, slabs


def calculate_new_regime_tax(taxable_income):
    """
    Calculate tax under new regime
    Slabs: 0-3L:0%, 3-6L:5%, 6-9L:10%, 9-12L:15%, 12-15L:20%, 15L+:30%
    """
    slabs = []
    tax = 0
    
    if taxable_income <= 300000:
        slabs.append({
            "range": "0 - 3L",
            "rate": "0%",
            "amount": 0
        })
    elif taxable_income <= 600000:
        slabs.append({
            "range": "0 - 3L",
            "rate": "0%",
            "amount": 0
        })
        slab_amount = taxable_income - 300000
        slab_tax = slab_amount * 0.05
        tax += slab_tax
        slabs.append({
            "range": "3L - 6L",
            "rate": "5%",
            "amount": round(slab_tax, 2)
        })
    elif taxable_income <= 900000:
        slabs.append({
            "range": "0 - 3L",
            "rate": "0%",
            "amount": 0
        })
        slabs.append({
            "range": "3L - 6L",
            "rate": "5%",
            "amount": 15000
        })
        tax += 15000
        slab_amount = taxable_income - 600000
        slab_tax = slab_amount * 0.10
        tax += slab_tax
        slabs.append({
            "range": "6L - 9L",
            "rate": "10%",
            "amount": round(slab_tax, 2)
        })
    elif taxable_income <= 1200000:
        slabs.append({
            "range": "0 - 3L",
            "rate": "0%",
            "amount": 0
        })
        slabs.append({
            "range": "3L - 6L",
            "rate": "5%",
            "amount": 15000
        })
        slabs.append({
            "range": "6L - 9L",
            "rate": "10%",
            "amount": 30000
        })
        tax += 45000
        slab_amount = taxable_income - 900000
        slab_tax = slab_amount * 0.15
        tax += slab_tax
        slabs.append({
            "range": "9L - 12L",
            "rate": "15%",
            "amount": round(slab_tax, 2)
        })
    elif taxable_income <= 1500000:
        slabs.append({
            "range": "0 - 3L",
            "rate": "0%",
            "amount": 0
        })
        slabs.append({
            "range": "3L - 6L",
            "rate": "5%",
            "amount": 15000
        })
        slabs.append({
            "range": "6L - 9L",
            "rate": "10%",
            "amount": 30000
        })
        slabs.append({
            "range": "9L - 12L",
            "rate": "15%",
            "amount": 45000
        })
        tax += 90000
        slab_amount = taxable_income - 1200000
        slab_tax = slab_amount * 0.20
        tax += slab_tax
        slabs.append({
            "range": "12L - 15L",
            "rate": "20%",
            "amount": round(slab_tax, 2)
        })
    else:
        slabs.append({
            "range": "0 - 3L",
            "rate": "0%",
            "amount": 0
        })
        slabs.append({
            "range": "3L - 6L",
            "rate": "5%",
            "amount": 15000
        })
        slabs.append({
            "range": "6L - 9L",
            "rate": "10%",
            "amount": 30000
        })
        slabs.append({
            "range": "9L - 12L",
            "rate": "15%",
            "amount": 45000
        })
        slabs.append({
            "range": "12L - 15L",
            "rate": "20%",
            "amount": 60000
        })
        tax += 150000
        slab_amount = taxable_income - 1500000
        slab_tax = slab_amount * 0.30
        tax += slab_tax
        slabs.append({
            "range": "Above 15L",
            "rate": "30%",
            "amount": round(slab_tax, 2)
        })
    
    return tax, slabs



def calculate_tax(salary, hra, lta, deduction80C, deduction80D, age, financial_year='2024-2025'):
    """
    Main tax calculation function
    Returns both old and new regime calculations
    """
    # Standard deduction
    standard_deduction = 50000
    if financial_year == '2025-2026':
        # Placeholder for potential future changes
        standard_deduction = 50000 
    
    # Calculate old regime taxable income
    gross_income_old = salary
    total_deductions_old = standard_deduction + hra + lta + deduction80C + deduction80D
    taxable_income_old = max(0, gross_income_old - total_deductions_old)
    
    # Calculate new regime taxable income (no deductions except standard)
    gross_income_new = salary
    total_deductions_new = standard_deduction
    taxable_income_new = max(0, gross_income_new - total_deductions_new)
    
    # Calculate tax for old regime
    base_tax_old, slabs_old = calculate_old_regime_tax(taxable_income_old)
    cess_old = base_tax_old * 0.04
    total_tax_old = base_tax_old + cess_old
    effective_rate_old = (total_tax_old / salary * 100) if salary > 0 else 0
    
    # Calculate tax for new regime
    base_tax_new, slabs_new = calculate_new_regime_tax(taxable_income_new)
    
    # Apply Section 87A rebate for new regime (income <= 7L)
    rebate_new = 0
    if taxable_income_new <= 700000:
        rebate_new = min(base_tax_new, 25000)
    
    final_tax_new = base_tax_new - rebate_new
    cess_new = final_tax_new * 0.04
    total_tax_new = final_tax_new + cess_new
    effective_rate_new = (total_tax_new / salary * 100) if salary > 0 else 0
    
    return {
        "oldRegime": {
            "taxableIncome": round(taxable_income_old, 2),
            "slabs": slabs_old,
            "baseTax": round(base_tax_old, 2),
            "cess": round(cess_old, 2),
            "totalTax": round(total_tax_old, 2),
            "effectiveRate": round(effective_rate_old, 2)
        },
        "newRegime": {
            "taxableIncome": round(taxable_income_new, 2),
            "slabs": slabs_new,
            "baseTax": round(base_tax_new, 2),
            "rebate": round(rebate_new, 2),
            "cess": round(cess_new, 2),
            "totalTax": round(total_tax_new, 2),
            "effectiveRate": round(effective_rate_new, 2)
        }
    }


def calculate_hra_exemption(basic_salary, hra_received, rent_paid, city_type):
    """
    Calculate HRA Exemption (Old Regime)
    Least of:
    1. Actual HRA Received
    2. 50% of Basic (Metro) or 40% of Basic (Non-Metro)
    3. Rent Paid - 10% of Basic
    """
    condition1 = hra_received
    
    percentage = 0.50 if city_type == 'metro' else 0.40
    condition2 = basic_salary * percentage
    
    condition3 = max(0, rent_paid - (basic_salary * 0.10))
    
    exemption = min(condition1, condition2, condition3)
    taxable_hra = max(0, hra_received - exemption)
    
    return {
        "exempted": round(exemption, 2),
        "taxable": round(taxable_hra, 2),
        "breakdown": {
            "actualReceived": round(condition1, 2),
            "percentOfBasic": round(condition2, 2),
            "rentMinusBasic": round(condition3, 2)
        }
    }


def calculate_advance_tax(estimated_tax_liability):
    """
    Calculate Advance Tax Schedule
    """
    schedule = [
        {"due_date": "15th June", "percentage": 15, "cumulative_amount": round(estimated_tax_liability * 0.15, 2)},
        {"due_date": "15th Sept", "percentage": 45, "cumulative_amount": round(estimated_tax_liability * 0.45, 2)},
        {"due_date": "15th Dec", "percentage": 75, "cumulative_amount": round(estimated_tax_liability * 0.75, 2)},
        {"due_date": "15th Mar", "percentage": 100, "cumulative_amount": round(estimated_tax_liability * 1.0, 2)},
    ]
    return schedule


def calculate_tds(salary, investments):
    """
    Simple TDS Estimator (Monthly)
    """
    # Assuming standard deduction and basic 80C for estimation
    taxable_income = max(0, salary - 50000 - investments)
    
    # Using New Regime Logic for Default Estimation
    base_tax, _ = calculate_new_regime_tax(taxable_income)
    
    # Rebate 87A
    if taxable_income <= 700000:
        base_tax = 0
        
    cess = base_tax * 0.04
    total_tax = base_tax + cess
    monthly_tds = total_tax / 12
    
    return {
        "annualTax": round(total_tax, 2),
        "monthlyTDS": round(monthly_tds, 2)
    }


def calculate_80c_suggestions(current_investments):
    """
    Suggest remaining 80C limit
    Limit: 1.5 Lakhs
    """
    limit = 150000
    remaining = max(0, limit - current_investments)
    suggestions = []
    
    if remaining > 0:
        suggestions = [
            "ELSS Mutual Funds (Lock-in 3 years)",
            "PPF (Public Provident Fund)",
            "EPF (Employee Provident Fund)",
            "Life Insurance Premiums",
            "5-Year Tax Saver FD"
        ]
        
    return {
        "limit": limit,
        "invested": current_investments,
        "remaining": remaining,
        "suggestions": suggestions
    }


def calculate_salary_breakdown(ctc):
    """
    Calculate Monthly Salary Breakdown from Annual CTC
    Assumptions:
    - Basic Salary = 50% of CTC
    - PF (Employee) = 12% of Basic
    - Professional Tax = 200/month (flat average)
    - Tax: Calculated on (CTC - PF - PT - Standard Deduction) using New Regime
    """
    # 1. Monthly Gross
    monthly_ctc = ctc / 12
    
    # 2. Components
    basic_salary_annual = ctc * 0.50
    pf_annual = basic_salary_annual * 0.12
    pt_annual = 2400 # Flat 200 * 12
    
    # 3. Tax Calculation (Simplified New Regime Estimation)
    standard_deduction = 50000
    taxable_income = max(0, ctc - pf_annual - pt_annual - standard_deduction)
    
    # Use existing tax logic for estimate
    base_tax, _ = calculate_new_regime_tax(taxable_income)
    
    # Rebate 87A
    if taxable_income <= 700000:
        base_tax = 0
        
    cess = base_tax * 0.04
    total_tax_annual = base_tax + cess
    
    # 4. Monthly In-Hand
    monthly_pf = pf_annual / 12
    monthly_pt = pt_annual / 12
    monthly_tax = total_tax_annual / 12
    
    monthly_in_hand = monthly_ctc - monthly_pf - monthly_pt - monthly_tax
    
    return {
        "annual": {
            "ctc": round(ctc, 2),
            "tax": round(total_tax_annual, 2),
            "pf": round(pf_annual, 2),
            "pt": round(pt_annual, 2)
        },
        "monthly": {
            "gross": round(monthly_ctc, 2),
            "pf": round(monthly_pf, 2),
            "pt": round(monthly_pt, 2),
            "tax": round(monthly_tax, 2),
            "inHand": round(monthly_in_hand, 2)
        }
    }


def calculate_composition_tax(turnover, business_type):
    """
    Calculate GST Composition Scheme Tax
    """
    is_eligible = False
    tax_rate = 0
    tax_amount = 0
    reason = ""

    # Limits
    limit_normal = 15000000 # 1.5 Cr
    limit_service = 5000000 # 50 Lakhs

    if business_type == 'service_provider':
        if turnover <= limit_service:
            is_eligible = True
            tax_rate = 6 # 3% CGST + 3% SGST
        else:
            reason = "Turnover exceeds ₹50 Lakhs limit for Service Providers."
    else:
        # Manufacturers, Traders, Restaurants
        if turnover <= limit_normal:
            is_eligible = True
            if business_type == 'restaurant':
                tax_rate = 5 # 2.5% + 2.5%
            elif business_type in ['manufacturer', 'trader']:
                tax_rate = 1 # 0.5% + 0.5%
        else:
            reason = "Turnover exceeds ₹1.5 Crore limit."

    if is_eligible:
        tax_amount = turnover * (tax_rate / 100)

    return {
        "is_eligible": is_eligible,
        "tax_rate": tax_rate,
        "tax_amount": round(tax_amount, 2),
        "turnover": turnover,
        "cgst": round(tax_amount / 2, 2),
        "sgst": round(tax_amount / 2, 2),
        "reason": reason
    }

def get_bot_response(query):
    """
    Comprehensive rule-based chatbot logic for Tax Assistant.
    Acts as a 'Virtual Tax Expert' covering site tools + General Indian Tax Knowledge.
    Updated for FY 2024-25 (Budget 2024 changes included).
    """
    query = query.lower()
    
    # helper for keyword checking
    def has(keywords, text=query):
        if isinstance(keywords, str): return keywords in text
        return any(k in text for k in keywords)

    # --- GREETINGS & GENERAL HELP ---
    if has(['hi', 'hello', 'hey', 'greetings', 'help', 'start']):
        return (
            "Hello! I am your Virtual Tax Expert. I can answer almost anything about Indian Taxation.\n\n"
            "Topics I know:\n"
            "✅ Tools: Income Tax, GST, Salary, HRA, Advance Tax.\n"
            "✅ Filing: ITR Forms (1, 2, 3, 4), Deadlines, Penalties.\n"
            "✅ Investments: Capital Gains (Stocks, Gold, Property), Crypto.\n"
            "✅ Deductions: 80C, 80D, Home Loan, HRA.\n"
            "✅ Freelancing: Presumptive Tax (44ADA).\n\n"
            "Just ask freely! E.g., 'Tax on Crypto', 'Which ITR should I file?', or 'LTCG on shares'."
        )

    # ==========================================
    # 1. SITE TOOLS (What/Why/How)
    # ==========================================
    
    # Income Tax
    if has('income tax') or has('tax calculator'):
        return (
            "Income Tax Calculator\n"
            "• What: Estimates annual tax ability.\n"
            "• Why: Compare Old vs New Regime to save money.\n"
            "• How: Enter Salary & Deductions. We apply FY 24-25 slabs."
        )

    # GST
    if has('gst') and not has('composition'):
        return (
            "GST Calculator\n"
            "• What: Calculates GST portion in a price.\n"
            "• Rates: 5%, 12%, 18%, 28%.\n"
            "• Formula: Net Price = Original Cost + (Original Cost * Rate/100)."
        )

    # HRA
    if has(['hra', 'house rent']):
        return (
            "HRA Exemption (Old Regime)\n"
            "• Rule: Least of 3 is exempt:\n"
            "  1. Actual HRA\n"
            "  2. 50% Basic (Metro) / 40% (Non-Metro)\n"
            "  3. Rent Paid - 10% Basic\n"
            "👉 Use our HRA Calculator for exact figures."
        )
        
    # Advance Tax
    if has('advance'):
        return (
            "Advance Tax\n"
            "• Who: If tax liability > ₹10,000/year.\n"
            "• Schedule: 15% (Jun 15), 45% (Sep 15), 75% (Dec 15), 100% (Mar 15).\n"
            "• Penalty: 1% monthly interest under Sec 234B/C if missed."
        )

    # TDS
    if has('tds'):
        return (
            "TDS (Tax Deducted at Source)\n"
            "• Salary: Employer deducts monthly based on slabs.\n"
            "• Interest: Bank deducts 10% if interest > ₹40k.\n"
            "• Refund: If TDS > Actual Tax, claim refund in ITR."
        )

    # 80C
    if has('80c'):
        return (
            "Section 80C (Limit: ₹1.5 Lakhs)\n"
            "• Popluar Options: PPF, EPF, ELSS (Mutual Funds), LIC, Sukanya Samriddhi.\n"
            "• Old Regime Only: Not available in New Regime."
        )

    # Salary
    if has(['salary', 'ctc', 'in hand']):
        return (
            "CTC vs In-Hand Salary\n"
            "• CTC: Cost to Company (includes PF, Gratuity, Insurance).\n"
            "• In-Hand: CTC minus (PF Employee Share + Professional Tax + TDS).\n"
            "• Note: Employer's PF contribution is part of CTC but not In-Hand."
        )

    # Composition
    if has('composition'):
        return (
            "GST Composition Scheme\n"
            "• For: Small businesses (Turnover < ₹1.5 Cr).\n"
            "• Rates: 1% (Traders/Mfr), 5% (Restaurants), 6% (Service Providers).\n"
            "• Pros/Cons: Less compliance, but No Input Tax Credit."
        )

    # ==========================================
    # 2. ADVANCED TAX KNOWLEDGE (The "Expert" Part)
    # ==========================================

    # ITR Forms
    if has('itr') or has('form'):
        return (
            "Which ITR Form to file?\n"
            "• ITR-1 (Sahaj): Salaried/Pensioners, Income < 50L, One House prop.\n"
            "• ITR-2: Capital Gains, Foreign Assets, >1 House prop, Income > 50L.\n"
            "• ITR-3: Business/Profession Income (Regular).\n"
            "• ITR-4 (Sugam): Presumptive Business/Freelancing (Sec 44AD/ADA)."
        )

    # Capital Gains (Equity)
    if has(['stock', 'equity', 'share', 'mutual fund']) and has(['gain', 'tax', 'ltcg', 'stcg']):
        return (
            "Capital Gains on Equity/Shares (Budget 2024 Updates)\n"
            "• STCG (Sold < 1 year): 20% tax.\n"
            "• LTCG (Sold > 1 year): 12.5% tax (Exempt up to ₹1.25 Lakhs/year)."
        )
        
    # Capital Gains (Real Estate/Gold)
    if has(['property', 'real estate', 'gold', 'land']) and has(['gain', 'tax']):
        return (
            "Captial Gains on Property/Gold (Budget 2024)\n"
            "• STCG: Added to income and taxed at slab rates.\n"
            "• LTCG (Sold > 2 years): 12.5% (No Indexation benefit generally available now for new purchases, grandfathering rules may apply)."
        )
        
    # Crypto
    if has(['crypto', 'bitcoin', 'vda']):
        return (
            "Tax on Crypto (VDA)\n"
            "• Rate: Flat 30% tax on profits.\n"
            "• TDS: 1% on transfer.\n"
            "• Losses: Cannot be set off against other income or gains.\n"
            "• Regime: Same tax for everyone."
        )

    # Freelancing / 44ADA
    if has(['freelance', 'consultant', 'doctor', '44ada']):
        return (
            "Presumptive Taxation for Freelancers (Sec 44ADA)\n"
            "• Eligibility: Professionals with Gross Receipts < ₹75 Lakhs.\n"
            "• Benefit: Declare only 50% of income as profit.\n"
            "• Tax: Pay tax only on that 50%. No need to maintain audit books."
        )

    # Savings Interest
    if has(['savings interest', '80tta', '80ttb', 'bank interest']):
        return (
            "Savings Bank Interest Tax\n"
            "• Sec 80TTA: Exempt up to ₹10,000 (Below 60 years).\n"
            "• Sec 80TTB: Exempt up to ₹50,000 (Senior Citizens 60+).\n"
            "• Excess interest is added to income and taxed."
        )
        
    # Penalties
    if has(['penalty', 'late', 'fine', '234']):
        return (
            "Penalties & Late Fees\n"
            "• Late Filing (Sec 234F): ₹5,000 if filed after 31st July (₹1,000 if income < 5L).\n"
            "• Interest (Sec 234A): 1% per month for delay in filing.\n"
            "• Advance Tax Default (Sec 234B/C): 1% per month interest."
        )

    # Refunds
    if has(['refund', 'claim']):
        return (
            "Income Tax Refund\n"
            "• When: If you paid more tax (TDS/Advance) than your actual liability.\n"
            "• How: Automatically calculated when you file ITR.\n"
            "• Status: Check on the e-Filing portal after processing."
        )

    # Form 16
    if has('form 16'):
        return (
            "Form 16\n"
            "• A certificate from your employer showing total salary paid and TDS deducted.\n"
            "• Part A: TDS details.\n"
            "• Part B: Salary breakdown and computations.\n"
            "• Needed for filing ITR-1 or ITR-2."
        )

    # Gifts
    if has('gift'):
        return (
            "Tax on Gifts\n"
            "• Exempt: Gifts from relatives (Parents, Spouse, Siblings) are 100% tax-free.\n"
            "• Wedding: Gifts received on marriage are tax-free.\n"
            "• Others: If total value > ₹50,000/year, the entire amount is taxable."
        )

    # Home Loan
    if has(['home loan', '24b', 'housing loan']):
        return (
            "Home Loan Tax Benefits\n"
            "• Principal: Sec 80C (up to 1.5L).\n"
            "• Interest: Sec 24(b) (up to ₹2 Lakhs for self-occupied).\n"
            "• Joint Loan: Both owners can claim these limits separately!"
        )

    # ==========================================
    # 3. SPECIFIC TAX SLABS (Fallthrough)
    # ==========================================
    if has(['slab', 'rate', 'bracket']):
         return (
            "New Regime Slabs (FY 2024-25):\n"
            "0-3L: Nil | 3-7L: 5% (Rebate u/s 87A) | 7-9L: 10% | 9-12L: 15% | 12-15L: 20% | >15L: 30%.\n\n"
            "Old Regime Slabs:\n"
            "0-2.5L: Nil | 2.5-5L: 5% | 5-10L: 20% | >10L: 30%."
        )

    # ==========================================
    # 4. DEFAULT
    # ==========================================
    return (
        "I can answer almost anything about Indian Tax!\n\n"
        "Try specific questions:\n"
        "- 'Tax on selling shares' (Capital Gains)\n"
        "- 'Limit for 80D?' (Medical)\n"
        "- 'How is Freelance tax calculated?'\n"
        "- 'Penalty for late filing' \n"
        "- 'Tax on Crypto'."
    )