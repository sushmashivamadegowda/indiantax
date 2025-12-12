# Indian Income Tax Calculator (FY 2024-25)

A complete web application to calculate Indian Income Tax for Financial Year 2024-25. Compare Old vs New Tax Regime with detailed breakdowns and smart recommendations.

## ⚡ Quick Start (Run in 2 mins)

### 1. Get the Code
```bash
git clone https://github.com/sushmashivamadegowda/indiantax.git
cd indiantax
```

### 2. Run Backend (Terminal 1)
```bash
# Install dependencies
pip install -r requirements.txt

# Start Server
python manage.py runserver
```

### 3. Run Frontend (Terminal 2)
```bash
cd frontend
npm install
npm start
```

The app will open at `http://localhost:3000`.

## 🚀 Features

- **Dual Regime Comparison**: Calculate tax under both Old and New Tax Regime
- **Accurate Calculations**: Based on latest IT rules for FY 2024-25
- **Detailed Breakdown**: Slab-wise tax calculation with visual representation
- **Smart Recommendations**: Highlights which regime saves you more money
- **User-Friendly Interface**: Clean, responsive design with TailwindCSS
- **Real-time Results**: Instant tax calculations via REST API

## 📋 Tax Features Supported

### Old Tax Regime
- Tax Slabs: 0-2.5L (0%), 2.5-5L (5%), 5-10L (20%), 10L+ (30%)
- Standard Deduction: ₹50,000
- Section 80C Deduction: Up to ₹1,50,000
- Section 80D Deduction: Medical Insurance
- HRA and LTA exemptions

### New Tax Regime
- Tax Slabs: 0-3L (0%), 3-6L (5%), 6-9L (10%), 9-12L (15%), 12-15L (20%), 15L+ (30%)
- Standard Deduction: ₹50,000
- Section 87A Rebate: ₹25,000 (for income ≤ ₹7L)
- Simplified calculations (no other deductions)

### Common
- 4% Health & Education Cess on final tax amount
- Age-based calculations support

## 🛠️ Technology Stack

### Backend
- **Django 5.2.5**: Python web framework
- **Django REST Framework 3.16.1**: API development
- **Django CORS Headers 4.9.0**: Cross-origin resource sharing
- **SQLite**: Database (default Django DB)

### Frontend
- **React 18**: UI library
- **React Router DOM**: Client-side routing
- **TailwindCSS**: Utility-first CSS framework
- **Axios**: HTTP client for API calls

## 📁 Project Structure

```
indiantaxcalc/
├── calculator/                 # Django app
│   ├── serializers.py         # API serializers
│   ├── views.py               # API views
│   ├── urls.py                # App URLs
│   └── utils.py               # Tax calculation logic
├── indiantaxcalc/             # Django project
│   ├── settings.py            # Project settings
│   └── urls.py                # Main URLs
├── frontend/                   # React app
│   ├── src/
│   │   ├── components/
│   │   │   ├── TaxCalculator.js    # Main calculator component
│   │   │   └── ResultsCard.js      # Results display component
│   │   ├── pages/
│   │   │   └── Home.js             # Landing page
│   │   ├── App.js                  # Main app component
│   │   └── index.css               # Tailwind CSS
│   ├── tailwind.config.js     # Tailwind configuration
│   └── package.json           # Node dependencies
├── requirements.txt           # Python dependencies
├── test_api.py               # Backend API test script
└── README.md                 # This file
```

## 🚀 Setup Instructions

### Prerequisites
- Python 3.8+ installed
- Node.js 14+ and npm installed
- Git (optional)

### Backend Setup (Django)

1. **Navigate to project directory**
   ```bash
   cd indiantaxcalc
   ```

2. **Create and activate virtual environment** (recommended)
   ```bash
   # Windows
   python -m venv env
   env\Scripts\activate

   # Linux/Mac
   python3 -m venv env
   source env/bin/activate
   ```

3. **Install Python dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run database migrations**
   ```bash
   python manage.py migrate
   ```

5. **Start Django development server**
   ```bash
   python manage.py runserver
   ```

   Backend will run at: `http://localhost:8000`
   API endpoint: `http://localhost:8000/api/calculate-tax/`

### Frontend Setup (React)

1. **Open a new terminal and navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install Node dependencies**
   ```bash
   npm install
   ```

3. **Start React development server**
   ```bash
   npm start
   ```

   Frontend will automatically open at: `http://localhost:3000`

## 📝 Usage

1. **Access the Application**
   - Open your browser and go to `http://localhost:3000`
   - You'll see the landing page with tax regime information

2. **Calculate Tax**
   - Click "Calculate Your Tax" button
   - Fill in the form with your details:
     - Annual Salary (required)
     - HRA, LTA (optional)
     - Section 80C deduction (optional, max ₹1,50,000)
     - Section 80D deduction (optional)
     - Age category
   - Click "Calculate Tax"

3. **View Results**
   - See side-by-side comparison of Old vs New regime
   - Review detailed slab-wise breakdown
   - Check recommended regime (highlighted in green)
   - View effective tax rates and potential savings

## 🧪 Testing the Backend API

A test script is provided to verify the backend API:

```bash
# Make sure Django server is running (python manage.py runserver)
# In a new terminal, run:
pip install requests
python test_api.py
```

### API Request Example

**Endpoint**: `POST http://localhost:8000/api/calculate-tax/`

**Request Body**:
```json
{
  "salary": 1000000,
  "hra": 100000,
  "lta": 50000,
  "deduction80C": 150000,
  "deduction80D": 25000,
  "age": "below60"
}
```

**Response**:
```json
{
  "oldRegime": {
    "taxableIncome": 700000,
    "slabs": [...],
    "baseTax": 62500,
    "cess": 2500,
    "totalTax": 65000,
    "effectiveRate": 6.5
  },
  "newRegime": {
    "taxableIncome": 950000,
    "slabs": [...],
    "baseTax": 82500,
    "rebate": 0,
    "cess": 3300,
    "totalTax": 85800,
    "effectiveRate": 8.58
  }
}
```

## 🔧 Configuration

### Backend Configuration
- **CORS Settings**: Edit `indiantaxcalc/settings.py` to modify allowed origins
- **Database**: SQLite (default), can be changed in `settings.py`
- **Debug Mode**: Set `DEBUG = False` for production

### Frontend Configuration
- **API URL**: Update in `TaxCalculator.js` if backend URL changes
- **Styling**: Modify `tailwind.config.js` for theme customization
- **Routes**: Update `App.js` to add/modify routes

## 📊 Tax Calculation Logic

The tax calculation follows these steps:

1. **Calculate Gross Income**: Total salary
2. **Apply Standard Deduction**: ₹50,000 (both regimes)
3. **Apply Regime-Specific Deductions**:
   - Old Regime: HRA, LTA, 80C, 80D
   - New Regime: No additional deductions
4. **Calculate Taxable Income**: Gross - Deductions
5. **Apply Tax Slabs**: Calculate tax based on regime slabs
6. **Apply Rebates**: Section 87A for New Regime (if applicable)
7. **Add Cess**: 4% on final tax amount

## 🎨 UI Features

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Gradient Backgrounds**: Modern and appealing UI
- **Interactive Forms**: Real-time validation
- **Visual Breakdowns**: Color-coded results
- **Comparison View**: Easy side-by-side regime comparison
- **Recommendation Badge**: Green badge for better regime

## 🔒 Security Notes

- This is a development setup; not suitable for production as-is
- For production:
  - Set `DEBUG = False` in Django settings
  - Use environment variables for sensitive data
  - Configure proper CORS settings
  - Use a production-grade database (PostgreSQL)
  - Implement proper authentication if needed
  - Use HTTPS

## 🐛 Troubleshooting

### Backend Issues

**Port 8000 already in use**:
```bash
python manage.py runserver 8001
# Update frontend API URL accordingly
```

**Module not found errors**:
```bash
pip install -r requirements.txt
```

**CORS errors**:
- Check `CORS_ALLOWED_ORIGINS` in `settings.py`
- Ensure frontend URL is listed

### Frontend Issues

**Port 3000 already in use**:
- React will automatically prompt to use another port
- Or manually set: `PORT=3001 npm start`

**Cannot connect to API**:
- Ensure Django server is running
- Check API URL in `TaxCalculator.js`
- Verify CORS settings

**TailwindCSS not working**:
```bash
npm install -D tailwindcss postcss autoprefixer
```

## 📚 Additional Resources

- [Django Documentation](https://docs.djangoproject.com/)
- [Django REST Framework](https://www.django-rest-framework.org/)
- [React Documentation](https://react.dev/)
- [TailwindCSS Documentation](https://tailwindcss.com/)
- [Income Tax India Official](https://www.incometax.gov.in/)

## 📄 License

This project is created for educational and personal use. Please ensure compliance with local regulations when using tax calculation software.

## 👨‍💻 Author

Built with ❤️ for Indian taxpayers to make informed tax decisions.

## 🤝 Contributing

Feel free to fork, modify, and use this project. Contributions and suggestions are welcome!

---

**Note**: Tax calculations are based on FY 2024-25 rules. Always consult with a tax professional for official tax filing.