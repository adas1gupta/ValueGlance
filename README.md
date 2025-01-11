# ValueGlance: AAPL Financial Data Dashboard

A responsive web application for analyzing Apple Inc.'s financial data through an interactive dashboard. Users can filter and sort financial metrics using data from the Financial Modeling Prep API.

## Live Demo
The application is hosted at: https://valueglance-1.onrender.com

## Features
- View AAPL's annual income statements in an interactive table
- Filter data by:
  - Date range
  - Revenue range (in billions)
  - Net Income range (in billions)
- Sort by:
  - Date (ascending/descending)
  - Revenue (ascending/descending)
  - Net Income (ascending/descending)
- Mobile-responsive design with a modern UI
- Server-side filtering and sorting for improved performance

## Tech Stack
### Frontend
- React (Latest)
- Redux Toolkit for state management
- TailwindCSS for styling
- Axios for API requests

### Backend
- Flask (Python)
- Flask-CORS for cross-origin requests
- Financial Modeling Prep API integration

## Local Development Setup

### Backend Setup
1. Clone the repository:
```bash
git clone https://github.com/adasgupta/ValueGlance.git
cd ValueGlance
```

2. Install Python dependencies:
```bash
cd backend
pip install -r requirements.txt
```

3. Create a .env file with your Financial Modeling Prep API key:
```bash
FINANCIAL_API_KEY=your_api_key_here
```

4. Run the Flask server:
```bash
flask run
```

### Frontend Setup
1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will be available at http://localhost:3000

## Environment Variables

### Backend
- `FINANCIAL_API_KEY`: Your API key from Financial Modeling Prep

### Frontend
No environment variables needed for frontend development.

## Deployment
The application is deployed as a static site on Render: https://valueglance-1.onrender.com

## API Documentation
The backend exposes a single endpoint:
- `GET /api/income-statements`: Returns filtered AAPL financial data
  - Query Parameters:
    - `startDate`: Start date (YYYY-MM-DD)
    - `endDate`: End date (YYYY-MM-DD)
    - `minRevenue`: Minimum revenue in billions
    - `maxRevenue`: Maximum revenue in billions
    - `minNetIncome`: Minimum net income in billions
    - `maxNetIncome`: Maximum net income in billions
    - `sort_by`: Field to sort by (date/revenue/netIncome)
    - `sort_order`: Sort direction (asc/desc)