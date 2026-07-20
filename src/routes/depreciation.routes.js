const express = require("express");
const router = express.Router();
const depreciationController = require("../controllers/depreciation.controller");
const { validateDepreciationRequest } = require("../middleware/validate.middleware");

/**
 * @route   POST /calculate_asset_depreciation
 * @desc    Calculate year-wise asset depreciation
 * @access  Public
 */
router.post(
  "/calculate_asset_depreciation",
  validateDepreciationRequest,
  depreciationController.calculateDepreciation
);

module.exports = router;