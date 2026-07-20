const Joi = require("joi");

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * JOI VALIDATION SCHEMA
 * ═══════════════════════════════════════════════════════════════════════════
 * Validates the 3 required inputs:
 *   1. cost_of_asset  - Original purchase price
 *   2. salvage_value  - Value at end of useful life
 *   3. duration       - Number of years
 * ═══════════════════════════════════════════════════════════════════════════
 */
const depreciationSchema = Joi.object({
  cost_of_asset: Joi.number()
    .positive()
    .min(1)
    .required()
    .messages({
      "number.base": "cost_of_asset must be a number",
      "number.positive": "cost_of_asset must be a positive number",
      "number.min": "cost_of_asset must be at least 1",
      "any.required": "cost_of_asset is required",
    }),

  salvage_value: Joi.number()
    .min(0)
    .required()
    .messages({
      "number.base": "salvage_value must be a number",
      "number.min": "salvage_value must be a non-negative number",
      "any.required": "salvage_value is required",
    }),

  duration: Joi.number()
    .integer()
    .positive()
    .min(1)
    .max(100)
    .required()
    .messages({
      "number.base": "duration must be a number",
      "number.integer": "duration must be a whole number (integer)",
      "number.positive": "duration must be a positive number",
      "number.min": "duration must be at least 1 year",
      "number.max": "duration cannot exceed 100 years",
      "any.required": "duration is required",
    }),
})
  .custom((value, helpers) => {
    if (value.salvage_value >= value.cost_of_asset) {
      return helpers.error("any.invalid");
    }
    return value;
  })
  .messages({
    "any.invalid": "salvage_value must be less than cost_of_asset",
  });

/**
 * MIDDLEWARE: Validate Depreciation Request
 */
const validateDepreciationRequest = (req, res, next) => {
  const { error, value } = depreciationSchema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
    convert: true,
  });

  if (error) {
    const formattedErrors = error.details.map((detail) => ({
      field: detail.path.join(".") || "request",
      message: detail.message.replace(/"/g, ""),
    }));

    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: formattedErrors,
    });
  }

  req.body = value;
  next();
};

module.exports = { validateDepreciationRequest };