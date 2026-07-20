const request = require("supertest");
const app = require("../src/app");

describe("Asset Depreciation API", () => {
  // ═══════════════════════════════════════════════════════════════════════
  // HEALTH CHECK
  // ═══════════════════════════════════════════════════════════════════════
  describe("GET /health", () => {
    it("should return health status", async () => {
      const res = await request(app).get("/health");
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.status).toBe("healthy");
    });
  });

  // ═══════════════════════════════════════════════════════════════════════
  // DEPRECIATION CALCULATION 
  // ═══════════════════════════════════════════════════════════════════════
  describe("POST /calculate_asset_depreciation", () => {
    it("should calculate depreciation correctly (matches Navi calculator)", async () => {
      const res = await request(app)
        .post("/calculate_asset_depreciation")
        .send({
          cost_of_asset: 10000,
          salvage_value: 1000,
          duration: 5,
        });

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.summary.annual_depreciation).toBe(1800);
      expect(res.body.data.summary.total_depreciation).toBe(9000);
      expect(res.body.data.yearly_breakdown).toHaveLength(5);
    });

    it("should return correct yearly breakdown", async () => {
      const res = await request(app)
        .post("/calculate_asset_depreciation")
        .send({
          cost_of_asset: 100000,
          salvage_value: 10000,
          duration: 5,
        });

      const breakdown = res.body.data.yearly_breakdown;
      expect(breakdown[0].depreciation_amount).toBe(18000);
      expect(breakdown[0].opening_value).toBe(100000);
      expect(breakdown[0].closing_value).toBe(82000);
      expect(breakdown[4].closing_value).toBe(10000);
    });

    it("should have closing value equal to salvage value in final year", async () => {
      const res = await request(app)
        .post("/calculate_asset_depreciation")
        .send({
          cost_of_asset: 50000,
          salvage_value: 5000,
          duration: 10,
        });

      const breakdown = res.body.data.yearly_breakdown;
      const lastYear = breakdown[breakdown.length - 1];
      expect(lastYear.closing_value).toBe(5000);
    });
  });

  // ═══════════════════════════════════════════════════════════════════════
  // VALIDATION TESTS
  // ═══════════════════════════════════════════════════════════════════════
  describe("Input Validation", () => {
    it("should return 400 when cost_of_asset is missing", async () => {
      const res = await request(app)
        .post("/calculate_asset_depreciation")
        .send({ salvage_value: 1000, duration: 5 });

      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.errors[0].field).toBe("cost_of_asset");
    });

    it("should return 400 when salvage_value is missing", async () => {
      const res = await request(app)
        .post("/calculate_asset_depreciation")
        .send({ cost_of_asset: 10000, duration: 5 });

      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it("should return 400 when duration is missing", async () => {
      const res = await request(app)
        .post("/calculate_asset_depreciation")
        .send({ cost_of_asset: 10000, salvage_value: 1000 });

      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it("should return 400 when salvage_value >= cost_of_asset", async () => {
      const res = await request(app)
        .post("/calculate_asset_depreciation")
        .send({
          cost_of_asset: 5000,
          salvage_value: 10000,
          duration: 5,
        });

      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it("should return 400 when duration is negative", async () => {
      const res = await request(app)
        .post("/calculate_asset_depreciation")
        .send({
          cost_of_asset: 10000,
          salvage_value: 1000,
          duration: -5,
        });

      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it("should return 400 when duration is not an integer", async () => {
      const res = await request(app)
        .post("/calculate_asset_depreciation")
        .send({
          cost_of_asset: 10000,
          salvage_value: 1000,
          duration: 5.5,
        });

      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
    });
  });

  // ═══════════════════════════════════════════════════════════════════════
  // 404 HANDLER
  // ═══════════════════════════════════════════════════════════════════════
  describe("404 Handler", () => {
    it("should return 404 for unknown routes", async () => {
      const res = await request(app).get("/unknown-route");
      expect(res.statusCode).toBe(404);
      expect(res.body.success).toBe(false);
    });
  });
});