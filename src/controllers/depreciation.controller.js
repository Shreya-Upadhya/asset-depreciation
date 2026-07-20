const { calculateDepreciation } = require("../services/depreciation.service");

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * CONTROLLER: Calculate Asset Depreciation
 * ═══════════════════════════════════════════════════════════════════════════
 * @route   POST /calculate_asset_depreciation
 * @access  Public
 * @body    { cost_of_asset, salvage_value, duration }
 */
const calculateDepreciationController = (req, res) => {
  try {
    const { cost_of_asset, salvage_value, duration } = req.body;

    // Delegate calculation to the service layer
    const result = calculateDepreciation(cost_of_asset, salvage_value, duration);

    return res.status(200).json({
      success: true,
      message: "Depreciation calculated successfully",
      data: result,
    });
  } catch (error) {
    console.error("Depreciation Calculation Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to calculate depreciation",
      error: error.message,
    });
  }
};

module.exports = {
  calculateDepreciation: calculateDepreciationController,
};