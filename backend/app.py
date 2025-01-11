from flask import Flask, jsonify, request
from flask_cors import CORS
import requests
from dotenv import load_dotenv
import os
from datetime import datetime

load_dotenv()

app = Flask(__name__)
CORS(app)

API_KEY = os.getenv('FINANCIAL_API_KEY')
BASE_URL = "https://financialmodelingprep.com/api/v3"

def parse_date(date_str):
    return datetime.strptime(date_str, '%Y-%m-%d').date() if date_str else None

def convert_billions_to_raw(value):
    return float(value) * 1e9 if value else None

@app.route("/api/income-statements", methods=["GET"])
def get_income_statements():
    # Get filter parameters
    start_date = request.args.get('startDate')
    end_date = request.args.get('endDate')
    min_revenue = convert_billions_to_raw(request.args.get('minRevenue'))
    max_revenue = convert_billions_to_raw(request.args.get('maxRevenue'))
    min_net_income = convert_billions_to_raw(request.args.get('minNetIncome'))
    max_net_income = convert_billions_to_raw(request.args.get('maxNetIncome'))

    # Get sort parameters
    sort_by = request.args.get('sort_by', 'date')
    sort_order = request.args.get('sort_order', 'desc')

    try:
        response = requests.get(
            f"{BASE_URL}/income-statement/AAPL",
            params={"period": "annual", "apikey": API_KEY}
        )
        response.raise_for_status()
        data = response.json()

        # Transform and filter data
        filtered_data = []
        for item in data:
            date = parse_date(item['date'])

            # Apply filters...
            if start_date and date < parse_date(start_date): continue
            if end_date and date > parse_date(end_date): continue
            if min_revenue and item['revenue'] < min_revenue: continue
            if max_revenue and item['revenue'] > max_revenue: continue
            if min_net_income and item['netIncome'] < min_net_income: continue
            if max_net_income and item['netIncome'] > max_net_income: continue

            filtered_data.append({
                'date': item['date'],
                'revenue': item['revenue'],
                'netIncome': item['netIncome'],
                'grossProfit': item['grossProfit'],
                'eps': item['eps'],
                'operatingIncome': item['operatingIncome']
            })

        # Apply sorting
        reverse = sort_order.lower() == 'desc'
        if sort_by == 'date':
            filtered_data.sort(key=lambda x: x['date'], reverse=reverse)
        elif sort_by == 'revenue':
            filtered_data.sort(key=lambda x: x['revenue'], reverse=reverse)
        elif sort_by == 'netIncome':
            filtered_data.sort(key=lambda x: x['netIncome'], reverse=reverse)

        return jsonify(filtered_data)

    except requests.exceptions.RequestException as e:
        return jsonify({"error": str(e)}), 500
    except ValueError as e:
        return jsonify({"error": "Invalid filter parameters"}), 400

if __name__ == "__main__":
    app.run(debug=True)