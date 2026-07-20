# 📊 Asset Depreciation Calculator API

A RESTful API built with **Node.js** and **Express** to calculate asset depreciation year-wise using the **Straight-Line Method (SLM)**

---

## 🚀 Features

- ✅ Single endpoint to calculate asset depreciation
- ✅ Year-wise breakdown of depreciation, opening & closing values
- ✅ Joi-based input validation with clear error messages
- ✅ Automated tests with Jest & Supertest (11 test cases)
- ✅ Layered architecture (Routes → Middleware → Controllers → Services)
- ✅ Security middleware (Helmet, CORS)
- ✅ Request logging with Morgan
- ✅ Health check endpoint

---

## 🧮 Formula Used

**Straight-Line Method (SLM):**

```
Annual Depreciation = (Cost of Asset - Salvage Value) / Duration
```

**Example:**  
Cost: ₹10,000 | Salvage Value: ₹1,000 | Duration: 5 years  
**Annual Depreciation = (10,000 - 1,000) / 5 = ₹1,800/year** ✅

---

## 🛠️ Tech Stack

| Tool | Purpose |
|------|---------|
| **Node.js** | JavaScript runtime |
| **Express** | Web framework |
| **Joi** | Input validation |
| **Helmet** | Security headers |
| **CORS** | Cross-origin resource sharing |
| **Morgan** | HTTP request logging |
| **Jest** | Testing framework |
| **Supertest** | HTTP assertions |

---

## 📁 Project Structure

```
asset-depreciation/
├── src/
│   ├── controllers/
│   │   └── depreciation.controller.js    # HTTP request handlers
│   ├── middleware/
│   │   └── validate.middleware.js        # Joi validation
│   ├── routes/
│   │   └── depreciation.routes.js        # Route definitions
│   ├── services/
│   │   └── depreciation.service.js       # Business logic
│   └── app.js                            # Express app entry point
├── tests/
│   └── depreciation.test.js              # Automated tests
├── assets/                               # Screenshots for README
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v16+ 
- npm v8+

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/<your-username>/asset-depreciation-api.git
cd asset-depreciation-api

# 2. Install dependencies
npm install

# 3. Setup environment variables
cp .env.example .env

# 4. Start the server
npm run dev
```

Server runs at: `http://localhost:3000`

---

## 📡 API Endpoints

### 1. Calculate Asset Depreciation

**Endpoint:** `POST /calculate_asset_depreciation`

#### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `cost_of_asset` | number | ✅ Yes | Original purchase price |
| `salvage_value` | number | ✅ Yes | Value at end of useful life |
| `duration` | integer | ✅ Yes | Useful life in years (1–100) |

#### 📸 Example: Successful Calculation
**Sample Input:**


#### 📸 Example: Validation Error


### 2. Health Check

**Endpoint:** `GET /health`

Returns server health status.

---

## 🧪 Testing

Run the automated test suite:

```bash
npm test
```

### 📸 All Tests Passing




**Tests Cover:**
- Correct depreciation calculation
- Year-wise breakdown accuracy
- All validation rules
- Business rule enforcement (salvage < cost)
- Error handling
- Health check endpoint

---

## 🛡️ Validation Rules

| Rule | Field | Error Message |
|------|-------|---------------|
| Required | All 3 fields | `<field> is required` |
| Must be a number | All 3 fields | `<field> must be a number` |
| Must be positive | cost_of_asset | `cost_of_asset must be a positive number` |
| Must be integer | duration | `duration must be a whole number` |
| Range 1–100 | duration | `duration must be between 1 and 100` |
| salvage < cost | Cross-field | `salvage_value must be less than cost_of_asset` |

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start server in production mode |
| `npm run dev` | Start server with auto-reload |
| `npm test` | Run all tests with coverage |

---

## 🔒 Security Features

- **Helmet** — HTTP security headers (XSS, clickjacking protection)
- **CORS** — Cross-Origin Resource Sharing configuration
- **Input Validation** — Joi validates all incoming requests
- **Error Handling** — Structured error responses
- **Environment Variables** — Sensitive config in `.env` (git-ignored)

---

## 👤 Author

**Shreya**  

---
