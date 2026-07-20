/**
 * Formula: Annual Depreciation = (Cost of Asset - Salvage Value) / Duration
 */

/**
 * Calculate asset depreciation year-wise using Straight-Line Method
 *
 * @param {number} costOfAsset   - Original purchase price of the asset
 * @param {number} salvageValue  - Estimated value at end of useful life
 * @param {number} duration      - Useful life in years
 * @returns {Object}             - Depreciation schedule with summary & yearly breakdown
 */
const calculateDepreciation = (costOfAsset, salvageValue, duration) => {
  // Total depreciation over the asset's life
  const totalDepreciation = costOfAsset - salvageValue;

  // Annual depreciation (equal every year in SLM)
  const annualDepreciation = totalDepreciation / duration;

  // Depreciation rate as percentage of original cost
  const depreciationRate = (annualDepreciation / costOfAsset) * 100;

  // Build year-wise breakdown
  const yearlyBreakdown = [];
  let bookValue = costOfAsset;

  for (let year = 1; year <= duration; year++) {
    const openingValue = bookValue;
    const depreciationAmount = parseFloat(annualDepreciation.toFixed(2));
    bookValue = parseFloat((bookValue - depreciationAmount).toFixed(2));

    // Safety: ensure book value never falls below salvage value due to rounding
    const closingValue = Math.max(bookValue, salvageValue);

    yearlyBreakdown.push({
      year,
      opening_value: parseFloat(openingValue.toFixed(2)),
      depreciation_amount: depreciationAmount,
      closing_value: closingValue,
      accumulated_depreciation: parseFloat(
        (depreciationAmount * year).toFixed(2)
      ),
    });
  }

  return {
    method: "Straight-Line Method (SLM)",
    summary: {
      cost_of_asset: costOfAsset,
      salvage_value: salvageValue,
      duration_years: duration,
      total_depreciation: parseFloat(totalDepreciation.toFixed(2)),
      annual_depreciation: parseFloat(annualDepreciation.toFixed(2)),
      depreciation_rate_percentage: parseFloat(depreciationRate.toFixed(2)),
    },
    yearly_breakdown: yearlyBreakdown,
  };
};

module.exports = { calculateDepreciation };