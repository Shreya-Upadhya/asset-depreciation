const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const dotenv = require("dotenv");

dotenv.config();

const depreciationRoutes = require("./routes/depreciation.routes");

const app = express();
const PORT = process.env.PORT || 3000;

// ═══════════════════════════════════════════════════════════════════════════
// GLOBAL MIDDLEWARE
// ═══════════════════════════════════════════════════════════════════════════
app.use(helmet());                                    // Security headers
app.use(cors());                                      // CORS support
app.use(morgan("dev"));                               // Request logging
app.use(express.json());                              // Parse JSON bodies
app.use(express.urlencoded({ extended: true }));      // Parse URL-encoded bodies

// ═══════════════════════════════════════════════════════════════════════════
// ROOT & HEALTH CHECK
// ═══════════════════════════════════════════════════════════════════════════
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Asset Depreciation Calculator API is running 🚀",
    version: "1.0.0",
    endpoints: {
      calculate_depreciation: "POST /calculate_asset_depreciation",
      health: "GET /health",
    },
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    status: "healthy",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// ═══════════════════════════════════════════════════════════════════════════
// API ROUTES
// ═══════════════════════════════════════════════════════════════════════════
app.use("/", depreciationRoutes);

// ═══════════════════════════════════════════════════════════════════════════
// 404 HANDLER
// ═══════════════════════════════════════════════════════════════════════════
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found`,
  });
});

// ═══════════════════════════════════════════════════════════════════════════
// GLOBAL ERROR HANDLER
// ═══════════════════════════════════════════════════════════════════════════
app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

// ═══════════════════════════════════════════════════════════════════════════
// START SERVER
// ═══════════════════════════════════════════════════════════════════════════
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`\n Server is running on http://localhost:${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
    console.log(
      ` API Endpoint: POST http://localhost:${PORT}/calculate_asset_depreciation\n`
    );
  });
}

module.exports = app;