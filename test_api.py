"""
Test script for the tax calculator API
"""
import requests
import json

# Test data
test_data = {
    "salary": 1000000,
    "hra": 100000,
    "lta": 50000,
    "deduction80C": 150000,
    "deduction80D": 25000,
    "age": "below60"
}

# API endpoint
url = "http://localhost:8000/api/calculate-tax/"

print("Testing Tax Calculator API")
print("=" * 50)
print(f"\nTest Input:")
print(json.dumps(test_data, indent=2))

try:
    response = requests.post(url, json=test_data)
    
    if response.status_code == 200:
        print(f"\n✓ API Response (Status: {response.status_code})")
        print("=" * 50)
        result = response.json()
        print(json.dumps(result, indent=2))
        
        print("\n" + "=" * 50)
        print("COMPARISON:")
        print(f"Old Regime Tax: ₹{result['oldRegime']['totalTax']:,.2f}")
        print(f"New Regime Tax: ₹{result['newRegime']['totalTax']:,.2f}")
        
        if result['oldRegime']['totalTax'] < result['newRegime']['totalTax']:
            print("\n✓ Old Regime is better!")
        else:
            print("\n✓ New Regime is better!")
    else:
        print(f"\n✗ API Error (Status: {response.status_code})")
        print(response.json())
        
except requests.exceptions.ConnectionError:
    print("\n✗ Could not connect to API. Make sure Django server is running:")
    print("  python manage.py runserver")
except Exception as e:
    print(f"\n✗ Error: {str(e)}")