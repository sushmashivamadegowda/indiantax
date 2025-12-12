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


def calculate_tax(salary, hra, lta, deduction80C, deduction80D, age):
    """
    Main tax calculation function
    Returns both old and new regime calculations
    """
    # Standard deduction
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