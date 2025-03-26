const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getCandleData = async (req, res) => {
  try {
    const { symbol, limit = 100 } = req.query;
    const parsedLimit = parseInt(limit, 10);
    if (isNaN(parsedLimit) || parsedLimit <= 0) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid limit value" });
    }
    const where = symbol ? { symbol: symbol.toUpperCase() } : {};
    const candles = await prisma.candle.findMany({
      where,
      take: parsedLimit,
      orderBy: {
        openTime: "desc",
      },
    });
    if (!candles.length) {
      return res
        .status(404)
        .json({ success: false, message: "No candle data found" });
    }
    return res.status(200).json({
      success: true,
      message: "Candle data retrieved successfully",
      data: candles,
    });
  } catch (error) {
    console.error("Error fetching candle data:", error);
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
};

const getSymbols = async (req, res) => {
  try {
    const symbols = await prisma.candle.findMany({
      select: {
        symbol: true,
      },
      distinct: ["symbol"],
      orderBy: {
        symbol: "asc",
      },
    });
    if (!symbols.length) {
      return res.status(404).json({ message: "No symbols found" });
    }
    return res.status(200).json({
      success: true,
      message: "Symbols fetched successfully",
      data: symbols.map((s) => s.symbol),
    });
  } catch (error) {
    console.error("Error fetching symbols:", error);
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
};

module.exports = {
  getCandleData,
  getSymbols,
};
