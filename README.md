# 📊 Asset Depreciation Calculator API

A RESTful API built with **Node.js** and **Express** to calculate asset depreciation year-wise using the **Straight-Line Method (SLM)**

---

## 🚀 Features

- ✅ Single endpoint to calculate asset depreciation
- ✅ Year-wise breakdown of depreciation, opening & closing values
- ✅ Joi-based input validation with clear error messages
- ✅ Automated tests with Jest 
- ✅ Layered architecture 
- ✅ Security middleware 
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
**Annual Depreciation = (10,000 - 1,000) / 5 = ₹1,800/year** 

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
cd asset-depreciation

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
<img width="1597" height="612" alt="Screenshot 2026-07-20 203805" src="https://github.com/user-attachments/assets/4b080da8-ad50-411e-ac86-42043f844318" />

#### 📸 Example: Validation Error
<img width="1620" height="312" alt="Screenshot 2026-07-20 203901" src="https://github.com/user-attachments/assets/6d210ddb-545c-41e6-9296-963357b7380c" />

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

```
asset-depreciation> npm test                                                                      

> asset-depreciation-api@1.0.0 test
> jest --coverage --detectOpenHandles
GET /health 200 9.952 ms - 93
POST /calculate_asset_depreciation 200 30.983 ms - 855
POST /calculate_asset_depreciation 200 3.262 ms - 879
POST /calculate_asset_depreciation 200 2.791 ms - 1441
POST /calculate_asset_depreciation 400 5.005 ms - 122
POST /calculate_asset_depreciation 400 2.414 ms - 122
POST /calculate_asset_depreciation 400 2.688 ms - 112
POST /calculate_asset_depreciation 400 4.384 ms - 136
POST /calculate_asset_depreciation 400 3.716 ms - 192
POST /calculate_asset_depreciation 400 3.678 ms - 133
GET /unknown-route 404 1.751 ms - 64
 PASS  tests/depreciation.test.js
  Asset Depreciation API
    GET /health
      √ should return health status (131 ms)
    POST /calculate_asset_depreciation
      √ should calculate depreciation correctly (matches Navi calculator) (52 ms)
      √ should return correct yearly breakdown (22 ms)
      √ should have closing value equal to salvage value in final year (16 ms)
    Input Validation
      √ should return 400 when cost_of_asset is missing (22 ms)
      √ should return 400 when salvage_value is missing (26 ms)
      √ should return 400 when duration is missing (18 ms)
      √ should return 400 when salvage_value >= cost_of_asset (20 ms)
      √ should return 400 when duration is negative (21 ms)
      √ should return 400 when duration is not an integer (24 ms)
    404 Handler
      √ should return 404 for unknown routes (24 ms)

-----------------------------|---------|----------|---------|---------|-------------------
File                         | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
-----------------------------|---------|----------|---------|---------|-------------------
All files                    |   87.83 |    44.44 |      70 |    87.5 |                   
 src                         |   76.66 |    16.66 |      40 |   76.66 |                   
  app.js                     |   76.66 |    16.66 |      40 |   76.66 | 27,66-67,78-81    
 src/controllers             |   77.77 |      100 |     100 |   77.77 |                   
  depreciation.controller.js |   77.77 |      100 |     100 |   77.77 | 24-25             
 src/middleware              |     100 |      100 |     100 |     100 |                   
  validate.middleware.js     |     100 |      100 |     100 |     100 |                   
 src/routes                  |     100 |      100 |     100 |     100 |                   
  depreciation.routes.js     |     100 |      100 |     100 |     100 |                   
 src/services                |     100 |      100 |     100 |     100 |                   
  depreciation.service.js    |     100 |      100 |     100 |     100 |                   
-----------------------------|---------|----------|---------|---------|-------------------
Test Suites: 1 passed, 1 total
Tests:       11 passed, 11 total
Snapshots:   0 total
Time:        1.958 s, estimated 3 s
Ran all test suites.

```

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
## 📝 Design Notes / Assumptions

- **Depreciation method:** The reference calculator supports three methods 
  (straight-line, declining balance, sum-of-years-digits). This implementation 
  uses the **Straight-Line Method (SLM)** as it wasn't explicitly specified in 
  the requirements. The service layer is structured so additional methods can 
  be added later via a `method` parameter.
- **HTTP method:** `POST` was used since this is a computation/action endpoint 
  with multiple structured inputs, rather than a read of an existing resource.

