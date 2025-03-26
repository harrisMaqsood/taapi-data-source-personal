const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const saveCandleData = async (symbol, kline) => {
  try {
    await prisma.candle.create({
      data: {
        symbol: symbol.toUpperCase(),
        interval: "1m",
        openTime: new Date(kline.t),
        open: parseFloat(kline.o),
        high: parseFloat(kline.h),
        low: parseFloat(kline.l),
        close: parseFloat(kline.c),
        volume: parseFloat(kline.v),
      },
    });
  } catch (error) {
    console.error(`Error saving candle data for ${symbol}:`, error);
  }
};

module.exports = {
  saveCandleData,
};
