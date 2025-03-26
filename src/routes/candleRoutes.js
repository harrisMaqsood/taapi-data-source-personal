const express = require("express");
const router = express.Router();
const {
  getCandleData,
  getSymbols,
} = require("../controllers/candleController");

router.get("/candles", getCandleData);
router.get("/symbols", getSymbols);

module.exports = router;
